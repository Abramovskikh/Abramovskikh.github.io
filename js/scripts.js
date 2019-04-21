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
    updateSize: (width, height) => {
        CANVAS.canvas.width = width;
        CANVAS.canvas.height = height;
    }
}

const TOOLS = {
    isTouched: false,
    locationTouch: { x: null, y: null },
    setTouchPosition: (x, y) => {
        TOOLS.locationTouch.x = x;
        TOOLS.locationTouch.y = y;
    }
}

const BG_C = "rgba(255,243,145, 1.0)";

window.addEventListener("resize", () => {
    CANVAS.updateSize(innerWidth, innerHeight);
});

window.addEventListener("load", () => {
    CANVAS.set(innerWidth, innerHeight);
    CANVAS.canvas.addEventListener("touchstart", tStart, false);
    CANVAS.canvas.addEventListener("touchmove", tMove, false);
    CANVAS.canvas.addEventListener("touchend", tEnd, false);
    
    let draw = () => {
        let c = CANVAS.context;
        // Repaint canvas
        c.fillStyle = BG_C;
        c.fillRect(0, 0, innerWidth, innerHeight);

        showPointer(TOOLS.isTouched);
    };

    // Animation
    const update = function(time = 0) {
        requestAnimationFrame(update);

        draw();
    }

    // Touch listeners
    function tStart(e) {
        e.preventDefault();
        TOOLS.isTouched = true;
        tMove(e);
    }
    function tMove(e) {
        e.preventDefault();
        TOOLS.setTouchPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
    function tEnd(e) {
        e.preventDefault();
        TOOLS.isTouched = false;
        TOOLS.setTouchPosition(null, null);
    }

    // Functions 
    function showPointer(stats = false) {
        if (stats) {
            CANVAS.context.save();

            CANVAS.context.shadowColor = "black";
            CANVAS.context.shadowBlur = 2;
            CANVAS.context.shadowOffsetX = 5;
            CANVAS.context.shadowOffsetY = 5;

            CANVAS.context.strokeStyle = "brown";
            CANVAS.context.beginPath()
            CANVAS.context.arc(TOOLS.locationTouch.x, TOOLS.locationTouch.y, 10, 0, Math.PI * 2, false);
            CANVAS.context.closePath();
            CANVAS.context.stroke();

            CANVAS.context.restore();
        }
    }

    update();
});