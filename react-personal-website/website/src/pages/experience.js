import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./single.module.css";

import KKHRoster from "../components/projects/KKHRoster";
import Vonn from "../components/projects/Vonn";
import TiktokMedia from "../components/projects/TiktokMedia";
// import ProjectPlaceHolder from "../components/projects/ProjectPlaceholder";

const Icons = {
  Maximize: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>,
  Minimize: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" /></svg>,
  User: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Briefcase: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  FileText: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
  Phone: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  MapPin: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  GradCap: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  BriefcaseSmall: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
};

const PROJECT_REGISTRY = {
  "p-kkh": { component: KKHRoster, meta: { id: "p-kkh", title: "KKH Roster App", labelType: "Full-Stack Development", img: "/kkh.JPG" } },
  "p-vonn": { component: Vonn, meta: { id: "p-vonn", title: "Vonn Sg", labelType: "WordPress Development", img: "/vonn.png" } },
  "p-tiktok": { component: TiktokMedia, meta: { id: "p-tiktok", title: "TikTok Media", labelType: "Content & Media", img: "/tiktok.JPG" } },
  // "p-placeholder": { component: ProjectPlaceHolder, meta: { id: "p-placeholder", title: "Project Placeholder", labelType: "Placeholder", img: "/PlaceholderImage.jpg" } },
};

const PROJECT_LIST = Object.values(PROJECT_REGISTRY).map(p => p.meta);

const TIMELINE = [
  { id: "t1", date: "Apr 2023 – Present", title: "Diploma in Digital Design & Development", org: "Republic Polytechnic", icon: <Icons.GradCap /> },
  { id: "t2", date: "Mar 2025 – Aug 2025", title: "Internship", org: "Cameron SLB", icon: <Icons.BriefcaseSmall /> },
  { id: "t3", date: "Sep 2022 – Nov 2023", title: "Internship", org: "Vonn Pte Ltd", icon: <Icons.BriefcaseSmall /> },
  { id: "t4", date: "Jan 2021 – Dec 2022", title: "Nitec in Web Applications", org: "ITE College West", icon: <Icons.GradCap /> },
];

const SKILLS = { 
  "Frontend": ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  "Backend & DB": ["Node.js", "Express", "Python", "MySQL", "PHP", "C#"],
  "Tools & Cloud": ["GitHub", "Render", "Clever Cloud", "WordPress"],
  "Design & Media": ["Figma", "Premiere Pro", "After Effects", "Photoshop", "Illustrator", "CapCut", "Topaz Video AI", "Unity"]
};

const SkillIcon = ({ name, delay }) => {
  const getIcon = () => {
    switch (name) {
      case "Figma": return <svg viewBox="0 0 38 57" className={styles.svgIcon}><path fill="currentColor" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0zM0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5zM0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5zM19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z"/></svg>;
      case "React": return <svg viewBox="-11.5 -10.23174 23 20.46348" className={styles.svgIcon}><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>;
      case "Python": return <svg viewBox="0 0 110 110" className={styles.svgIcon}><path fill="currentColor" d="M53.9 0C25 0 25 25 25 25v13.5h29.2V44H21C9 44 0 53.6 0 68.3c0 14.8 9 18.2 21 18.2h8.5v-13s0-14.8 15-14.8h25.4c14.2 0 14.8-14.6 14.8-14.6V15c0-15-20.7-15-30.8-15zM41.7 13.3c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2zm14.4 39.5c-15.5 0-15.5 14.8-15.5 14.8v17.4c0 15 20.7 15 30.8 15 29 0 29-25 29-25V61.5H71v5.5h33c12 0 21-9.6 21-24.3 0-14.8-9-18.2-21-18.2h-8.5v13s0 14.8-15 14.8H56.1zM68.3 84.5c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2z"/></svg>;
      case "Unity": return <svg viewBox="0 0 24 24" className={styles.svgIcon}><path fill="currentColor" d="M12 1.3L2 7v10l10 5.7 10-5.7V7L12 1.3zm0 2.3l8 4.6v3.2l-8-4.6-8 4.6V8.2l8-4.6zm0 16.8l-8-4.6v-3.2l8 4.6 8-4.6v3.2l-8 4.6z"/></svg>;
      case "Node.js": return <svg viewBox="0 0 24 24" className={styles.svgIcon}><path fill="currentColor" d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm8.4 13.1l-8.4 4.8-8.4-4.8V8.9l8.4-4.8 8.4 4.8v6.2z"/></svg>;
      case "Photoshop": return <div className={styles.adobeIcon}>Ps</div>;
      case "Illustrator": return <div className={styles.adobeIcon}>Ai</div>;
      case "After Effects": return <div className={styles.adobeIcon}>Ae</div>;
      case "Premiere Pro": return <div className={styles.adobeIcon}>Pr</div>;
      case "C#": return <div className={styles.hexIcon}>C#</div>;
      default: return <div className={styles.textFallbackIcon}>{name.charAt(0)}</div>;
    }
  };

  return (
    <div className={`${styles.skillIconWrapper} ${styles.revealOnScroll}`} style={{ transitionDelay: `${delay}s` }}>
      {getIcon()}
      <div className={styles.skillTooltip}>{name}</div>
    </div>
  );
};

