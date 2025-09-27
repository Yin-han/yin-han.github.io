// ===== 分屏吸附 + 渐隐切换 + Lenis 丝滑（遵循你给的代码思路） =====
gsap.registerPlugin(ScrollTrigger);

(function($){
  $(function(){

    // 1) 根据图片数组渲染每一屏（每屏一张图、无文字）
    const deck  = document.getElementById('deck');
    const pages = (window.DRONE_PAGES || []).slice();

    if(!deck || !pages.length){
      deck.innerHTML = '<section class="grid-container full section one"><div class="grid-container"><div class="grid-x grid-padding-x"><div class="cell"><figure><img src="images/drone-p01.jpg" alt=""></figure></div></div></div></section>';
    }else{
      pages.forEach((src, idx)=>{
        const sec = document.createElement('section');
        const names = ['one','two','three','four','five','six','seven','eight','nine','ten'];
        const cls = names[idx] || 'auto';
        sec.className = `grid-container full section ${cls}`;
        sec.innerHTML = `
          <div class="grid-container">
            <div class="grid-x grid-padding-x">
              <div class="cell">
                <figure><img src="${src}" alt="Page ${idx+1}"/></figure>
              </div>
            </div>
          </div>
        `;
        deck.appendChild(sec);
      });
    }

    // —— 渲染完成后打锚点（Drone 起始 & 含 lily01 的那屏）——
    function markAnchors(){
      const first = document.querySelector('.section');
      if (first) first.id = 'anchor-drone';

      const lilyImg = document.querySelector('img[src*="lily01"]');
      if (lilyImg) {
        const sec = lilyImg.closest('.section');
        if (sec) sec.id = 'anchor-irrigation';
      }
    }
    markAnchors();

    // 2) 初始化吸附与渐隐
    function initPinAndFade(){
      const sections = gsap.utils.toArray('.section');
      ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

      sections.forEach((section)=>{
        const next = section.nextElementSibling;

        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          pin: true,
          pinType: 'fixed',
          pinSpacing: false,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          ease: 'none'
        });

        if(next){
          gsap.to(section, {
            opacity: 0,
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5,
              ease: 'power4.inOut'
            }
          });
        }
      });
    }

    // 3) Lenis 平滑滚动
    function initLenis(){
      const lenis = new Lenis({ smoothWheel:true, duration:1.2 });
      window._lenis = lenis;               // 让目录点击能复用 Lenis
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t)=> lenis.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
    }

    initPinAndFade();
    initLenis();

    // 4) 目录点击滚动（仅做滚动，不再负责打 ID）
    (function setupMiniTOC(){
      const btns = document.querySelectorAll('.mini-toc [data-target]');
      btns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const targetSel = btn.getAttribute('data-target');
          const targetEl  = document.querySelector(targetSel);
          if (!targetEl) return;

          const lenis = window._lenis;
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(targetEl, { offset: -8 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    })();

  });
})(jQuery);
