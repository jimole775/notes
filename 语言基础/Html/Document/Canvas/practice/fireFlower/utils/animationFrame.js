const animationFrame = {};

animationFrame.request = window.requestAnimationFrame || fireFrame;
animationFrame.clear = window.cancelAnimationFrame || clearFrame;

function fireFrame(fn) {
    return setInterval(function () {
        if (fn && typeof fn === "function") fn();
    }, 1000 / 60);
}

function clearFrame(id) {
    clearInterval(id);
}

export default animationFrame;