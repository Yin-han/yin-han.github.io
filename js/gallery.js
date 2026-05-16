document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = lightbox?.querySelector('.gallery-lightbox__image');
  const closeButton = lightbox?.querySelector('.gallery-lightbox__close');
  const cards = document.querySelectorAll('.card');

  if (!lightbox || !lightboxImage || !closeButton || cards.length === 0) return;

  const openLightbox = (image) => {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || 'Gallery image preview';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card));
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});
