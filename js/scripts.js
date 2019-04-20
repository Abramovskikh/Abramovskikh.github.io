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

        let x = TOOLS.locationTouch.x < 0 ? -innerWidth : TOOLS.locationTouch.x;
        let y = TOOLS.locationTouch.y < 0 ? -innerHeight : TOOLS.locationTouch.y;
        c.fillStyle = "brown";
        c.fillRect(x - 50, y - 50, 100, 100);
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
    }

    update();
});