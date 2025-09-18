import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./experience.module.css";

/* ------------------------ Data ------------------------ */
const ALL_PROJECTS = [
  {
    id: "p-webdev",
    category: "development",
    featured: true,
    title: "Vonn.sg",
    excerpt: "WordPress build + CSS revamp with SEO improvements.",
    description: (
      <>
        Built a custom WordPress site from scratch. Refined layout and CSS, improved accessibility and SEO, and collaborated with the client to modernize design and performance.
      </>
    ),
    img: "development1.png",
    tech: ["WordPress", "CSS", "SEO"],
    role: "WordPress Developer",
    year: 2023,
    live: "https://vonn.sg/",
  },
  {
    id: "p-gitbiz",
    category: "development",
    featured: true,
    title: "GitBiz Render",
    excerpt: "Event & bidding platform for organisations and clients.",
    description: (
      <>
        Full-stack event platform with event creation, lifecycle flows, and a bidding subsystem. Designed for usability and clear event management.
      </>
    ),
    img: "development2.png",
    tech: ["NodeJs", "Express", "MongoDB", "React"],
    role: "Full-stack Developer",
    year: 2024,
    live: "https://sanraj2.onrender.com/",
  },
  {
    id: "p-gamedev",
    category: "development",
    featured: false,
    title: "Player Movements",
    excerpt: "Movement systems and gesture controls for client game.",
    description:
      "Contributed to Milestone 1 of game development. Implementing movement mechanics, gesture inputs, directional controls, and motion smoothing using Unity and C#.",
    img: "development3.png",
    tech: ["Unity", "C#"],
    role: "Gameplay Programmer",
    year: 2024,
  },
  {
    id: "p-vr",
    category: "development",
    featured: true,
    title: "VR Puzzle Game",
    excerpt: "Immersive VR 4-piece puzzle (Vive).",
    description: "Prototyped a VR puzzle game featuring four distinct challenges using Unity and C#, with HTC Vive integration.",
    video: "https://www.youtube.com/watch?v=GMU3yksgGoc",
    tech: ["Unity", "C#", "VR"],
    role: "Game Developer",
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
        A watchlist app with category filters, search and CRUD operations. Built
        with feedback and simple stats to improve discoverability.
        <br />
        <a href="https://github.com/C346-2024-Day4/lesson05-ps-CutlassTM/tree/main" target="_blank" rel="noreferrer">
          Repo →
        </a>
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
    excerpt: "Dark-themed React Native app for tracking shows & films.",
    description: (
      <>
        Watchlist tool with categories, ratings and usage statistics. Dark-theme focused UX and simple CRUD flows.
        <br />
        <a href="https://github.com/C346-2024-Day4/mad-miniproject-CutlassTM/tree/main" target="_blank" rel="noreferrer">
          Repo →
        </a>
      </>
    ),
    tech: ["React Native"],
    role: "Mobile Developer",
    year: 2023,
    video: "https://www.youtube.com/watch?v=exPyTJcxm00",
  },
  {
    id: "p-portfolio",
    category: "design",
    featured: false,
    title: "Portfolio Design",
    excerpt: "Cohesive portfolio layout, typography and presentation.",
    description:
      "Designed a polished portfolio in Adobe Illustrator, focusing on layout, typography and user flow to showcase UI/UX work.",
    img: "design1.png",
    tech: ["Illustrator", "UI/UX"],
    role: "UI/UX Designer",
    year: 2024,
  },
  {
    id: "p-encita",
    category: "design",
    featured: false,
    title: "Encita App (Figma)",
    excerpt: "High-fidelity Figma prototype with micro-interactions.",
    description: (
      <>
        High-fidelity wireframes and prototype produced in Figma with emphasis on micro-interactions, accessibility and user flow.
        <br />
        <a href="https://www.figma.com/design/aqUJxHVrrduZsh18PkCxg5/Encita-High-fidelity-Wireframe" target="_blank" rel="noreferrer">
          Figma →
        </a>
      </>
    ),
    tech: ["Figma", "UI/UX"],
    role: "UI/UX Designer",
    year: 2024,
    video: "https://www.youtube.com/watch?v=1nAy9SUDP8k",
  },
  {
    id: "p-styleshop",
    category: "design",
    featured: false,
    title: "StyleShop Prototype",
    excerpt: "Conversion-focused shopping UX (Figma).",
    description: (
      <>
        Clean shopping UX prototype emphasising clear conversion paths and usable interactions.
        <br />
        <a href="https://www.figma.com/design/RZzgPTllxotEbRB9cpaWOa/CA3---StyleShop" target="_blank" rel="noreferrer">
          Figma →
        </a>
      </>
    ),
    img: "design3.png",
    tech: ["Figma", "UI/UX"],
    role: "UI/UX Designer",
    year: 2023,
  },
];

