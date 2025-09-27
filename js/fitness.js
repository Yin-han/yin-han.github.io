// Fitness — cover unchanged; sections use Lenis + ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

(function($){
  let lenis;

  // 1) Lenis 平滑滚动
  function initLenis(){
    lenis = new Lenis({ smoothWheel: true, duration: 1.05 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t)=> lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // 2) Explore / View Project → 滚到 Overview
  function bindExplore(){
    const btnExplore = document.getElementById('fitExplore');
    const ctaLink    = document.querySelector('.fit-cta[href="#overview"]');
    const to         = document.getElementById('overview');
    function go(){
      if(!to) return;
      if(lenis){ lenis.scrollTo(to, { offset: 0 }); }
      else { to.scrollIntoView({ behavior: 'smooth' }); }
    }
    if(btnExplore) btnExplore.addEventListener('click', go);
    if(ctaLink)    ctaLink.addEventListener('click', function(e){ e.preventDefault(); go(); });
  }

  // 3) 进入/离开封面时切换 body 类，控制左侧导航显示（更稳健）
    function toggleSideNavByCover(){
    const cover = document.getElementById('cover');
    if(!cover) return;

    // 当“封面离开视口”时添加 on-sections；回到封面则移除
    ScrollTrigger.create({
        trigger: cover,
        start: 'top top',
        end: 'bottom top',
        onLeave: () => document.body.classList.add('on-sections'),
        onEnterBack: () => document.body.classList.remove('on-sections')
    });

    // 初始校准：如果刷新时已经在封面以下，立即显示侧栏
    const revealIfPastCover = () => {
        const coverBottom = cover.getBoundingClientRect().bottom + window.scrollY;
        if (window.scrollY >= coverBottom) {
        document.body.classList.add('on-sections');
        } else {
        document.body.classList.remove('on-sections');
        }
    };
    revealIfPastCover();
    // 兼容极端情况：字体/图片加载或窗口尺寸变化后再校准一次
    window.addEventListener('resize', revealIfPastCover, { passive: true });
    }


  // 4) Section 动效：每段 pin + 渐入，下一段推上来时上一段渐隐
  function pinSections(){
    const sections = gsap.utils.toArray('.section');

    sections.forEach((sec, idx)=>{
      // 渐入
      gsap.fromTo(sec, { autoAlpha: 0, y: 40 }, {
        autoAlpha: 1, y: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 70%', toggleActions: 'play none none reverse' }
      });

      // pin 到下一段出现
      ScrollTrigger.create({
        trigger: sec,
        start: 'bottom bottom',
        pin: true,
        pinType: 'fixed',
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.4
      });

      // 下一段推上来时当前渐隐
      const next = sections[idx + 1];
      if(next){
        gsap.to(sec, {
          opacity: 0.0,
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: 0.5 }
        });
      }
    });
  }

  // 5) 左侧导航：点击滚动、高亮同步、圆点沿线移动；封面时不显示
  function sideNav(){
    const $links = $('.fit-side-nav a');
    const $dot   = $('.fit-side-nav .fit-side-dot');
    const anchors = gsap.utils.toArray('.section');

    // 点击滚到目标
    $links.on('click', function(e){
      e.preventDefault();
      const id = $(this).attr('data-target');
      const el = document.getElementById(id);
      if(!el) return;
      if(lenis){ lenis.scrollTo(el, { offset: 0 }); }
      else { el.scrollIntoView({behavior:'smooth'}); }
    });

    function moveDotToLink(link){
      const r = link.getBoundingClientRect();
      const pageY = window.scrollY + r.top + r.height/2;
      const asideTop = document.querySelector('.fit-side-nav').getBoundingClientRect().top + window.scrollY;
      const y = pageY - asideTop - 9; // 9=dot 半径
      $dot.css('transform', `translateY(${y}px)`);
    }

    // 进入/离开每个 section 时更新高亮与圆点
    anchors.forEach((sec)=>{
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: ()=> updateNav(sec.id),
        onEnterBack: ()=> updateNav(sec.id)
      });
    });

    function updateNav(id){
      $links.removeClass('is-active');
      const $curr = $links.filter(`[data-target="${id}"]`).addClass('is-active');
      if($curr.length) moveDotToLink($curr[0]);
      // 可选：更新 hash（不影响封面）
      window.history.replaceState(null,'', `#${id}`);
    }

    // 初始把圆点放到第一个链接
    const $first = $links.eq(0);
    if($first.length) moveDotToLink($first[0]);
  }

  // ===== 初始化 =====
  window.addEventListener('load', ()=>{
    initLenis();
    bindExplore();
    toggleSideNavByCover(); // 控制封面阶段隐藏左侧导航
    pinSections();          // Overview 起启用动效
    sideNav();

    // 字体/图片加载后刷新定位
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(()=> ScrollTrigger.refresh());
    } else {
      setTimeout(()=> ScrollTrigger.refresh(), 400);
    }
  });



})(jQuery);
