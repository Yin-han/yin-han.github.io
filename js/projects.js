// projects.js 
// projects.js — Timeline modal interaction (scoped)
(function(){
  const wrap = document.querySelector('.timeline-wrap');
  if (!wrap) return;

  const items = wrap.querySelectorAll('.timeline-item');
  const modal = wrap.querySelector('#modal');
  const closeBtn = wrap.querySelector('#modal-close');
  const titleEl = wrap.querySelector('#modal-title');
  const descEl  = wrap.querySelector('#modal-description');
  const skillsUl = wrap.querySelector('#modal-skills');

  items.forEach((item) => {
    item.addEventListener('click', () => {
      try{
        const detailStr = item.getAttribute('data-details') || '{}';
        const d = JSON.parse(detailStr);
        titleEl.textContent = d.title || '';
        descEl.textContent  = d.description || '';
        skillsUl.innerHTML = '';
        (d.skills || []).forEach((s) => {
          const li = document.createElement('li');
          li.textContent = s;
          skillsUl.appendChild(li);
        });
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
      }catch(e){
        console.warn('Invalid data-details JSON:', e);
      }
    });
  });

  function closeModal(){
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (ev) => {
    if (ev.target === modal) closeModal();
  });

  // ESC 关闭
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });
})();
