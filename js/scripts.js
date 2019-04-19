let context = null;
window.addEventListener("load", () => {
    context = document.getElementById("mainCanvas").getContext("2d");

    function draw() {
        context.fillStyle = "#fef";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        context.fillStyle = "brown";
        context.fillRect(50, 50, 50, 50);
    }

    function loop(time = 0) {
        draw();
        requestAnimationFrame(loop);
    }
    loop();
});