/* ------------------------ Timeline ------------------------ */
const TIMELINE = [
  {
    id: "t-2026",
    date: "Apr 2023 – Present",
    title: "Diploma @RP",
    org: "Republic Polytechnic",
    desc: "Pursuing Diploma in Digital Design & Development.",
    icon: "code",
  },
  {
    id: "t-2025",
    date: "Mar 2025 – Aug 2025",
    title: "Internship @Cameron",
    org: "SLB",
    desc: "Manufacturing Intern. Did diagnostics supports & process improvements for company.",
    icon: "briefcase",
  },
  {
    id: "t-2022",
    date: "Sep 2022 – Nov 2023",
    title: "Internship @Vonn",
    org: "Vonn Pte Ltd",
    desc: "Assistance Intern. Did ad-hoc activities and Website Development.",
    icon: "briefcase",
    projectId: "p-webdev",
  },
  {
    id: "t-2021",
    date: "Jan 2021 – Dec 2022",
    title: "Nitec in Web Applications",
    org: "ITE College West",
    desc: "Graduated in Nitec in Web Applications.",
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
  Program_Languages: ["JavaScript", "TypeScript", "Python", "PHP", "C#", "HTML5"],
  Frameworks: ["React", "React Native", "Node.js", "Express", "Unity"],
  Utilities: ["Git", "Figma", "VSCode", "MongoDB", "PowerApps"],
  Tools: ["Figma", "Illustrator", "Photoshop"],
};

/* ------------------------ Helpers ------------------------ */
function embedURL(url) {
  if (!url) return null;
  return url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url;
}

/* ------------------------ Icons (SVG) ------------------------ */
function IconFor(name, props = {}) {
  switch (name) {
    case "code":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...props} aria-hidden="true">
          <path fill="currentColor" d="M8.7 17.3L3.4 12 8.7 6.7 10.1 8.1 6.5 12l3.6 3.9-1.9 1.4zM15.3 6.7L20.6 12l-5.3 5.3-1.4-1.4L17.5 12l-3.6-3.9 1.4-1.4z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...props} aria-hidden="true">
          <path fill="currentColor" d="M10 4h4v2h5v12H5V6h5V4zm0 2v2h4V6h-4z" />
        </svg>
      );
    case "gamepad":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...props} aria-hidden="true">
          <path fill="currentColor" d="M6 10v4h2v-2h2v2h2v-2h2v2h2v-4c0-2.2-1.8-4-4-4H10C7.8 6 6 7.8 6 10z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...props} aria-hidden="true">
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
    <section className={styles.timelineVertical} aria-label="Work timeline">
      <h2 className={styles.sectionTitle}>Progression</h2>

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

              <div className={styles.timelineNodeWrap}>
                <button
                  className={`${styles.timelineNodeBtn} ${isActive ? styles.timelineNodeBtnActive : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(ev.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(ev.id);
                    }
                  }}
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
    blipRef.current.volume = 0.22;
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

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        blipRef.current?.play().catch(() => { });
      } catch { }
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
      <div className={styles.xpContainer}>

        <header className={styles.xpHero}>
          <div className={styles.xpHeroInner}>
            <div className={styles.xpHeroLeft}>
              <h1 className={styles.xpName}>Experience</h1>
              <p className={styles.xpLead}>Featuring my projects, internships, skillset and journey.</p>
            </div>

            <div>
              <div className={styles.xpSprite}>
                <img src="avatar1.png" alt="Profile avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Controls + Search */}
        <div className={styles.controlsRow}>
          <div className={styles.categoryTabs} role="tablist" aria-label="Project categories">
            {["development", "design"].map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedTag(null);
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}

            <button
              className={`${styles.tab} ${activeCategory === "all" ? styles.tabActive : ""}`}
              onClick={() => {
                setActiveCategory("all");
                setSelectedTag(null);
              }}
            >
              All
            </button>
          </div>

          <div className={styles.searchAndTags}>
            <input
              className={styles.search}
              placeholder="Search projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />

            <div className={styles.tagsRow} role="toolbar" aria-label="Filter by technology">
              <button className={`${styles.tag} ${selectedTag === null ? styles.tagActive : ""}`} onClick={() => setSelectedTag(null)}>
                All
              </button>
              {allTags.map((t) => (
                <button key={t} className={`${styles.tag} ${selectedTag === t ? styles.tagActive : ""}`} onClick={() => setSelectedTag((prev) => (prev === t ? null : t))}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setModal(p);
                }}
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
                      {p.tech?.slice(0, 3).map((t) => (
                        <span key={t} className={styles.badge}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardActions}>
                      <button
                        className={`${styles.fav} ${favorites.includes(p.id) ? styles.favActive : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(p.id);
                        }}
                        aria-pressed={favorites.includes(p.id)}
                        aria-label={favorites.includes(p.id) ? "Unfavorite project" : "Add project to favorites"}
                      >
                        ♥
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filteredProjects.length === 0 && <div className={styles.noResults}>No projects found. Try resetting filters or search.</div>}
          </div>

          <aside className={styles.sidePanel}>
            <section>
              <h3 className={styles.sideTitle}>Skills</h3><br></br>
              {Object.entries(SKILLS).map(([group, list]) => (
                <div key={group} className={styles.skillGroup}>
                  <h4>{group.replace(/_/g, " ")}</h4>
                  <div className={styles.skillList}>
                    {list.map((s) => (
                      <span key={s} className={styles.skillPill}>
                        {s}
                      </span>
                    ))}
                  </div><br></br>
                </div>
              ))}
            </section>

            <section style={{ marginTop: 12 }}>
              <h3 className={styles.sideTitle}>Favorites</h3>
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

        {/* Timeline */}
        <TimelineVertical events={TIMELINE} onOpenProject={(pid) => openProjectModalById(pid)} /><br></br>

        {/* Modal */}
        {modal && (
          <div className={styles.modalOverlay} onClick={() => setModal(null)}>
            <div className={styles.modalCard} role="dialog" aria-modal="true" aria-label={`Project details ${modal.title}`} onClick={(e) => e.stopPropagation()}>
              <button ref={closeRef} className={styles.modalClose} onClick={() => setModal(null)} aria-label="Close dialog">✖</button>

              <div className={styles.modalLeft}>
                <div className={styles.modalMedia}>
                  {modal.video ? <div className={styles.embedWrapper}><iframe title={modal.title} src={embedURL(modal.video)} frameBorder="0" allowFullScreen /></div> : <img src={modal.img || "black_bg.png"} alt={modal.title} />}
                </div>
              </div>

              <div className={styles.modalRight}>
                <h1 className={styles.modalTitle}>{modal.title}</h1>
                <p className={styles.modalMeta}>{modal.role} • {modal.year}</p>
                <div className={styles.modalDesc}>{modal.description}</div>
                <div className={styles.modalTech}>
                  {modal.tech?.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
                </div>

                <div className={styles.modalActions}>
                  {modal.live && <a className={styles.btn} href={modal.live} target="_blank" rel="noreferrer">View Live</a>}
                  <button className={styles.btn} onClick={() => { toggleFavorite(modal.id); }} aria-pressed={favorites.includes(modal.id)}>{favorites.includes(modal.id) ? 'Unfavorite' : 'Add to favorites'}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <footer className={styles.xpFooter}>
          <div className={styles.footerActions}>
            <a className={`${styles.btn} ${styles.btnResume}`} href="/Resume.pdf" download>Download Resume</a>
            <Link className={`${styles.btn} ${styles.btnContact}`} to="/home">Contact</Link>
          </div>
        </footer>

      </div>
    </div>
  );
}
