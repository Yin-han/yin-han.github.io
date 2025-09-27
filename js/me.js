// GSAP + ScrollTrigger + Lenis
gsap.registerPlugin(ScrollTrigger);

(function($){
  $(function(){

    // 1) 每个 .section 都做底部吸附（pin）
    function pinSections(){
      gsap.utils.toArray('.section').forEach((section)=>{
        // 跳过：第4段 & Happy List
        if (section.classList.contains('four') || section.id === 'happy-list') return;

        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          pin: true,
          pinType: 'fixed',
          pinSpacing: false,
          anticipatePin: 1,
          scrub: 0.5
        });

        // 当前段渐隐，下一段进入时触发
        const next = section.nextElementSibling;
        if(next){
          gsap.to(section, {
            opacity: 0,
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5
            }
          });
        }
      });
    }

    // 2) 四号段：右侧图片固定 + 中间项切换图片
    function sectionFour(){
      const $cells = $('.section.four .cell');
      if(!$cells.length) return;

      const endDist = $cells.innerHeight() * $cells.length;
      gsap.fromTo('.section.four .imgs',
        { autoAlpha: 1 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: '.section.four .imgs',
            start: 'top 120px',
            end: endDist + 'px',
            pin: true
          }
        }
      );

      // 根据滚动切换图片
      gsap.utils.toArray('.section.four .cell').forEach((cell)=>{
        ScrollTrigger.create({
          trigger: cell,
          start: 'top center',
          onEnter(){
            const src = $(cell).attr('data-img-src');
            if(src){
              $('.section.four .imgs img').attr('src', src);
              gsap.fromTo('.section.four .imgs img', {autoAlpha:0},{autoAlpha:1, duration:.6});
            }
          },
          onLeaveBack(){
            const prev = $(cell).prev('.cell');
            const src = prev.attr('data-img-src');
            if(src){
              $('.section.four .imgs img').attr('src', src);
              gsap.fromTo('.section.four .imgs img', {autoAlpha:0},{autoAlpha:1, duration:.6});
            }
          }
        });
      });
    }

    // 3) Lenis 平滑滚动
    function smoothScroll(){
      const lenis = new Lenis({ smoothWheel:true, duration:1.2 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t)=> lenis.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
    }

    pinSections();
    sectionFour();
    smoothScroll();
  });
})(jQuery);




// 第一页文字动画
// me.js

// 注册插件
gsap.registerPlugin(ScrollTrigger);

/* ========== 公用函数：文字拆分 + 动画 ========== */

// 把某个元素的文字拆成 span.word > span.char
function splitToWordsAndChars(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n.nodeValue && n.nodeValue.trim() !== '') textNodes.push(n);
  }

  textNodes.forEach(node => {
    const frag = document.createDocumentFragment();
    const tokens = node.nodeValue.split(/(\s+)/); // 保留空格
    tokens.forEach(tok => {
      if (!tok) return;
      if (/\s+/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
      } else {
        const w = document.createElement('span');
        w.className = 'word';
        for (let i = 0; i < tok.length; i++) {
          const ch = document.createElement('span');
          ch.className = 'char';
          ch.textContent = tok[i];
          w.appendChild(ch);
        }
        frag.appendChild(w);
      }
    });
    node.parentNode.replaceChild(frag, node);
  });
}

// 逐字上浮淡入动画
function animateChars(chars, duration, stagger) {
  return gsap.fromTo(chars,
    { opacity: 0, y: 60, rotation: 8, display: 'inline-block' },
    { opacity: 1, y: 0, rotation: 0, duration, stagger, ease: 'power3.out',
      onComplete: () => gsap.set(chars, { display: 'inline' }) }
  );
}

// 给某个 section 的文字应用“逐字动画”
function setupTextAnimation(sectionSelector, opts = {}) {
  const root = document.querySelector(sectionSelector);
  if (!root) return;

  const targets = root.querySelectorAll('h2, p');
  targets.forEach(el => splitToWordsAndChars(el));

  ScrollTrigger.create({
    trigger: root,
    start: opts.start || 'top 75%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ delay: opts.delay || 0.2 });
      targets.forEach((el, i) => {
        const chars = el.querySelectorAll('.char');
        if (chars.length) {
          tl.add(animateChars(chars, 1.1, 0.025), i === 0 ? 0 : '>-0.2');
        }
      });
    }
  });
}

/* ========== 实际调用 ========== */

