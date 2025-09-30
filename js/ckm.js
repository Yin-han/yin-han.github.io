// ckm.js — small interactions: theme toggle, smooth scroll, image preview
(function(){
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  // theme persistence
  const saved = localStorage.getItem('ckm-theme');
  if(saved){ root.setAttribute('data-theme', saved); }

  toggleBtn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current === 'dark' ? 'dark' : 'light');
    localStorage.setItem('ckm-theme', root.getAttribute('data-theme') || 'light');
  });

  // smooth scroll for same‑page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // lightweight image preview (click to enlarge)
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);display:none;align-items:center;justify-content:center;z-index:9999;';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:92vw;max-height:92vh;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5)';
  overlay.appendChild(img);
  overlay.addEventListener('click', () => overlay.style.display = 'none');
  document.body.appendChild(overlay);

  document.querySelectorAll('.gallery img').forEach(i => {
    i.style.cursor = 'zoom-in';
    i.addEventListener('click', () => {
      img.src = i.currentSrc || i.src;
      overlay.style.display = 'flex';
    });
  });
})();