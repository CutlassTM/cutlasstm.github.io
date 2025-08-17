// Experience.js
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./experience.module.css";

/* ------------------------ Projects (full list) ------------------------ */

const ALL_PROJECTS = [
  // Featured/highlighted projects
  {
    id: "p-webdev",
    category: "development",
    featured: true,
    title: "Website Development",
    excerpt: "WordPress build + CSS revamp with SEO optimisations.",
    description: (
      <>
        Built a WordPress site during an internship and reworked the CSS, layout,
        and SEO. Worked with the supervisor to meet requirements and transformed
        the legacy site into a updated, accessible and optimized site.
        <br />
        <br />
        <strong>Highlights:</strong> SEO, accessibility fixes, responsive layout.
      </>
    ),
    img: "development1.png",
    tech: ["WordPress", "CSS", "SEO"],
    role: "WordPress Developer ",
    year: 2023,
    live: "https://vonn.sg/",
  },
  {
    id: "p-gitbiz",
    category: "development",
    featured: true,
    title: "GitBiz Web",
    excerpt: "Event and bidding platform for organisations and clients.",
    description: (
      <>
        Full-stack event platform with user event creation, participation flows,
        and a bidding subsystem for competitive events. Focused on usability and
        event lifecycle management.
      </>
    ),
    img: "development2.png",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    role: "Full-stack Developer ",
    year: 2024,
    live: "https://sanraj2.onrender.com/",
  },
  {
    id: "p-vr",
    category: "development",
    featured: true,
    title: "VR Puzzle Game",
    excerpt: "Immersive 4-piece VR puzzle Vive integration.",
    description: "Developed a small VR puzzle prototype for the Vive headset using Unity and C#.",
    video: "https://www.youtube.com/watch?v=GMU3yksgGoc",
    tech: ["Unity", "C#", "VR"],
    role: "Game Developer ",
    year: 2024,
  },

  // More projects (development)
  {
    id: "p-gamedev",
    category: "development",
    featured: false,
    title: "Freelance Game Movement",
    excerpt: "Movement systems, gestures and polish for client game.",
    description:
      "Milestone 1: implemented movement mechanics (gestures, directional controls, smoothing) in Unity (C#).",
    img: "development3.png",
    tech: ["Unity", "C#"],
    role: "Gameplay Programmer",
    year: 2024,
  },
  {
    id: "p-animestream",
    category: "development",
    featured: false,
    title: "AnimeStream (App)",
    excerpt: "Watchlist app with categories, search and CRUD.",
    description: (
      <>
        A feature-rich watchlist app with category browsing, text search, CRUD operations,
        and Android Toast feedback. Includes category filters and simple stats.
        <br />
        <br />
        <a href="https://github.com/C346-2024-Day4/lesson05-ps-CutlassTM/tree/main" target="_blank" rel="noreferrer">Repo →</a>
      </>
    ),
    video: "https://www.youtube.com/watch?v=2_hQIwV-F-g",
    tech: ["React Native"],
    role: "Mobile Developer",
    year: 2024,
  },

  {
    id: "p-watchlist",
    category: "development",
    featured: false,
    title: "Watchlist Management Tool",
    excerpt: "React Native app for tracking movies & shows.",
    description: (
      <>
        Watchlist tool with categories, ratings and stats. Dark theme focussed UX.
        <br />
        <br />
        <a href="https://github.com/C346-2024-Day4/mad-miniproject-CutlassTM/tree/main" target="_blank" rel="noreferrer">Repo →</a>
      </>
    ),
    tech: ["React Native"],
    role: "Mobile Developer",
    year: 2023,
    video: "https://www.youtube.com/watch?v=exPyTJcxm00",
  },

  // Design projects
  {
    id: "p-portfolio",
    category: "design",
    featured: false,
    title: "Portfolio Web Design",
    excerpt: "Adobe Illustrator portfolio with cohesive design and typography.",
    description:
      "I designed a visually appealing website portfolio in Adobe Illustrator, using an intuitive layout, cohesive colors, and engaging typography to showcase my UI/UX skills.",
    img: "design1.png",
    tech: ["Illustrator", "UI/UX"],
    role: "Ui/UX Designerr",
    year: 2024,
  },

  {
    id: "p-encita",
    category: "design",
    featured: false,
    title: "Encita App (Figma)",
    excerpt: "From-scratch Figma app: UI/UX, flows, prototypes.",
    description: (
      <>
        Built the Encita app high-fidelity wireframe and prototype with a full focus on micro-interactions, flow and accessibility.
        <br />
        <br />
        <a href="https://www.figma.com/design/aqUJxHVrrduZsh18PkCxg5/Encita-High-fidelity-Wireframe" target="_blank" rel="noreferrer">Figma →</a>
      </>
    ),
    tech: ["Figma", "UI/UX"],
    role: "Ui/UX Designer",
    year: 2024,
    video: "https://www.youtube.com/watch?v=1nAy9SUDP8k",
  },
  {
    id: "p-styleshop",
    category: "design",
    featured: false,
    title: "StyleShop Prototype",
    excerpt: "Simple & conversion-focused shopping UX in Figma.",
    description: (
      <>
        A clean shopping experience prototype built in Figma to emphasize conversion UX.
        <br />
        <br />
        <a href="https://www.figma.com/design/RZzgPTllxotEbRB9cpaWOa/CA3---StyleShop" target="_blank" rel="noreferrer">Figma →</a>
      </>
    ),
    img: "design3.png",
    tech: ["Figma", "UI/UX"],
    role: "Ui/UX Designer",
    year: 2023,
  },
];