const getThemeColor = (type) => {
  switch (type) {
    case 'Content & Media': return 'var(--color-content)';
    case 'Full-Stack Development': return 'var(--color-fullstack)';
    case 'WordPress Development': return 'var(--color-web)';
    default: return 'var(--primary)';
  }
};

const ProjectCarouselCard = ({ p, isSelected, onClick, index }) => (
  <article 
    className={`${styles.carouselCard} ${isSelected ? styles.carouselCardSelected : ''} ${styles.revealOnScroll}`} 
    style={{ '--card-theme': getThemeColor(p.labelType), transitionDelay: `${index * 0.1}s` }} 
    onClick={() => onClick(p.id)}
  >
    <div className={styles.cardHeaderBar}>
      <span className={styles.cardHeaderDots}><i></i><i></i><i></i></span>
    </div>
    <div className={styles.carouselImgWrapper}>
      <img src={p.img} alt={p.title} loading="lazy" className={styles.carouselImg} onError={(e) => { e.target.src = 'https://placehold.co/600x400/18181b/52525b?text=Image+Not+Found'; }} />
    </div>
    <div className={styles.carouselContent}>
      <span className={styles.carouselTech}><span className={styles.statusDotCard} />{p.labelType}</span>
      <h3 className={styles.carouselTitle}>{p.title}</h3>
    </div>
  </article>
);

