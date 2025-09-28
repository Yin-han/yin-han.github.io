// Visualisation page interactions
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Scroll reveal for cards =====
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
    reveals.forEach(el=>io.observe(el));
  } else {
    reveals.forEach(el=>el.classList.add('in'));
  }

  // ===== Image zoom modal =====
  const heroImg = document.getElementById('heroImage');
  const zoomBtn = document.querySelector('.zoom-btn');
  const modal = document.getElementById('imgModal');
  const modalImg = modal ? modal.querySelector('img') : null;
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;

  function openModal(){
    if (!modal || !modalImg || !heroImg) return;
    modalImg.src = heroImg.src;
    modal.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal(){
    if (!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
  }

  zoomBtn && zoomBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e)=>{
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeModal();
  });

  // ===== Fun micro-interaction for CTA (only if not reduced motion) =====
  if (!prefersReduced) {
    const cta = document.querySelector('.cta-enter');
    cta && cta.addEventListener('pointermove', (e)=>{
      const r = cta.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cta.style.transform = `translateY(${y * -2}px) rotateX(${y * 6}deg) rotateY(${x * 6}deg)`;
    });
    cta && cta.addEventListener('pointerleave', ()=> cta.style.transform = '');
  }
})();
