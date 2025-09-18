import React, { useState, useRef, useEffect } from "react";
import styles from "./homepage.module.css";
import emailjs from "emailjs-com";

const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/CutlassTM",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.8 1.8-1.2-.9-.1-1.9-.5-1.9-2.4 0-.5.2-.9.5-1.2-.1-.2-.5-1 .1-2 0 0 .4-.1 1.3.5.4-.1.9-.1 1.4-.1s1 .1 1.4.1c.9-.6 1.3-.5 1.3-.5.6 1.1.2 1.9.1 2 .3.3.5.7.5 1.2 0 1.9-1 2.3-1.9 2.4.4.3.8.9.8 1.9v2.8c0 .4.2.7.8.6A12 12 0 0 0 12 .5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sanraj-jp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1-.001 5.001A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.9-1.8 3.9-1.8 4.2 0 5 2.8 5 6.4V21h-4v-5.1c0-1.3 0-3-1.8-3-1.8 0-2 1.4-2 2.9V21H9V9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/nuusanraj",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zM18.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@nuusanraj",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 3v9.5a3.5 3.5 0 1 1-1.5-2.8V7.2L17 9V6.2a5 5 0 0 1-5-3.2H12z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Homepage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [botField, setBotField] = useState("");

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Pixel scaling
    const PIXEL = 4;

    function resize() {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      canvas.width = Math.max(320, Math.floor(cssW / PIXEL));
      canvas.height = Math.max(200, Math.floor(cssH / PIXEL));
    }

    resize();
    window.addEventListener("resize", resize);

    // Scene state
    const G = {
      w: canvas.width,
      h: canvas.height,
      groundY: Math.floor(canvas.height * 0.78),
      cars: [],
      buildings: [],
      lamps: [],
      particles: [],
      time: 0,
      spawnTimer: 0,
      nextSpawn: 0.8 + Math.random() * 1.2,
    };

    function initEntities() {
      G.w = canvas.width;
      G.h = canvas.height;
      G.groundY = Math.floor(G.h * 0.78);

      G.cars = [];
      G.particles = [];
      G.buildings = [];
      G.lamps = [];

      // Create repeating building band (big scenery)
      let bx = 0;
      while (bx < G.w * 1.5) {
        const bw = 12 + Math.floor(Math.random() * 40);
        const bh = Math.floor(G.h * (0.35 + Math.random() * 0.5));
        const by = G.groundY - bh - Math.floor(G.h * 0.03);
        const shade = 40 + Math.floor(Math.random() * 40);
        G.buildings.push({ x: bx, w: bw, h: bh, y: by, shade });
        bx += bw + 6 + Math.floor(Math.random() * 40);
      }

      // street lamps placed across
      for (let i = 0; i < Math.ceil(G.w / 60); i++) {
        const lx = i * 60 + 40 + Math.floor(Math.random() * 40);
        G.lamps.push({ x: lx, y: G.groundY - 28, h: 18 });
      }

      G.time = 0;
      G.spawnTimer = 0;
      G.nextSpawn = 0.8 + Math.random() * 1.2;
    }

    initEntities();

    function spawnCar() {
      const carW = Math.max(8, Math.floor(G.w * (0.03 + Math.random() * 0.03)));
      const carH = Math.max(6, Math.floor(G.h * (0.03 + Math.random() * 0.02)));
      const x = G.w + carW + Math.random() * 40;
      const laneY = G.groundY - carH - 1;
      const baseSpeed = 110 + Math.random() * 40;
      const speed = baseSpeed + Math.min(120, G.time * 0.8);
      G.cars.push({ x, y: laneY, w: carW, h: carH, speed });
    }

    // Update scenery
    function update(dt) {
      G.time += dt;
      G.w = canvas.width;
      G.h = canvas.height;
      G.groundY = Math.floor(G.h * 0.78);

      // update cars
      for (let i = G.cars.length - 1; i >= 0; i--) {
        const car = G.cars[i];
        car.x -= car.speed * dt;
        if (car.x + car.w < -20) G.cars.splice(i, 1);
      }

      // spawn cars
      G.spawnTimer += dt;
      if (G.spawnTimer >= G.nextSpawn) {
        spawnCar();
        G.spawnTimer = 0;
        G.nextSpawn = 0.8 + Math.random() * 1.6 - Math.min(0.6, G.time * 0.01);
        G.nextSpawn = Math.max(0.5, G.nextSpawn);
      }

      // update buildings (slow parallax)
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

      // lamps move with background
      for (let i = G.lamps.length - 1; i >= 0; i--) {
        G.lamps[i].x -= (buildingSpeed * dt * 0.65);
        if (G.lamps[i].x < -40) G.lamps.splice(i, 1);
      }
      while (G.lamps.length < Math.ceil(G.w / 60) + 2) {
        const lx = (G.lamps.length + 1) * 60 + Math.random() * 30 + G.w;
        G.lamps.push({ x: lx, y: G.groundY - 28, h: 18 });
      }
    }

    // Draw scenery only
    function draw() {
      // background (dark)
      ctx.fillStyle = "#1e1e1e";
      ctx.fillRect(0, 0, G.w, G.h);

      // buildings (back)
      for (const b of G.buildings) {
        const s = Math.min(255, Math.max(10, b.shade));
        ctx.fillStyle = `rgb(${s},${s},${s})`;
        ctx.fillRect(Math.floor(b.x), Math.floor(b.y), Math.floor(b.w), Math.floor(b.h));
        // small windows
        const winW = 2;
        for (let wx = Math.floor(b.x) + 2; wx < b.x + b.w - 2; wx += 4) {
          for (let wy = Math.floor(b.y) + 4; wy < b.y + b.h - 6; wy += 6) {
            if (Math.random() > 0.6) continue;
            ctx.fillStyle = "rgba(230,230,230,0.95)";
            ctx.fillRect(wx, wy, winW, 2);
          }
        }
      }

      // lamps (mid)
      for (const l of G.lamps) {
        ctx.fillStyle = "#0e0e0e";
        const lx = Math.floor(l.x);
        const ly = Math.floor(l.y);
        ctx.fillRect(lx, ly, 1, l.h);
        ctx.fillStyle = "#111";
        ctx.fillRect(lx - 2, ly - 2, 5, 3);
      }

      // road
      ctx.fillStyle = "#0b0b0b";
      const roadY = G.groundY;
      ctx.fillRect(0, roadY, G.w, G.h - roadY);

      // center dashed stripes
      const stripeH = 2;
      const stripeW = Math.max(2, Math.floor(G.w * 0.03));
      ctx.fillStyle = "#e8e8e8";
      const dashGap = 8;
      for (let sx = 0; sx < G.w + stripeW; sx += stripeW + dashGap) {
        // animate stripes slightly (parallax)
        ctx.fillRect(sx + (Math.floor((G.time * 40) % (stripeW + dashGap)) * -1), roadY + Math.floor((G.h - roadY) / 2) - 1, stripeW, stripeH);
      }

      // cars (foreground)
      for (const car of G.cars) {
        const cx = Math.floor(car.x);
        const cy = Math.floor(car.y);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx, cy, Math.floor(car.w), Math.floor(car.h));
        ctx.fillStyle = "#a6a6a6";
        ctx.fillRect(cx + 2, cy + 1, Math.max(2, Math.floor(car.w / 2.6)), Math.max(1, Math.floor(car.h / 2.8)));
        ctx.fillStyle = "#0b0b0b";
        ctx.fillRect(cx + 1, cy + car.h - 1, 2, 1);
        ctx.fillRect(cx + car.w - 3, cy + car.h - 1, 2, 1);
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
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---------- form logic ----------
  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setEmailError("");

    if (botField) return;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    try {
      setIsSending(true);

      const response = await emailjs.send(
        "service_mvcfiyi",
        "template_sf6zwsg",
        templateParams,
        "LEoYzPGNQYaYi-3Ma"
      );

      if (response.status === 200) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Email service returned non-200 status");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setGeneralError("Something went wrong. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={styles.root}>
      {/* scenery canvas as background */}
      <canvas ref={canvasRef} className={styles.bgCanvas} aria-hidden="true" />

      <div className={styles.container}>
        <h1>Landing Page</h1>
        <section className={styles.hero} aria-label="landing profile">
          <div className={styles.profileCard}>
            <div className={styles.profileLeft}>
              <img className={styles.avatar} src="/avatar1.png" alt="Sanraj — avatar" />

              <div className={styles.titleWrap}>
                <h1 className={styles.title}>Sanraj JP</h1>
                <p className={styles.lead}>UI/UX Designer ● Front-End Developer | Year 2 @ Republic Polytechnic</p>
              </div>

              <nav className={styles.socials} aria-label="social links">
                {SOCIALS.map((s) => (
                  <a key={s.id} className={styles.socialButton} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <span className={styles.socialIcon} aria-hidden>
                      {s.icon}
                    </span>
                    <span className={styles.socialLabel}>{s.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className={styles.profileRight}>
              <p className={styles.lead}>Ping Me — Ready to Co-Op on Something Epic?</p><br></br>

              {!submitted ? (
                <>
                  {(generalError || isSending) && (
                    <div role="status" aria-live="polite" className={styles.error} style={{ marginBottom: 12 }}>
                      {generalError ? generalError : "Sending your message…"}
                    </div>
                  )}

                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <input
                      className={styles.hp}
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />

                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Name</span>
                      <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Email</span>
                      <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => {
                          if (e.target.value && !validateEmail(e.target.value)) {
                            setEmailError("Please enter a valid email address.");
                          } else {
                            setEmailError("");
                          }
                        }}
                        placeholder="you@example.com"
                        required
                        aria-invalid={emailError ? "true" : "false"}
                        aria-describedby={emailError ? "email-error" : undefined}
                      />
                      {emailError && (
                        <div id="email-error" className={styles.error} role="alert">
                          {emailError}
                        </div>
                      )}
                    </label>

                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Message</span>
                      <textarea className={styles.textarea} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your project or opportunity" required />
                    </label>

                    <div className={styles.formActions}>
                      <button type="submit" className={styles.submitButton} disabled={isSending} aria-busy={isSending}>
                        {isSending ? "Sending…" : "Send message"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className={styles.success} role="status">
                  <p>Message sent — thanks! I'll get back to you soon.</p>
                  <button className={styles.resetButton} onClick={() => setSubmitted(false)}>
                    Send another
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
