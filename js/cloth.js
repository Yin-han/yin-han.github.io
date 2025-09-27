// ===== 分屏吸附 + 渐隐切换 + Lenis 丝滑（与 drone.js / irrigation.js 一致） =====
gsap.registerPlugin(ScrollTrigger);

(function($){
  $(function(){

    // 1) 根据图片数组渲染每一屏（每屏一张图、无文字）
    const deck = document.getElementById('deck');
    const pages = (window.CLOTH_PAGES || []).slice();

    if(!deck || !pages.length){
      deck.innerHTML = '<section class="grid-container full section one"><div class="grid-container"><div class="grid-x grid-padding-x"><div class="cell"><figure><img src="images/cloth01.jpg" alt=""></figure></div></div></div></section>';
    }else{
      pages.forEach((src, idx)=>{
        const sec = document.createElement('section');
        // 前 10 屏套用 one~ten 的背景层级；之后走 auto
        const names = ['one','two','three','four','five','six','seven','eight','nine','ten'];
        const cls = names[idx] || 'auto';
        sec.className = `grid-container full section ${cls}`;

        // 结构：每屏一张图
        sec.innerHTML = `
          <div class="grid-container">
            <div class="grid-x grid-padding-x">
              <div class="cell">
                <figure><img src="${src}" alt="Cloth Page ${idx+1}"/></figure>
              </div>
            </div>
          </div>
        `;
        deck.appendChild(sec);
      });
    }

    // 2) 吸附 & 渐隐
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
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t)=> lenis.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
    }

    initPinAndFade();
    initLenis();

  });
})(jQuery);