document.addEventListener('DOMContentLoaded', () => {
  // Section 1：第一页文字动画
  setupTextAnimation('.section.one .intro-text', { delay: 0.4 });

  // Section 2：第二页文字动画
  setupTextAnimation('.section.two .glowup-intro', { delay: 0.2 });

  // 以后如果有更多 section，直接再调用一行即可：
  // setupTextAnimation('.section.three .xxx-intro');
});








// Section 2: Glow Up
gsap.registerPlugin(ScrollTrigger);

$(function(){
  if (window.ScrollReveal){
    ScrollReveal().reveal('.section.two .js--fadeInRight', {
      origin:'right', distance:'300px', easing:'ease-in-out',
      duration:800, interval:120
    });
  }

  const track   = document.querySelector('.section.two .glowup-track');
  const leftBox = track?.querySelector('.track-left');
  const rightBox= track?.querySelector('.track-right');
  const railBox = leftBox?.querySelector('.timeline-rail');
  const rail    = leftBox?.querySelector('.timeline-rail .line-draw');
  const dotsUL  = leftBox?.querySelector('.timeline-dots');
  const dots    = leftBox ? gsap.utils.toArray(leftBox.querySelectorAll('.timeline-dots li')) : [];
  const cards   = rightBox ? gsap.utils.toArray(rightBox.querySelectorAll('.glowup-card')) : [];

  function layoutTimeline(){
    if(!track || !leftBox || !rightBox || !railBox || !rail || !dotsUL || !cards.length) return;

    const firstTop   = cards[0].offsetTop;
    const lastBottom = cards[cards.length-1].offsetTop + cards[cards.length-1].offsetHeight;
    const trackH     = lastBottom - firstTop;

    railBox.style.height = trackH + 'px';
    dotsUL.style.height  = trackH + 'px';

    dots.forEach((li, i)=>{
      const center = cards[i].offsetTop + cards[i].offsetHeight/2;
      const y = center - firstTop;
      li.style.top = (y - 10) + 'px';
    });
  }

  // ========== 修复：保证加载完成后自动刷新 ==========
  function refreshTimeline(){
    layoutTimeline();
    ScrollTrigger.refresh();
  }

  layoutTimeline();
  window.addEventListener('resize', refreshTimeline);
  window.addEventListener('orientationchange', refreshTimeline);
  window.addEventListener('load', refreshTimeline);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refreshTimeline);
  }
  document.querySelectorAll('.glowup-card img').forEach(img=>{
    img.addEventListener('load', refreshTimeline);
  });

  // 画线随滚动增长
  if (rail){
    gsap.fromTo(rail,{height:0},{
      height: ()=> parseFloat(getComputedStyle(railBox).height),
      ease:'none',
      scrollTrigger:{
        trigger: rightBox,
        start: 'top 80%',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 滚动聚焦
  function setFocus(index){
    cards.forEach((c, j)=>{
      if(j === index){
        c.classList.add('focus');
        c.classList.remove('dim');
      }else{
        c.classList.add('dim');
        c.classList.remove('focus');
      }
    });
  }

  cards.forEach((card,i)=>{
    ScrollTrigger.create({
      trigger: card,
      start: 'top 45%',
      end:   'bottom 55%',
      onEnter: () => { setFocus(i);        dots[i]?.classList.add('active'); },
      onEnterBack: () => { setFocus(i);    dots[i]?.classList.add('active'); },
      onLeave: () => {                      dots[i]?.classList.remove('active'); },
      onLeaveBack: () => {                  dots[i]?.classList.remove('active'); }
    });

    dots[i]?.addEventListener('click', ()=> card.scrollIntoView({behavior:'smooth', block:'center'}));
  });

  setFocus(0); // 初始焦点
});




// ===== Artwork: 显示全部图片 =====
document.addEventListener('DOMContentLoaded', () => {
  const artSection = document.querySelector('.section.artwork');
  if (!artSection) return;

  const btnShowAll = artSection.querySelector('#art-showall-toggle'); // 新按钮
  const overlay    = document.getElementById('artAllOverlay');
  const grid       = document.getElementById('artAllGrid');
  const closeBtn   = overlay?.querySelector('.art-all__close');

  if (!btnShowAll || !overlay || !grid || !closeBtn) return;

  // 从画廊收集所有图片（去掉滚动用的重复）
  function collectAllArtworkUrls() {
    const thumbs = document.querySelectorAll('.section.artwork .art-card img');
    const urls = Array.from(thumbs).map(img => img.getAttribute('data-full') || img.src);
    return Array.from(new Set(urls)); // 去重
  }

  function openAll() {
    const urls = collectAllArtworkUrls();
    grid.innerHTML = '';
    urls.forEach((src, i) => {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Artwork ${i+1}`;
      fig.appendChild(img);
      grid.appendChild(fig);
    });

    overlay.classList.add('is-open');
    document.documentElement.classList.add('no-scroll');

    // 点击缩略图也能调用原 Lightbox
    const lightboxImg = document.querySelector('#artLightbox img');
    const lightbox    = document.getElementById('artLightbox');
    const openLightbox = (src) => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightbox.classList.add('is-open');
    };
    grid.querySelectorAll('img').forEach(img=>{
      img.addEventListener('click', ()=> openLightbox(img.src));
    });
  }

  function closeAll() {
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
  }

  btnShowAll.addEventListener('click', openAll);
  closeBtn.addEventListener('click',  closeAll);
  overlay.addEventListener('click', (e)=>{
    if (e.target === overlay) closeAll(); // 点击背景关闭
  });
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeAll();
  });
});


// ===== Artwork Lightbox =====
(function(){
  const lightbox = document.getElementById('artLightbox');
  if(!lightbox) return;

  const imgInBox = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.art-lightbox__close');
  const thumbs = document.querySelectorAll('.section.artwork .art-card img');

  const open = (src) => {
    imgInBox.src = src;
    lightbox.classList.add('is-open');
    document.documentElement.classList.add('no-scroll');
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    imgInBox.src = '';
    document.documentElement.classList.remove('no-scroll');
  };

  thumbs.forEach(img => {
    img.addEventListener('click', () => {
      const full = img.getAttribute('data-full') || img.src;
      open(full);
    });
  });

  lightbox.addEventListener('click', (e) => {
    const target = e.target;
    if (target === lightbox || target === imgInBox || target === closeBtn) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();




// Happy-list (horizontal + simple card stack gallery)
console.clear();

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray("#happy-list .panel");
const totalPanels = panels.length || 1;
const contentEl = document.querySelector("#happy-list .content");

gsap.timeline({
  scrollTrigger: {
    trigger: "#happy-list .wrapper",
    start: "top top",
    pin: true,
    scrub: true,
    // markers: true,
    end: () => "+=" + ((contentEl?.scrollWidth || window.innerWidth) - window.innerWidth)
  }
})
.to("#happy-list .wrapper", {
  clipPath: "circle(71% at 50% 50%)",
  duration: 1 / totalPanels
})
.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  duration: 1
});


// ===== Simple Card Stack -> Fullscreen Gallery (no tilt) =====
(() => {
  const stack = document.getElementById('gymStack');
  const lb = document.getElementById('happyLightbox');
  if (!stack || !lb) return;

  const imgEl    = lb.querySelector('.hl-img');
  const btnPrev  = lb.querySelector('.hl-prev');
  const btnNext  = lb.querySelector('.hl-next');
  const btnClose = lb.querySelector('.hl-close');
  const dotsBox  = lb.querySelector('.hl-dots');

  // collect photos (prefer data-gallery; fallback to <img> srcs)
  function getPhotos(){
    const data = stack.getAttribute('data-gallery');
    if (data) {
      try { return JSON.parse(data); } catch(e){}
    }
    return Array.from(stack.querySelectorAll('.shot')).map(img => img.src);
  }

  const photos = getPhotos();
  let idx = 0;

  function renderDots(){
    if (!dotsBox) return;
    dotsBox.innerHTML = '';
    photos.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === idx) dot.classList.add('active');
      dotsBox.appendChild(dot);
    });
  }

  function show(i){
    if (!photos.length) return;
    idx = (i + photos.length) % photos.length;
    imgEl.src = photos[idx];
    renderDots();
  }

  function open(start = 0){
    show(start);
    lb.classList.add('is-open');
    document.documentElement.classList.add('no-scroll');
  }

  function close(){
    lb.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
  }

  const next = () => show(idx + 1);
  const prev = () => show(idx - 1);

  // open on clicking stack or the small "View" button
  stack.addEventListener('click', (e) => {
    // if clicked the explicit button, stop bubbling but open as well
    if (e.target.closest('.stack-open')) { e.stopPropagation(); }
    open(0);
  });

  // lightbox controls
  btnNext?.addEventListener('click', next);
  btnPrev?.addEventListener('click', prev);
  btnClose?.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')      close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft')  prev();
  });

  // touch swipe on the image
  let startX = 0, deltaX = 0;
  imgEl.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; deltaX = 0;
  }, { passive: true });

  imgEl.addEventListener('touchmove', (e) => {
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });

  imgEl.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 50) (deltaX < 0 ? next() : prev());
  });
})();
