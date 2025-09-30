// Scroll trigger: fade-in sections
const sections = document.querySelectorAll(".fade-in");

function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const boxTop = section.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            section.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);



// --- 向上滚动进入主页 ---
let introVisible = true;

// 锁定滚动，防止直接滚到主页
document.body.style.overflow = 'hidden';

function enterMainContent() {
    document.getElementById('intro-screen').classList.add('fade-out');
    introVisible = false;

    // 解锁滚动
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 1000); // 等淡出动画完成
}

// 鼠标滚轮向下触发
window.addEventListener('wheel', (e) => {
    if (introVisible && e.deltaY > 0) { // deltaY > 0 表示向下滚
        enterMainContent();
    }
}, { passive: true });

// 触屏设备：向下滑触发（页面内容向上）
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (!introVisible) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    if (deltaY > 10) { // 手指向下滑
        enterMainContent();
    }
}, { passive: true });


function enterMainContent() {
    document.getElementById('intro-screen').classList.add('fade-out');
    introVisible = false;

    // 显示主页
    document.body.classList.add('show-main');

    // 解锁滚动
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 1000); // 等淡出动画完成
}



