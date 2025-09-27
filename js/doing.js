/* 年份兜底 */
try{ document.getElementById('year').textContent = new Date().getFullYear(); }catch(e){}

/* Tabs 切换（不影响你的导航链接；只针对 role=tab 的内部切换） */
(function(){
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = {
    xr: document.getElementById('xr'),
    fhir: document.getElementById('fhir') || document.getElementById('fire'),
    hci: document.getElementById('hci') || document.getElementById('advanced-hci'),
    smc: document.getElementById('smc')
  };
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('tab-active'));
      tab.classList.add('tab-active');
      const key = tab.dataset.tab;
      Object.values(panels).forEach(p=>p && (p.classList.add('hidden')));
      panels[key] && panels[key].classList.remove('hidden');
      // 滚到顶一点，便于阅读
      window.scrollTo({top: document.querySelector('.tabs').getBoundingClientRect().top + window.scrollY - 10, behavior:'smooth'});
    });
  });
})();

/* ScrollSpy：滚动时，自动高亮对应 Tab（仅在大屏上） */
(function(){
  const bar = document.querySelector('.tabs');
  if(!bar) return;
  const map = new Map([
    ['xr', document.getElementById('xr')],
    ['fhir', document.getElementById('fhir') || document.getElementById('fire')],
    ['hci', document.getElementById('hci') || document.getElementById('advanced-hci')],
    ['smc', document.getElementById('smc')],
  ]);
  const tabs = new Map();
  document.querySelectorAll('[role="tab"]').forEach(t=>tabs.set(t.dataset.tab, t));
  const io = new IntersectionObserver(entries=>{
    let active = null;
    entries.forEach(e=>{ if(e.isIntersecting) active = [...map].find(([k,v])=>v===e.target)?.[0]; });
    if(active && tabs.get(active)){
      document.querySelectorAll('[role="tab"]').forEach(t=>t.classList.remove('tab-active'));
      tabs.get(active).classList.add('tab-active');
    }
  }, { rootMargin:'-40% 0px -50% 0px', threshold:.01 });
  map.forEach(sec=>sec && io.observe(sec));
})();

/* 轻视差：背景跟随滚动（仅影响 .projects-bg，不碰你的菜单脚本） */
(function(){
  const bg = document.querySelector('.projects-bg');
  if(!bg) return;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY * 0.08;
    bg.style.transform = `translateY(${y}px)`;
  }, {passive:true});
})();

/* 入场渐显（Doing：统一 0ms，无级联；与 Projects 区分） */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.transition = 'opacity .6s ease, transform .6s ease';
        e.target.classList.remove('opacity-0','translate-y-3');
        e.target.classList.add('opacity-100','translate-y-0');
        io.unobserve(e.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();
