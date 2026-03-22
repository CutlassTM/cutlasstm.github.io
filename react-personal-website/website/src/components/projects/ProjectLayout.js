import React, { useState, useEffect, useRef } from "react";
import styles from "../../pages/single.module.css";

const Icons = {
  ExternalLink: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
  Play: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5V19L19 12L8 5Z" /></svg>
};

const embedURL = (url) => url ? (url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url) : null;

const useSiteStatus = (url) => {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (!url) return setStatus("inactive");
    let isMounted = true;
    const checkStatus = async () => {
      try {
        await fetch(url, { mode: 'no-cors', method: 'GET', signal: AbortSignal.timeout(5000) });
        if (isMounted) setStatus("active");
      } catch (error) {
        if (isMounted) setStatus("inactive");
      }
    };
    checkStatus();
    return () => { isMounted = false; };
  }, [url]);
  return status;
};

export default function ProjectLayout({ 
  title, role, year, type, themeColor, heroImg, video, tech = [], liveLink, buttonLabel, children 
}) {
  const status = useSiteStatus(liveLink);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasValidVideo = video && video !== "#" && video !== "https:#";
  const layoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    if (layoutRef.current) {
      const elements = layoutRef.current.querySelectorAll(`.${styles.revealOnScroll}`);
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [title]);

  return (
    <article className={styles.projectSection} style={{ '--card-theme': themeColor }} ref={layoutRef}>
      <div className={`${styles.heroContainer} ${styles.revealOnScroll}`}>
        {hasValidVideo && isPlaying ? (
          <iframe 
            src={`${embedURL(video)}?autoplay=1`} 
            title={title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            className={styles.heroMedia}
          />
        ) : (
          <div 
            className={styles.heroImageWrapper} 
            onClick={() => { if (hasValidVideo) setIsPlaying(true); }}
            style={{ cursor: hasValidVideo ? 'pointer' : 'default' }}
          >
            <img src={heroImg} alt={title} className={styles.heroMedia} />
            <div className={styles.heroOverlay}>
              <div className={styles.heroBadge}>{type}</div>
              <h1 className={styles.heroTitle}>{title}</h1>
              <p className={styles.heroSubtitle}>{role} • {year}</p>
            </div>
            {video && (
              <div className={styles.playButtonLarge}>
                <Icons.Play />
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.projectContentGrid}>
        <div className={`${styles.mainContent} ${styles.revealOnScroll}`} style={{ transitionDelay: '0.1s' }}>
          {children}
        </div>
        
        <aside className={styles.metaSidebar}>
          {tech && tech.length > 0 && (
            <div className={`${styles.metaBox} ${styles.revealOnScroll}`} style={{ transitionDelay: '0.2s' }}>
              <h3 className={styles.metaTitle}>Technologies</h3>
              <div className={styles.techTagContainer}>
                {tech?.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
              </div>
            </div>
          )}

          {liveLink && (
            <div className={`${styles.metaBox} ${styles.revealOnScroll}`} style={{ transitionDelay: '0.3s' }}>
              <h3 className={styles.metaTitle}>Live Project</h3>
              <a href={liveLink} target="_blank" rel="noreferrer" className={styles.primaryActionBtn}>
                {buttonLabel || "View Live Project"} <Icons.ExternalLink />
              </a>
              <div className={`${styles.statusPill} ${styles[`status${status}`]}`}>
                <span className={styles.statusDot}></span>
                {status === 'active' ? 'Status Active' : status === 'inactive' ? 'Status Inactive' : 'Checking Status...'}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}