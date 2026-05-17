document.addEventListener('DOMContentLoaded', () => {
  const backgroundCanvas = document.getElementById('backgroundCanvas');
  const starsCanvas = document.getElementById('starsCanvas');
  const milkyWayCanvas = document.getElementById('milkyWayCanvas');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = lightbox?.querySelector('.gallery-lightbox__image');
  const closeButton = lightbox?.querySelector('.gallery-lightbox__close');
  const cards = document.querySelectorAll('.card');

  if (backgroundCanvas && starsCanvas && milkyWayCanvas) {
    initGalaxyBackground(backgroundCanvas, starsCanvas, milkyWayCanvas);
  }

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

function initGalaxyBackground(backgroundCanvas, starsCanvas, milkyWayCanvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const starsCtx = starsCanvas.getContext('2d');
  const mwCtx = milkyWayCanvas.getContext('2d');
  const bgCtx = backgroundCanvas.getContext('2d');

  const starCount = 520;
  const randomLength = 1000;
  const shootingStarDensity = 0.006;
  const shootingStarLifespan = 58;
  const shootingStarColors = ['#a1ffba', '#a1d2ff', '#fffaa1', '#ffa1a1'];

  let width = window.innerWidth;
  let height = window.innerHeight;
  let randomArray = [];
  let hueArray = [];
  let randomIndex = 0;
  let stars = [];
  let shootingStars = [];
  let resizeTimer;

  class Star {
    constructor() {
      this.reset();
      this.randomIndexAlpha = Math.floor(Math.random() * randomLength);
      this.randomIndexHue = this.randomIndexAlpha;
      this.baseHue = hueArray[Math.floor(Math.random() * hueArray.length)];
      this.baseHueProportion = Math.random() * 0.72;
    }

    reset() {
      this.size = 0.32 + Math.random() * 0.75;
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.alpha = this.size / 1.2;
    }

    draw() {
      const shimmer = randomArray[this.randomIndexAlpha] - 0.5;
      const alpha = Math.max(0.08, Math.min(this.alpha + shimmer * 0.38, 0.86));
      const hue = randomArray[this.randomIndexHue] > this.baseHueProportion
        ? hueArray[this.randomIndexAlpha]
        : this.baseHue;

      starsCtx.beginPath();
      starsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      starsCtx.fillStyle = `hsla(${hue}, 100%, 86%, ${alpha})`;
      starsCtx.fill();
    }

    update() {
      this.randomIndexHue = this.randomIndexAlpha;
      this.randomIndexAlpha = this.randomIndexAlpha >= randomLength - 1 ? 0 : this.randomIndexAlpha + 1;
      this.draw();
    }
  }

  class ShootingStar {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * Math.min(160, height * 0.25);
      this.speedX = (Math.random() - 0.45) * 28;
      this.speedY = 7 + Math.random() * 12;
      this.framesLeft = shootingStarLifespan;
      this.color = shootingStarColors[Math.floor(Math.random() * shootingStarColors.length)];
    }

    get done() {
      return this.framesLeft <= 0 || this.x < -120 || this.x > width + 120 || this.y > height + 120;
    }

    ageModifier() {
      const halfLife = shootingStarLifespan / 2;
      return Math.pow(1 - Math.abs(this.framesLeft - halfLife) / halfLife, 2);
    }

    update() {
      this.framesLeft--;
      this.x += this.speedX;
      this.y += this.speedY;
      const age = this.ageModifier();
      const endX = this.x - this.speedX * 8 * age;
      const endY = this.y - this.speedY * 8 * age;
      const gradient = starsCtx.createLinearGradient(this.x, this.y, endX, endY);
      gradient.addColorStop(0, 'rgba(255,255,255,.88)');
      gradient.addColorStop(Math.min(age, 0.7), this.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      starsCtx.strokeStyle = gradient;
      starsCtx.lineWidth = 1.2;
      starsCtx.beginPath();
      starsCtx.moveTo(this.x, this.y);
      starsCtx.lineTo(endX, endY);
      starsCtx.stroke();
    }
  }

  const resizeCanvas = (canvas, ctx) => {
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createRandomData = () => {
    randomArray = Array.from({ length: randomLength }, () => Math.random());
    hueArray = Array.from({ length: randomLength }, () => {
      let hue = Math.floor(Math.random() * 160);
      if (hue > 60) hue += 110;
      return hue;
    });
  };

  const drawBackground = () => {
    const gradient = bgCtx.createRadialGradient(width * 0.52, height * 0.46, 0, width * 0.52, height * 0.46, Math.max(width, height) * 0.72);
    gradient.addColorStop(0, '#100826');
    gradient.addColorStop(0.62, '#060212');
    gradient.addColorStop(1, '#030108');
    bgCtx.fillStyle = gradient;
    bgCtx.fillRect(0, 0, width, height);
  };

  const milkyWayYFromX = (x, mode) => {
    const angle = 0.55;
    const offset = (width / 2 - x) * angle;
    const spread = mode === 'star' ? height * 0.52 : height * 0.36;
    return Math.pow(Math.random(), mode === 'star' ? 1.2 : 1.5) * spread * (Math.random() - 0.5)
      + height / 2
      + (Math.random() - 0.5) * 90
      + offset;
  };

  const drawMilkyWay = () => {
    mwCtx.clearRect(0, 0, width, height);

    for (let i = 0; i < 16000; i++) {
      const x = Math.random() * width;
      const y = Math.random() < 0.22 ? Math.random() * height : milkyWayYFromX(x, 'star');
      const size = Math.random() * 0.28;
      const alpha = 0.2 + Math.random() * 0.42;
      mwCtx.beginPath();
      mwCtx.arc(x, y, size, 0, Math.PI * 2);
      mwCtx.fillStyle = `hsla(0, 100%, 100%, ${alpha})`;
      mwCtx.fill();
    }

    for (let i = 0; i < 90; i++) {
      const x = Math.random() * width;
      const y = milkyWayYFromX(x, 'cluster');
      const centerFactor = (1 - Math.abs(x - width / 2) / (width / 2)) * (1 - Math.abs(y - height / 2) / (height / 2));
      const radius = 80 + Math.random() * 95;
      const hue = 160 + Math.floor((Math.random() * 0.5 + centerFactor * 0.5) * 140);
      const lightness = 50 + Math.random() * 14;
      const gradient = mwCtx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `hsla(${hue}, 100%, ${lightness + 18}%, ${0.018 + centerFactor * 0.018})`);
      gradient.addColorStop(0.35, `hsla(${hue}, 100%, ${lightness + 8}%, .012)`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      mwCtx.fillStyle = gradient;
      mwCtx.beginPath();
      mwCtx.arc(x, y, radius, 0, Math.PI * 2);
      mwCtx.fill();

      for (let j = 0; j < 260; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.pow(Math.random(), 0.72) * radius;
        const sx = x + Math.cos(angle) * distance;
        const sy = y + Math.sin(angle) * distance * 0.62;
        mwCtx.beginPath();
        mwCtx.arc(sx, sy, 0.05 + Math.random() * 0.16, 0, Math.PI * 2);
        mwCtx.fillStyle = `hsla(${hue}, 100%, ${lightness + 18 + Math.random() * 10}%, ${0.18 + Math.random() * 0.24})`;
        mwCtx.fill();
      }
    }
  };

  const init = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    resizeCanvas(backgroundCanvas, bgCtx);
    resizeCanvas(starsCanvas, starsCtx);
    resizeCanvas(milkyWayCanvas, mwCtx);
    createRandomData();
    drawBackground();
    drawMilkyWay();
    stars = Array.from({ length: starCount }, () => new Star());
    shootingStars = [];
  };

  const animate = () => {
    starsCtx.clearRect(0, 0, width, height);
    stars.forEach((star) => star.update());

    if (randomArray[randomIndex] < shootingStarDensity) {
      shootingStars.push(new ShootingStar());
    }

    shootingStars = shootingStars.filter((star) => {
      star.update();
      return !star.done;
    });

    randomIndex = randomIndex + 1 >= randomLength ? 0 : randomIndex + 1;
    requestAnimationFrame(animate);
  };

  init();
  animate();

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 180);
  });
}
