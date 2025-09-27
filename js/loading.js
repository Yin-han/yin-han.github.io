// loading.js
window.addEventListener("load", function () {
  const loader = document.getElementById("loading-screen");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // 0.5 秒后彻底隐藏
  }
});
