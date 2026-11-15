export const SWATCH = ["#ff4f8b", "#4cc3d9", "#7bc96f", "#ffb547", "#a77bf3", "#ff7a59"];

export function burst(count = 160) {
  const c = document.getElementById("confetti");
  if (!c) return;
  const ctx = c.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth, h = window.innerHeight;
  c.width = w * dpr; c.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const parts = Array.from({ length: count }, () => ({
    x: w / 2 + (Math.random() - 0.5) * w * 0.4, y: h * 0.35,
    vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
    r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3,
    col: SWATCH[Math.floor(Math.random() * SWATCH.length)], rect: Math.random() > 0.5
  }));

  let frame = 0;
  (function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.col;
      if (p.rect) ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
      else { ctx.beginPath(); ctx.arc(0, 0, p.r / 2.5, 0, 7); ctx.fill(); }
      ctx.restore();
    }
    if (++frame < 220) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, w, h);
  })();
}
