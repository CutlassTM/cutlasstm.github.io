import React, { useRef, useEffect } from 'react';
import './playground.module.css';

export default function Playground() {
  const canvasRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Pixel scaling -> creates '8-bit' blocky look
    const PIXEL = 4; // 1 logical pixel = PIXEL CSS pixels

    function resize() {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      // internal (logical) canvas resolution
      canvas.width = Math.max(320, Math.floor(cssW / PIXEL));
      canvas.height = Math.max(200, Math.floor(cssH / PIXEL));
    }

    resize();
    window.addEventListener('resize', resize);

    // Scene & game state
    const G = {
      w: canvas.width,
      h: canvas.height,
      groundY: Math.floor(canvas.height * 0.78),
      ghost: null,
      cars: [],
      buildings: [],
      lamps: [],
      particles: [],
      scoreFloat: 0,
      deaths: 0,
      spawnTimer: 0,
      nextSpawn: 1.2 + Math.random() * 0.8,
      time: 0,
    };

    // Initialize ghost and scenery (uses same building/lamp generation as homepage)
    function initEntities() {
      G.w = canvas.width;
      G.h = canvas.height;
      G.groundY = Math.floor(G.h * 0.78);

      G.ghost = {
        x: Math.floor(G.w * 0.12),
        w: Math.max(8, Math.floor(G.w * 0.03)),
        h: Math.max(10, Math.floor(G.h * 0.06)),
        y: 0,
        vy: 0,
        jumping: false,
        dead: false,
        respawnTimer: 0,
      };
      G.ghost.y = G.groundY - G.ghost.h;

      G.cars = [];
      G.particles = [];
      G.buildings = [];
      G.lamps = [];

      // Create repeating building band (matching homepage)
      let bx = 0;
      while (bx < G.w * 1.5) {
        const bw = 12 + Math.floor(Math.random() * 40);
        const bh = Math.floor(G.h * (0.35 + Math.random() * 0.5));
        const by = G.groundY - bh - Math.floor(G.h * 0.03);
        const shade = 40 + Math.floor(Math.random() * 40);
        G.buildings.push({ x: bx, w: bw, h: bh, y: by, shade });
        bx += bw + 6 + Math.floor(Math.random() * 40);
      }

      // street lamps placed across (same logic)
      for (let i = 0; i < Math.ceil(G.w / 60); i++) {
        const lx = i * 60 + 40 + Math.floor(Math.random() * 40);
        G.lamps.push({ x: lx, y: G.groundY - 28, h: 18 });
      }

      G.scoreFloat = 0;
      G.deaths = 0;
      G.spawnTimer = 0;
      G.nextSpawn = 0.8 + Math.random() * 1.2;
      G.time = 0;
    }

    initEntities();

    // Ghost sprite (8-bit) map unchanged
    const ghostMap = [
      '00111100',
      '01111110',
      '11111111',
      '11111111',
      '11111111',
      '10111101',
      '10011001',
      '11000011',
    ];

    // Controls: space / up / click / touch
    function doJump() {
      if (G.ghost.dead) return;
      if (!G.ghost.jumping) {
        G.ghost.vy = -420; // px / s (logical pixels)
        G.ghost.jumping = true;
      }
    }

    function onKey(e) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        doJump();
      }
    }

    function onPointer(e) {
      doJump();
    }

    window.addEventListener('keydown', onKey);
    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('touchstart', onPointer);

    // Spawn cars with same rules as homepage (so pacing & visuals match)
    function spawnCar() {
      const carW = Math.max(8, Math.floor(G.w * (0.03 + Math.random() * 0.03)));
      const carH = Math.max(6, Math.floor(G.h * (0.03 + Math.random() * 0.02)));
      const x = G.w + carW + Math.random() * 40;
      const laneY = G.groundY - carH - 1;
      const baseSpeed = 110 + Math.random() * 40; // px per second
      const speed = baseSpeed + Math.min(120, G.time * 0.8);
      G.cars.push({ x, y: laneY, w: carW, h: carH, speed });
    }

    function spawnExplosion(cx, cy) {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 200;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        G.particles.push({ x: cx, y: cy, vx, vy, life: 0.6 + Math.random() * 0.6 });
      }
    }

    // Update logic (keeps ghost physics + homepage scenery update behavior)
    function update(dt) {
      G.time += dt;
      G.w = canvas.width;
      G.h = canvas.height;
      G.groundY = Math.floor(G.h * 0.78);

      const gravity = 1800;

      // ghost physics
      if (!G.ghost.dead) {
        if (G.ghost.jumping) {
          G.ghost.vy += gravity * dt;
          G.ghost.y += G.ghost.vy * dt;
          if (G.ghost.y >= G.groundY - G.ghost.h) {
            G.ghost.y = G.groundY - G.ghost.h;
            G.ghost.vy = 0;
            G.ghost.jumping = false;
          }
        }
      } else {
        G.ghost.respawnTimer -= dt;
        if (G.ghost.respawnTimer <= 0) {
          G.ghost.dead = false;
          G.ghost.jumping = false;
          G.ghost.vy = 0;
          G.ghost.y = G.groundY - G.ghost.h;
          G.cars = G.cars.filter(car => car.x > G.ghost.x + G.ghost.w + 6);
        }
      }

      // cars
      for (let i = G.cars.length - 1; i >= 0; i--) {
        const car = G.cars[i];
        car.x -= car.speed * dt;
        if (car.x + car.w < -20) G.cars.splice(i, 1);
      }

      // spawn timer
      G.spawnTimer += dt;
      if (!G.ghost.dead && G.spawnTimer >= G.nextSpawn) {
        spawnCar();
        G.spawnTimer = 0;
        G.nextSpawn = 0.8 + Math.random() * 1.6 - Math.min(0.7, G.time * 0.01);
        G.nextSpawn = Math.max(0.5, G.nextSpawn);
      }

      // buildings update (same slow parallax)
      const buildingSpeed = 30 + Math.min(60, G.time * 0.2);
      for (let i = G.buildings.length - 1; i >= 0; i--) {
        const b = G.buildings[i];
        b.x -= buildingSpeed * dt * 0.25;
        if (b.x + b.w < -60) G.buildings.splice(i, 1);
      }
      if (G.buildings.length < Math.ceil(G.w / 40) + 6) {
        let lastX = G.buildings.length ? G.buildings[G.buildings.length - 1].x + G.buildings[G.buildings.length - 1].w + 6 : 0;
        while (lastX < G.w * 1.2) {
          const bw = 12 + Math.floor(Math.random() * 40);
          const bh = Math.floor(G.h * (0.35 + Math.random() * 0.5));
          const by = G.groundY - bh - Math.floor(G.h * 0.03);
          const shade = 40 + Math.floor(Math.random() * 40);
          G.buildings.push({ x: lastX, w: bw, h: bh, y: by, shade });
          lastX += bw + 6 + Math.floor(Math.random() * 40);
        }
      }

      // lamps update
      for (let i = G.lamps.length - 1; i >= 0; i--) {
        G.lamps[i].x -= (buildingSpeed * dt * 0.65);
        if (G.lamps[i].x < -40) G.lamps.splice(i, 1);
      }
      while (G.lamps.length < Math.ceil(G.w / 60) + 2) {
        const lx = (G.lamps.length + 1) * 60 + Math.random() * 30 + G.w;
        G.lamps.push({ x: lx, y: G.groundY - 28, h: 18 });
      }

      // particles
      for (let i = G.particles.length - 1; i >= 0; i--) {
        const p = G.particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          G.particles.splice(i, 1);
          continue;
        }
        p.vy += 1000 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }

      // score smoothing
      G.scoreFloat += dt * 10;

      // collision detection (same as before)
      if (!G.ghost.dead) {
        const g = G.ghost;
        for (const car of G.cars) {
          if (
            g.x < car.x + car.w - 1 &&
            g.x + g.w - 1 > car.x &&
            g.y < car.y + car.h - 1 &&
            g.y + g.h - 1 > car.y
          ) {
            G.ghost.dead = true;
            G.ghost.respawnTimer = 0.8;
            G.deaths += 1;
            spawnExplosion(g.x + g.w / 2, g.y + g.h / 2);
            break;
          }
        }
      }
    }

    // Draw: uses the exact painting style from your homepage (colors, stripes, buildings, lamps, cars)
    function draw() {
      // background (use homepage's dark gradient base color feel)
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, G.w, G.h);

      // buildings (back)
      for (const b of G.buildings) {
        const s = Math.min(255, Math.max(10, b.shade));
        ctx.fillStyle = `rgb(${s},${s},${s})`;
        ctx.fillRect(Math.floor(b.x), Math.floor(b.y), Math.floor(b.w), Math.floor(b.h));
        const winW = 2;
        for (let wx = Math.floor(b.x) + 2; wx < b.x + b.w - 2; wx += 4) {
          for (let wy = Math.floor(b.y) + 4; wy < b.y + b.h - 6; wy += 6) {
            if (Math.random() > 0.6) continue;
            ctx.fillStyle = 'rgba(230,230,230,0.95)';
            ctx.fillRect(wx, wy, winW, 2);
          }
        }
      }

      // mid layer street lamps
      for (const l of G.lamps) {
        ctx.fillStyle = '#0e0e0e';
        const lx = Math.floor(l.x);
        const ly = Math.floor(l.y);
        ctx.fillRect(lx, ly, 1, l.h);
        ctx.fillStyle = '#111';
        ctx.fillRect(lx - 2, ly - 2, 5, 3);
      }

      // road
      ctx.fillStyle = '#0b0b0b';
      const roadY = G.groundY;
      ctx.fillRect(0, roadY, G.w, G.h - roadY);

      // road stripes (center dashed)
      const stripeH = 2;
      const stripeW = Math.max(2, Math.floor(G.w * 0.03));
      ctx.fillStyle = '#e8e8e8';
      const dashGap = 8;
      for (let sx = 0; sx < G.w + stripeW; sx += stripeW + dashGap) {
        ctx.fillRect(sx + (Math.floor((G.time * 40) % (stripeW + dashGap)) * -1), roadY + Math.floor((G.h - roadY) / 2) - 1, stripeW, stripeH);
      }

      // cars (foreground)
      for (const car of G.cars) {
        const cx = Math.floor(car.x);
        const cy = Math.floor(car.y);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cx, cy, Math.floor(car.w), Math.floor(car.h));
        ctx.fillStyle = '#a6a6a6';
        ctx.fillRect(cx + 2, cy + 1, Math.max(2, Math.floor(car.w / 2.6)), Math.max(1, Math.floor(car.h / 2.8)));
        ctx.fillStyle = '#0b0b0b';
        ctx.fillRect(cx + 1, cy + car.h - 1, 2, 1);
        ctx.fillRect(cx + car.w - 3, cy + car.h - 1, 2, 1);
      }

      // particles (explosion)
      for (const p of G.particles) {
        const alpha = Math.max(0, Math.min(1, p.life / 1.0));
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 2, 2);
      }

      // ghost - draw as small 8-bit sprite and a soft shadow
      const g = G.ghost;
      if (!g.dead) {
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(Math.floor(g.x), Math.floor(G.groundY - 2), g.w, 1);

        const mapW = ghostMap[0].length;
        const mapH = ghostMap.length;
        const cellW = Math.max(1, Math.floor(g.w / mapW));
        const cellH = Math.max(1, Math.floor(g.h / mapH));
        const startX = Math.floor(g.x - (mapW * cellW - g.w) / 2);
        const startY = Math.floor(g.y);
        for (let ry = 0; ry < mapH; ry++) {
          for (let rx = 0; rx < mapW; rx++) {
            if (ghostMap[ry][rx] === '1') {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(startX + rx * cellW, startY + ry * cellH, cellW, cellH);
            }
          }
        }
        ctx.fillStyle = '#bfbfbf';
        ctx.fillRect(startX, startY + 1, 1, 1);
      }

      // HUD: small text top-left
      const score = Math.floor(G.scoreFloat);
      ctx.font = `${Math.max(8, Math.floor(G.h * 0.03))}px 'Press Start 2P', monospace`;
      ctx.fillStyle = '#f5f5f5';
      ctx.textBaseline = 'top';
      ctx.fillText(`SCORE: ${score}`, 6, 6);
      ctx.fillText(`DEATHS: ${G.deaths}`, 6, 6 + Math.max(10, Math.floor(G.h * 0.03)) + 4);

      if (G.ghost.dead) {
        ctx.fillStyle = '#ffffff';
        ctx.fillText('BOOM!', 6, 6 + Math.max(10, Math.floor(G.h * 0.03)) * 2 + 8);
      }
    }

    // main loop
    let last = performance.now();
    let raf = null;
    function tick(now) {
      const dtMS = now - last;
      last = now;
      const dt = Math.min(0.05, dtMS / 1000);
      update(dt);
      draw();
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    // cleanup
    return () => {
      mountedRef.current = false;
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('pointerdown', onPointer);
      canvas.removeEventListener('touchstart', onPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="game-wrapper">
      <canvas ref={canvasRef} className="game-canvas" />
    </div>
  );
}