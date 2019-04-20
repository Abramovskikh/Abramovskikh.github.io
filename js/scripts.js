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

const BG_C = "rgba(255,243,145, 1.0)";

window.addEventListener("load", () => {
    CANVAS.set(innerWidth, innerHeight);

    let draw = () => {
        let c = CANVAS.context;
        c.fillStyle = BG_C;
        c.fillRect(0, 0, innerWidth, innerHeight);

        c.fillStyle = "brown";
        c.fillRect(50, 50, 100, 100);
    };

    const update = function(time = 0) {
        CANVAS.update(innerWidth, innerHeight);
        draw();
        requestAnimationFrame(update);
    }

    update();
});