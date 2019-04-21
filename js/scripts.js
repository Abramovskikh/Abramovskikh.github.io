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
    isTouch: false,
    isTouching: false,
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

        drawCircle();
        iteractivBox( TOOLS.isTouching ? .9 : 1 );

        // Always bottom
        showPointer(TOOLS.isTouching);
    };

    // Animation
    const update = function(time = 0) {
        requestAnimationFrame(update);
        draw();
    }

    // Touch listeners
    function tStart(e) {
        e.preventDefault();
        TOOLS.isTouch = true;
        TOOLS.isTouching = true;
        tMove(e);
    }
    function tMove(e) {
        e.preventDefault();
        TOOLS.isTouch = false;
        TOOLS.setTouchPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
    function tEnd(e) {
        e.preventDefault();
        TOOLS.isTouching = false;
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

    function iteractivBox(scale = 1) {
        const c = CANVAS.context;
        let w = 100;
        c.save();
        c.translate((innerWidth / 2) - w * scale / 2, (innerHeight / 2) - w * scale / 2);
        c.scale(scale, scale);
        c.fillStyle = "rgba(30,121,117, 1)";
        c.fillRect(0,0,w,w);
        c.restore();
    }

    function randomCircle() {
        const c = CANVAS.context;
        let w = 10;
        c.save();

        c.beginPath()
        c.arc(  Math.random() * innerWidth - w,
                Math.random() * innerHeight - w,
                Math.random() * 10 + w,
                0, Math.PI * 2, false );
        c.lineWidth = 2;
        c.strokeStyle = "darkblue";
        c.stroke();
        c.restore();
    }
    
    function drawCircle() {
        for(let i = 0; i < 40; i++) {
            randomCircle();
        }
    }
    update();
});