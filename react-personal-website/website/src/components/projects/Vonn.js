import React from 'react';
import ProjectLayout from './ProjectLayout';
import styles from "../../pages/single.module.css";

export default function Vonn() {
  return (
    <ProjectLayout
      title="Vonn Sg"
      role="WordPress Developer & UI/UX Designer"
      year="2023"
      type="WordPress Development"
      themeColor="var(--color-web)"
      heroImg="/Vonn.png"
      video="#"
      tech={["WordPress", "HTML5", "CSS3", "SEO Optimization", "UI/UX Design"]}
      liveLink="https://vonn.sg/"
      buttonLabel="View Website"
    >
      <div className={styles.textContent}>
        <h2>Project Overview</h2>
        <p>Tasked with modernizing an outdated digital presence, I engineered a custom WordPress website tailored precisely to the client's business goals. This project involved a complete rebuild from the ground up, prioritizing modern aesthetics, seamless performance, and web accessibility.</p>
        
        <h2>My Role & Contributions</h2>
        <p>I managed the complete lifecycle of this website overhaul, acting as both the developer and designer to ensure the brand's identity met current web standards.</p>

        <ul className={styles.featureList}>
          <li><strong>UI/UX Modernization:</strong> Transformed a legacy interface into a highly responsive, user-centric platform by developing intuitive, custom layouts from scratch.</li>
          <li><strong>Custom Theme Development:</strong> Wrote custom HTML5 and CSS to achieve specific design requirements, avoiding reliance on bloated pre-built templates.</li>
          <li><strong>Technical SEO Strategy:</strong> Implemented comprehensive on-page SEO best practices to enhance organic search visibility and improve search engine rankings.</li>
          <li><strong>Performance Optimization:</strong> Fine-tuned site architecture and asset delivery to ensure rapid load times and flawless performance across all mobile and desktop devices.</li>
        </ul>
      </div>
    </ProjectLayout>
  );
}