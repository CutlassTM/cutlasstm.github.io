// Playground.js
import React from "react";
import styles from "./playground.module.css";
import { Link } from "react-router-dom";

const Playground = () => {
  // const toolsDesign = ["Figma", "Wireframing", "UX Research", "Prototyping", "Accessibility"];
  // const toolsCode = ["React", "React Native", "Express", "Python", "C#", "Unity", "WordPress"];
  // const principles = [
  //   { title: "Clarity", desc: "Simple layouts, clear hierarchy, zero fluff." },
  //   { title: "Consistency", desc: "Predictable patterns and reusable components." },
  //   { title: "Performance", desc: "Fast, light, and efficient by default." },
  //   { title: "Empathy", desc: "Design choices rooted in real user needs." },
  // ];
  // const timeline = [
  //   {
  //     date: "2022 – ITE",
  //     title: "Started with HTML & CSS",
  //     org: "Web foundations",
  //     body:
  //       "Built my first sites and learned the basics of layouts, semantics, and maintainable styling.",
  //   },
  //   {
  //     date: "2023 – Present",
  //     title: "Polytechnic • React, Python, Express",
  //     org: "Full-stack growth",
  //     body:
  //       "Expanded into component-driven UIs and backend fundamentals while polishing design sense.",
  //   },
  //   {
  //     date: "2024",
  //     title: "Industry Internship",
  //     org: "Website Revamp (WordPress + CSS)",
  //     body:
  //       "Rebuilt an existing site to meet requirements and improve optimization and SEO.",
  //   },
  //   {
  //     date: "2024–2025",
  //     title: "Projects",
  //     org: "UX + Dev blend",
  //     body:
  //       "React Native watchlist app; Unity (C#) movement prototype; ongoing UI/UX explorations.",
  //   },
  // ];

  return (
    <div className={styles.pgRoot}>
      <div className={styles.pgContainer}><br></br>
        {/* HERO */}
        <header className={styles.pgHero} aria-label="About hero">
          <div className={styles.pgHeroInner}>
            <div className={styles.pgHeroLeft}>
              <div className={styles.pgSprite}>
                <img src="avatar1.png" alt="Sanraj — pixel portrait" />
              </div>
            </div>
            <div className={styles.pgHeroRight}>
              <h1 className={styles.pgTitle}>Player Profile</h1>
              <p className={styles.pgLead}>
                Hello! I'm Sanraj, a Year 2 student at Republic Polytechnic, passionate about becoming a skilled UI/UX Designer and Software Developer. I thrive at the intersection of creativity and precision, crafting user-centered digital experiences that tell compelling stories. With a drive to innovate and explore, I'm excited to push the boundaries of design and technology.
              </p>
              <div className={styles.heroActions}>
                <a className={`${styles.btn} ${styles.btnRrimary}`} href="/Resume.pdf" download>Download Resume</a>
                <Link className={`${styles.btn}`} to="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* QUICK STATS */}
        {/* <section className={styles.section} aria-labelledby="stats-title"><br></br>
          <h2 id="stats-title" className={styles.sectionTitle}>Quick Stats</h2>
          <div className={styles.statGrid}>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Year 2 @RP</h3>
              <p className={styles.cardDesc}>
                Currently studying and freelancing when possible.
              </p>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Maker</h3>
              <p className={styles.cardDesc}>
                Developer and Desginer.
              </p>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>XP Boosters</h3>
              <p className={styles.cardDesc}>
                Video creation and editing on my "Edits" style TikTok social media platform.
              </p>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Main Quest</h3>
              <p className={styles.cardDesc}>
                Boostersecoming the best version of myself. Mentally, creatively, and professionally.
              </p>
            </article>
          </div>
        </section> */}

        {/* TOOLBOX */}
        {/* <section className={styles.section} aria-labelledby="toolbox-title"><br></br>
          <h2 id="toolbox-title" className={styles.sectionTitle}>Dev Kit</h2>
          <div className={styles.toolbox}>
            <div className={styles.toolGroup}><br></br>
              <h4 className={styles.toolTitle}>Languages</h4><br></br>
              <div className={styles.toolBadges}>
                {toolsCode.map((t) => (
                  <span key={t} className={styles.toolBadge}>{t}</span>
                ))}
              </div>
            </div>
            <div className={styles.toolGroup}><br></br>
              <h4 className={styles.toolTitle}>Design</h4><br></br>
              <div className={styles.toolBadges}>
                {toolsDesign.map((t) => (
                  <span key={t} className={styles.toolBadge}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* JOURNEY / QUEST LOG */}
        {/* <section className={`${styles.section} ${styles.timeline}`} aria-labelledby="journey-title"><br></br>
          <h2 id="journey-title" className={styles.sectionTitle}>QUEST LOG</h2>
          <ol className={styles.timelineList}>
            {timeline.map((item, i) => (
              <li key={i} className={styles.timelineItem}>
                <div className={styles.timelineNode} aria-hidden="true">◆</div>
                <div className={styles.timelineContent}>
                  <div className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardDate}>{item.date}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <div className={styles.cardOrg}>{item.org}</div>
                    <p className={styles.cardDesc}>{item.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section> */}

        {/* HOBBIES */}
        {/* <section className={styles.section} aria-labelledby="hobbies-title">
          <h2 id="hobbies-title" className={styles.sectionTitle}>HOBBIES & INTERESTS</h2>
          <div className={styles.hobbiesGrid}>
            <figure className={styles.hobbyCard}>
              <img src="hobby1.jpeg" alt="Running" className={styles.hobbyImage} />
              <figcaption className={styles.hobbyName}>Running 🏃‍♂️</figcaption>
            </figure>
            <figure className={styles.hobbyCard}>
              <img src="hobby2.jpg" alt="Cycling" className={styles.hobbyImage} />
              <figcaption className={styles.hobbyName}>Cycling 🚴‍♂️</figcaption>
            </figure>
            <figure className={styles.hobbyCard}>
              <img src="hobby3.jpg" alt="Gaming" className={styles.hobbyImage} />
              <figcaption className={styles.hobbyName}>Gaming 🎮</figcaption>
            </figure>
            <figure className={styles.hobbyCard}>
              <img src="hobby4.jpeg" alt="Video editing" className={styles.hobbyImage} />
              <figcaption className={styles.hobbyName}>Editing 🎥</figcaption>
            </figure>
          </div>
        </section> */}

        {/* VALUES */}
        {/* <section className={styles.section} aria-labelledby="values-title">
          <h2 id="values-title" className={styles.sectionTitle}>WHAT I CARE ABOUT</h2>
          <div className={styles.valuesGrid}>
            {principles.map((p) => (
              <article key={p.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </article>
            ))}
          </div>
        </section> */}

        {/* CONTACT CTA */}
        {/* <footer id="contact" className={styles.pgFooter}>
          <div className={styles.footerLeft}>
            <h2 className={styles.sectionTitle}>LET’S BUILD SOMETHING</h2>
            <p className={styles.footerText}>
              Open to collabs, internships, and projects where design and code meet.
            </p>
          </div>
          <div className={styles.footerActions}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="mailto:youremail@example.com">
              EMAIL ME
            </a>
            <a className={styles.btn} href="/#projects">
              VIEW PROJECTS
            </a>
          </div>
        </footer> */}

        <p className={styles.wpFooter}>
          -- 🛠️ Work In Progress 🚧 --
        </p>

      </div>
    </div>
  );
};

export default Playground;