export default function Portfolio() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showYo, setShowYo] = useState(false);
  const [selectedId, setSelectedId] = useState(PROJECT_LIST[0].id);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const filtered = PROJECT_LIST.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.labelType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll(`.${styles.revealOnScroll}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filtered, selectedId]);

  useEffect(() => {
    if (filtered.length > 0 && !filtered.find(p => p.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [searchTerm, filtered, selectedId]);

  const handleCollapsedProfileClick = () => {
    setShowYo(true);
    setTimeout(() => { setShowYo(false); setIsSidebarOpen(true); }, 500);
  };

  const SelectedProjectComponent = PROJECT_REGISTRY[selectedId]?.component;

  return (
    <div className={styles.root}>
      <div className={styles.ambientBackground}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
      </div>
      <div className={styles.pageOverlay} />
      <div className={styles.gridBackground} />
      <div className={styles.scanline} />
      <div className={`${styles.scanline} ${styles.scanlineDelay}`} />

      <div className={styles.layoutContainer}>
        <aside className={`${styles.leftPanel} ${!isSidebarOpen ? styles.collapsed : ""}`}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}><Icons.User />Experience</span>
            <button className={styles.toggleBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <Icons.Minimize /> : <Icons.Maximize />}
            </button>
          </div>
          
          <div className={styles.panelContent}>
            <div className={styles.panelSection}>
              <div className={`${styles.sysIdCard} ${styles.revealOnScroll}`}>
                <div className={styles.idCardTop}>
                  <div className={styles.idAvatarWrapper}>
                    <img src="avatar.jpeg" alt="Sanraj" className={styles.idAvatar} />
                    <div className={styles.idScannerLine}></div>
                  </div>
                  <div className={styles.idDetails}>
                    <h2 className={styles.idName}>Sanraj</h2>
                    <div className={styles.idRole}>Full-Stack Developer</div>
                    <div className={styles.idMeta}><Icons.MapPin />Singapore</div>
                  </div>
                </div>
                <div className={styles.idActionsGrid}>
                  <a href="/Resume.pdf" className={styles.idActionBtn} download>
                    <Icons.FileText /> Resume
                  </a>
                  <Link to="/contact" className={styles.idActionBtn}>
                    <Icons.Phone /> Contact
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <div className={styles.sectionHeader}><Icons.Clock /> Career Timeline</div>
              <div className={styles.dataTrackList}>
                <div className={styles.animatedTimelineLine}></div>
                {TIMELINE.map((t, index) => (
                  <div key={t.id} className={`${styles.dataTrackItem} ${index === 0 ? styles.latestTrack : ''} ${styles.revealOnScroll}`} style={{ transitionDelay: `${index * 0.15}s` }}>
                    <div className={styles.trackIconNode}>{t.icon}</div>
                    <span className={styles.trackDate}>{t.date}</span>
                    <h4 className={styles.trackTitle}>{t.title}</h4>
                    <div className={styles.trackOrg}>{t.org}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.panelSection}>
              <div className={styles.sectionHeader}><Icons.Briefcase />My Skills</div>
              <div className={styles.modulesContainer}>
                {Object.entries(SKILLS).map(([cat, items], catIndex) => (
                  <div key={cat} className={`${styles.moduleCategory} ${styles.revealOnScroll}`} style={{ transitionDelay: `${catIndex * 0.15}s` }}>
                    <div className={styles.moduleTitle}>{cat}</div>
                    <div className={styles.skillIconGrid}>
                      {items.map((s, i) => <SkillIcon key={s} name={s} delay={(catIndex * 0.1) + (i * 0.05)} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.collapsedContent}>
            <div className={styles.collapsedProfileWrapper}>
              <div className={styles.collapsedAvatarWrapper} onClick={handleCollapsedProfileClick}>
                <div className={styles.collapsedAvatar}>
                  <img src="avatar.jpeg" alt="Profile" />
                  <div className={styles.idScannerLine}></div>
                </div>
                {showYo && <div className={styles.yoBubble}>Wassup!</div>}
              </div>
              <div className={styles.collapsedIcons}>
                <a href="/Resume.pdf" download className={styles.iconBtn} title="Download Resume"><Icons.FileText /></a>
                <Link to="/contact" className={styles.iconBtn} title="Contact"><Icons.Phone /></Link>
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.mainSection}>
          <div className={styles.libraryContainer}>
            <div className={styles.contentWrapper}>
              <div className={`${styles.libraryHeader} ${styles.revealOnScroll}`}>
                <div className={styles.searchWrapper}>
                  <div className={styles.searchIcon}><Icons.Search /></div>
                  <input type="text" className={styles.searchInput} placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className={styles.carouselContainer}>
                {filtered.map((p, index) => (
                  <ProjectCarouselCard key={p.id} p={p} isSelected={selectedId === p.id} onClick={setSelectedId} index={index} />
                ))}
                {filtered.length === 0 && <div className={styles.emptyState}>[ERROR] 404: No projects match the current query.</div>}
              </div>

              <div className={styles.dynamicProjectWrapper}>
                {SelectedProjectComponent && <SelectedProjectComponent key={selectedId} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}