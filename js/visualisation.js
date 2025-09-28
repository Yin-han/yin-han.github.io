// Click image to open modal; click backdrop / X or press Esc to close
document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.viz-figure img');
  const modal = document.getElementById('imgModal');
  if (!img || !modal) return;

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal() {
    modalImg.src = img.src;                       // show the same image
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  // mouse click
  img.addEventListener('click', openModal);
  // keyboard access (Enter/Space)
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
  });

  // close interactions
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