/* ------------------------ Timeline entries - id, date (string), title, org, desc, icon, projectId ------------------------ */
const TIMELINE = [
  {
    id: "t-2026",
    date: "Apr 2023 – Present",
    title: "Diploma (DDD)",
    org: "Republic Polytechnic",
    desc: "Currently doing Diploma in Digital Design & Development.",
    icon: "code",
  },
  {
    id: "t-2025",
    date: "Mar 2025 – Aug 2025",
    title: "Internship @Cameron",
    org: "SLB",
    desc: "Completed an internship at SLB as a Maufacturing Intern.",
    icon: "briefcase",
  },
  {
    id: "t-2022",
    date: "Sep 2022 – Nov 2023",
    title: "Internship @Vonn",
    org: "Vonn Pte Ltd",
    desc: "Completed an internship at Vonn as an ad-hoc intern",
    icon: "briefcase",
    projectId: "p-webdev",
  },
  {
    id: "t-2021",
    date: "Jan 2021 – Dec 2022",
    title: "Nitec In Web Applications",
    org: "ITE College West",
    desc: "Completed Nitec in Web Applications.",
    icon: "code",
  },
  {
    id: "t-2017",
    date: "Jan 2017 – Dec 2020",
    title: "Secondary School",
    org: "Yuan Ching Secondary School",
    desc: "Completed 'N' Levels.",
    icon: "gamepad",
  },
];

/* ------------------------ Skills ------------------------ */
const SKILLS = {
  Code_Dialects: ["JavaScript", "TypeScript", "Python", "PHP", "C#", "HTML5"],
  Framework_Forge: ["React", "React Native", "Node.js", "Express", "Unity"],
  Pixel_Gear: ["Git", "Figma", "VSCode", "MongoDB", "PowerApps"],
  Creative_Mode: ["Figma", "Illustrator", "Photoshop"],
};

/* ------------------------ Helpers ------------------------ */
function embedURL(url) {
  if (!url) return null;
  return url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url;
}

