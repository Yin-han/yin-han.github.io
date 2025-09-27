// 顶部大图放大预览
(function(){
  const img = document.getElementById('heroImage');
  const modal = document.getElementById('imgModal');
  const closeBtn = modal.querySelector('.modal-close');
  const modalImg = modal.querySelector('img');

  function openModal(){
    modalImg.src = img.src;
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
  }

  img.addEventListener('click', openModal);
  document.querySelector('.zoom-btn').addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
})();
