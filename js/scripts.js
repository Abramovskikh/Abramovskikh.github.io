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

const BG_C = "rgba(255, 243, 145, 1.0)";
const BALL_C = "rgba(130, 43, 52, 1.0)";

//========================================================================================

function Ball(radius = 10, x, y) {
    this.x = x ? x : innerWidth / 2 - radius / 2;
    this.y = y ? y : innerHeight - radius;
    this.r = radius;
    this.speedX = this.speedY = 8;
}
Ball.prototype.draw = function() {
    let c = CANVAS.context;
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fillStyle = BALL_C;
    c.fill();
    c.closePath();
    c.restore();
}
Ball.prototype.move = function() {
    if (this.x + this.r > innerWidth) this.speedX = -this.speedX;
    if (this.x - this.r < 0) this.speedX = -this.speedX;
    if (this.y + this.r > innerHeight) this.speedY = - this.speedY;
    if (this.y - this.r < 0) this.speedY = - this.speedY;
    this.x += this.speedX;
    this.y += this.speedY;
}
const BALL = new Ball();

//========================================================================================

// Слушатель поворота экрана смартфона
window.addEventListener("resize", () => {
    // Растягивание холста под размер экрана
    CANVAS.updateSize(innerWidth, innerHeight);
});

// Полная загрузка документа сайта
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

        BALL.draw();
        BALL.move();

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
    update();
});