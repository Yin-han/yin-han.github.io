// js/cursor.js
(function(){
  // 触屏或减少动效偏好时，不启用
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 创建容器与 5 个拖尾点
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  const dots = [];
  for (let i = 1; i <= 5; i++){
    const dot = document.createElement('div');
    dot.className = `cursor-dot d${i}`;
    dots.push(dot);
    trail.appendChild(dot);
  }
  document.body.appendChild(trail);

  let lastX = window.innerWidth/2, lastY = window.innerHeight/2;

  // 跟随指针
  const move = (x, y) => {
    // 第一颗立刻跟随，其余靠 CSS transition 形成拖尾
    dots.forEach(dot => {
      dot.style.left = x + 'px';
      dot.style.top  = y + 'px';
    });
    lastX = x; lastY = y;
  };

  // 可见性与移动事件
  const show = () => trail.classList.remove('hidden');
  const hide = () => trail.classList.add('hidden');
  window.addEventListener('pointermove', e => { show(); move(e.clientX, e.clientY); }, {passive:true});
  window.addEventListener('pointerdown', show, {passive:true});
  window.addEventListener('pointerup',   show, {passive:true});
  window.addEventListener('blur',  hide, {passive:true});
  window.addEventListener('mouseout', e => { if (!e.relatedTarget) hide(); }, {passive:true});

  // 初始位置
  move(lastX, lastY);
})();