/* ------------------------ Small inline icons (SVG) ------------------------ */
function IconFor(name, props = {}) {
  switch (name) {
    case "code":
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" {...props} aria-hidden="true">
          <path fill="currentColor" d="M8.7 17.3L3.4 12 8.7 6.7 10.1 8.1 6.5 12l3.6 3.9-1.9 1.4zM15.3 6.7L20.6 12l-5.3 5.3-1.4-1.4L17.5 12l-3.6-3.9 1.4-1.4z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" {...props} aria-hidden="true">
          <path fill="currentColor" d="M10 4h4v2h5v12H5V6h5V4zm0 2v2h4V6h-4z" />
        </svg>
      );
    case "gamepad":
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" {...props} aria-hidden="true">
          <path fill="currentColor" d="M6 10v4h2v-2h2v2h2v-2h2v2h2v-4c0-2.2-1.8-4-4-4H10C7.8 6 6 7.8 6 10z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" {...props} aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
      );
  }
}

/* ------------------------ TimelineVertical component ------------------------ */
function TimelineVertical({ events = [], onOpenProject = null }) {
  const [activeId, setActiveId] = useState(events[0]?.id ?? null);
  useEffect(() => {
    if (!activeId && events.length) setActiveId(events[0].id);
  }, [events, activeId]);

  function toggle(id) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <section className={styles.timelineVertical} aria-label="Work timeline"><br></br>
      <h2 className={styles.sectionTitle}>EXP Points</h2>

      <ol className={styles.timelineList}>
        {events.map((ev, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          const isActive = ev.id === activeId;
          const displayDate = ev.date || ev.year || "";
          return (
            <li
              key={ev.id}
              className={`${styles.timelineItem} ${side === "left" ? styles.timelineItemLeft : styles.timelineItemRight}`}
            >
              {/* card (left or right) */}
              <div
                className={styles.timelineContent}
                onClick={() => {
                  if (ev.projectId && onOpenProject) onOpenProject(ev.projectId);
                }}
                role="group"
                aria-labelledby={`${ev.id}-title`}
              >
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardDate}>{displayDate}</span>
                  </div>

                  <h3 id={`${ev.id}-title`} className={styles.cardTitle}>
                    {ev.title}
                  </h3>
                  <div className={styles.cardOrg}>{ev.org}</div>

                  <div id={`${ev.id}-content`} className={`${styles.cardBody} ${isActive ? styles.cardBodyExpanded : ""}`}>
                    <p>{ev.desc}</p>
                    {ev.more && <div className={styles.cardMore}>{ev.more}</div>}
                  </div>
                </div>
              </div>

              {/* central node */}
              <div className={styles.timelineNodeWrap}>
                <button
                  className={`${styles.timelineNodeBtn} ${isActive ? styles.timelineNodeBtnActive : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggle(ev.id); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(ev.id); } }}
                  aria-expanded={isActive}
                  aria-controls={`${ev.id}-content`}
                  aria-label={`${displayDate} — ${ev.title} at ${ev.org}`}
                >
                  <span className={styles.nodeIcon}>{IconFor(ev.icon || "briefcase")}</span>
                </button>
                <div className={styles.timelineConnector} aria-hidden="true" />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ------------------------ Main Experience component ------------------------ */
export default function Experience() {
  const [activeCategory, setActiveCategory] = useState("development");
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [modal, setModal] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("xp_favs_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const closeRef = useRef(null);
  const blipRef = useRef(null);

  useEffect(() => {
    blipRef.current = new Audio("/audio/blip.wav");
    blipRef.current.volume = 0.25;
  }, []);

  useEffect(() => {
    localStorage.setItem("xp_favs_v1", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setModal(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (modal) setTimeout(() => closeRef.current?.focus(), 60);
  }, [modal]);

  const allTags = Array.from(new Set(ALL_PROJECTS.flatMap((p) => p.tech || []))).sort();

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    const matchCategory = activeCategory === "all" ? true : p.category === activeCategory;
    const matchQuery = query.trim() === "" || (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase());
    const matchTag = !selectedTag || (p.tech && p.tech.includes(selectedTag));
    return matchCategory && matchQuery && matchTag;
  });

  const featured = ALL_PROJECTS.filter((p) => p.featured).slice(0, 4);

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      try { blipRef.current?.play().catch(() => { }); } catch { }
      return next;
    });
  }

  function openProjectModalById(projectId) {
    if (!projectId) return;
    const proj = ALL_PROJECTS.find((p) => p.id === projectId);
    if (proj) setModal(proj);
  }

  return (
    <div className={`${styles.xpRoot} ${modal ? styles.xpModalOpen : ""}`}>
      <header className={styles.xpHero}>
        <div className={styles.xpHeroInner}>
          <div className={styles.xpHeroLeft}><br></br>
            <h1 className={styles.xpName}>My Experience</h1>
            <p className={styles.xpLead}>Level UP!</p><br></br>

            <div className={styles.xpHeroActions}>
              <a className={`${styles.btn} ${styles.btnResume}`} href="/Resume.pdf" download>Download Resume</a>
              <Link className={`${styles.btn} ${styles.btnContact}`} to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className={styles.xpSprite}>
              <img src="avatar1.png" alt="Avatar sprite" />
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <section className={styles.featuredSection} aria-label="Featured projects"><br></br>
          <h2 className={styles.sectionTitle}>Pixel Picks</h2>
          <div className={styles.featuredGrid}>
            {featured.map((p) => (
              <article
                key={p.id}
                className={styles.featuredCard}
                onClick={() => setModal(p)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setModal(p); }}
              >
                <div className={styles.featuredMedia}>
                  {p.video ? (
                    <iframe title={p.title} src={embedURL(p.video)} frameBorder="0" allowFullScreen />
                  ) : (
                    <img src={p.img} alt={p.title} />
                  )}
                </div>

                <div className={styles.featuredBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.excerpt}</p>

                  <div className={styles.featuredMeta}>
                    <div className={styles.metaLeft}>
                      <div className={styles.metaRole}>{p.role}</div>
                      <div>{p.year}</div>
                    </div>

                    <div className={styles.metaRight}>
                      <button
                        className={`${styles.favBtn} ${favorites.includes(p.id) ? styles.favBtnActive : ""}`}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                        aria-pressed={favorites.includes(p.id)}
                        title="Add to favorites"
                      >
                        ♥
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </header>

      {/* Full-width vertical timeline */}
      <TimelineVertical events={TIMELINE} onOpenProject={(pid) => openProjectModalById(pid)} /><br></br>

      {/* Filter + Search */}
      <div className={styles.controlsRow}>
        <div className={styles.categoryTabs} role="tablist" aria-label="Project categories">
          {["development", "design"].map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ""}`}
              onClick={() => { setActiveCategory(cat); setSelectedTag(null); }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          <button className={`${styles.tab} ${activeCategory === "all" ? styles.tabActive : ""}`} onClick={() => { setActiveCategory("all"); setSelectedTag(null); }}>All</button>
        </div>

        <div className={styles.searchAndTags}>
          <input className={styles.search} placeholder="Enter quest name…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search projects" />

          <div className={styles.tagsRow} role="toolbar" aria-label="Filter by technology">
            <button className={`${styles.tag} ${selectedTag === null ? styles.tagActive : ""}`} onClick={() => setSelectedTag(null)}>All</button>
            {allTags.map((t) => (
              <button key={t} className={`${styles.tag} ${selectedTag === t ? styles.tagActive : ""}`} onClick={() => setSelectedTag((prev) => (prev === t ? null : t))}>{t}</button>
            ))}
          </div>
        </div>
      </div><br></br>

      {/* Projects Grid + Side Panel */}
      <main className={styles.projectsMain}>
        <div className={styles.projectsGrid}>
          {filteredProjects.map((p) => (
            <article
              key={p.id}
              className={styles.projectCard}
              tabIndex={0}
              role="button"
              onClick={() => setModal(p)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setModal(p); }}
            >
              <div className={styles.mediaWrap}>
                {p.video ? (
                  <iframe title={p.title} src={embedURL(p.video)} frameBorder="0" allowFullScreen />
                ) : (
                  <img src={p.img} alt={p.title} />
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.excerpt}</p>

                <div className={styles.cardFooter}>
                  <div>
                    {p.tech?.slice(0, 3).map((t) => <span key={t} className={styles.badge}>{t}</span>)}
                  </div>

                  <div className={styles.cardActions}>
                    <button className={`${styles.fav} ${favorites.includes(p.id) ? styles.favActive : ""}`} onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }} aria-pressed={favorites.includes(p.id)}>♥</button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filteredProjects.length === 0 && (
            <div className={styles.noResults}>No projects found. Try resetting filters or search.</div>
          )}
        </div>

        {/* Right column: skills + favorites */}
        <aside className={styles.sidePanel}>
          <section><br></br>
            <h3 className={styles.sideTitle}>Power-Ups</h3><br></br>
            {Object.entries(SKILLS).map(([group, list]) => (
              <div key={group} className={styles.skillGroup}>
                <h4>{group}</h4><br></br>
                <div className={styles.skillList}>
                  {list.map((s) => <span key={s} className={styles.skillPill}>{s}</span>)}
                </div><br></br>
              </div>
            ))}
          </section>

          <section style={{ marginTop: 12 }}>
            <h3 className={styles.sideTitle}>Fan Faves</h3>
            <div className={styles.favList}>
              {favorites.length === 0 && <p className={styles.muted}>No favorites yet — click ♥ on projects to save.</p>}
              {favorites.map((fid) => {
                const proj = ALL_PROJECTS.find((p) => p.id === fid);
                if (!proj) return null;
                return (
                  <div key={fid} className={styles.favItem} onClick={() => setModal(proj)} role="button" tabIndex={0}>
                    <img src={proj.img || "black_bg.png"} alt={proj.title} />
                    <div className={styles.favMeta}>
                      <strong>{proj.title}</strong>
                      <small>{proj.role} • {proj.year}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </main>

      {/* Modal */}
      {modal && (
        <div className={styles.modalOverlay} onClick={() => setModal(null)}>
          <div className={styles.modalCard} role="dialog" aria-modal="true" aria-label={`Project details ${modal.title}`} onClick={(e) => e.stopPropagation()}>
            <button ref={closeRef} className={styles.modalClose} onClick={() => setModal(null)} aria-label="Close dialog">✖</button>

            <div className={styles.modalLeft}>
              <div className={styles.modalMedia}>
                {modal.video ? <iframe title={modal.title} src={embedURL(modal.video)} frameBorder="0" allowFullScreen /> : <img src={modal.img || "black_bg.png"} alt={modal.title} />}
              </div>
            </div>

            <div className={styles.modalRight}>
              <h1 className={styles.modalTitle}>{modal.title}</h1>
              <p className={styles.modalMeta}>{modal.role} • {modal.year}</p>
              <div className={styles.modalDesc}>{modal.description}</div>
              <div className={styles.modalTech}>
                {modal.tech?.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
              </div>

              <div className={styles.modalActions}><br></br>
                {modal.live && <a className={styles.btn} href={modal.live} target="_blank" rel="noreferrer">View Live</a>}
                <button className={styles.btn} onClick={() => { toggleFavorite(modal.id); }} aria-pressed={favorites.includes(modal.id)}>{favorites.includes(modal.id) ? 'Unfavorite' : 'Add to favorites'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <footer className={styles.xpFooter}>
        <div>
          <h3>
            Let’s code in&nbsp;
            <span className={styles.red}>c</span>
            <span className={styles.orange}>o</span>
            <span className={styles.yellow}>l</span>
            <span className={styles.green}>o</span>
            <span className={styles.cyan}>r</span>, pixel by pixel.
          </h3>
          <p>Open to quests, side missions, or epic ideas. Reach out!</p>
        </div>
        <div className={styles.footerActions}>
          <a className={`${styles.btn} ${styles.btnResume}`} href="/Resume.pdf" download>Download Resume</a>
          <Link className={`${styles.btn} ${styles.btnContact}`} to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
