// Mobile menu
const ham = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
if (ham && menu){
  ham.addEventListener('click', () => {
    const show = getComputedStyle(menu).display === 'none';
    menu.style.display = show ? 'flex' : 'none';
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  })
},{ threshold:.12 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Image lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb?.querySelector('img');
document.querySelectorAll('.zoomable').forEach(img=>{
  img.addEventListener('click', ()=>{
    if(!lb || !lbImg) return;
    lbImg.src = img.src;
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden','false');
  });
});
lb?.addEventListener('click', ()=>{
  lb.style.display = 'none';
  lb.setAttribute('aria-hidden','true');
  if(lbImg) lbImg.src = '';
});
