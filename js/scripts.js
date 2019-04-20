const CANVAS = {
    canvas: null,
    context: null,
    set: (width, height) => {
        CANVAS.canvas = document.createElement("canvas");
        CANVAS.context = CANVAS.canvas.getContext("2d");
        CANVAS.canvas.width = width;
        CANVAS.canvas.height = height;
        document.body.appendChild(CANVAS.canvas);
    },
    update: (width, height) => {
        CANVAS.canvas.width = width;
        CANVAS.canvas.height = height;
    }
}

const TOOLS = {
    locationTouch: { x: -1, y: -1 },
    setTouchPosition: (x, y) => {
        TOOLS.locationTouch.x = x;
        TOOLS.locationTouch.y = y;
    }
}

const BG_C = "rgba(255,243,145, 1.0)";

window.addEventListener("load", () => {
    CANVAS.set(innerWidth, innerHeight);
    CANVAS.canvas.addEventListener("touchstart", tStart, false);
    CANVAS.canvas.addEventListener("touchmove", tMove, false);
    CANVAS.canvas.addEventListener("touchend", tEnd, false);
    
    let draw = () => {
        let c = CANVAS.context;
        c.fillStyle = BG_C;
        c.fillRect(0, 0, innerWidth, innerHeight);
        showPointer();

        c.beginPath();
        c.moveTo(0,0);
        c.lineTo(TOOLS.locationTouch.x, TOOLS.locationTouch.y);
        c.closePath()
        c.stroke();

        c.fillStyle = "black";
        c.font = "20px monospace";
        c.textAlign = "left";
        c.textBaseline = "top";
        let mag = TOOLS.locationTouch.x < 0 || TOOLS.locationTouch.y < 0 ? "" : Magnitude(TOOLS.locationTouch.x, TOOLS.locationTouch.y).toFixed(1);
        c.fillText(mag, TOOLS.locationTouch.x + 10, TOOLS.locationTouch.y + 10);

    };

    const update = function(time = 0) {
        CANVAS.update(innerWidth, innerHeight);
        draw();
        requestAnimationFrame(update);
    }

    function tStart(e) {
        e.preventDefault();
        tMove(e);
    }
    function tMove(e) {
        e.preventDefault();
        TOOLS.setTouchPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
    function tEnd(e) {
        e.preventDefault();
        TOOLS.setTouchPosition(-innerWidth, -innerHeight);
    }

    function showPointer(point) {
        let c = CANVAS.context;
        let x = TOOLS.locationTouch.x < 0 ? -innerWidth : TOOLS.locationTouch.x;
        let y = TOOLS.locationTouch.y < 0 ? -innerHeight : TOOLS.locationTouch.y;
        c.strokeStyle = "brown";
        c.beginPath()
        c.arc(x, y, 10, 0, Math.PI * 2, false);
        c.closePath();
        c.stroke();
    }

    function Magnitude(x, y) {
        return Math.sqrt(x * x + y * y);
    };

    update();
});