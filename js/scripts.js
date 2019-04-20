const CANVAS = {
    W: null,
    H: null,
    canvas: null,
    setCanvas: (width, height) => {
        CANVAS.canvas = document.createElement("canvas");
        CANVAS.canvas.width = CANVAS.W = width;
        CANVAS.canvas.height = CANVAS.H = height;
        document.body.appendChild(CANVAS.canvas);
    }
}

window.addEventListener("load", () => {
    const SW = window.innerWidth, SH = window.innerHeight;
    CANVAS.setCanvas(SW, SH);
});