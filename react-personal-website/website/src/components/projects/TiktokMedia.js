import React from 'react';
import ProjectLayout from './ProjectLayout';
import styles from "../../pages/single.module.css";

export default function TikTokMedia() {
  return (
    <ProjectLayout
      title="TikTok Media Account"
      role="Digital Content Creator & Video Editor"
      year="Active"
      type="Content & Media"
      themeColor="var(--color-content)"
      heroImg="/Tiktok.jpg"
      video="#"
      tech={["After Effects", "Premiere Pro", "CapCut", "Topaz Video AI"]}
      liveLink="https://www.tiktok.com/@nuusanraj"
      buttonLabel="View Account"
    >
      <div className={styles.textContent}>
        <h2>Project Overview</h2>
        <p>Managing an active TikTok channel dedicated to dynamic, short-form media, I produce highly engaging video content centered around anime, film, and digital pop culture. This ongoing project serves as a creative sandbox for mastering modern video editing techniques and understanding algorithmic content strategy.</p>
        
        <h2>My Role & Technical Workflow</h2>
        <p>Operating as the sole creator, I manage the entire production pipeline from concept and footage sourcing to advanced post-production and publishing.</p>

        <ul className={styles.featureList}>
          <li><strong>Advanced Post-Production:</strong> Execute complex editing workflows utilizing CapCut, After Effects and Premiere Pro, focusing on precise audio-beat synchronization, dynamic velocity control, and seamless visual transitions.</li>
          <li><strong>AI-Powered Enhancement:</strong> Integrate Topaz Video AI into the rendering pipeline to dramatically improve source footage clarity, effectively upscaling legacy anime and film clips to crisp, modern resolution standards.</li>
          <li><strong>Audience Retention Strategy:</strong> Tailor content specifically for short-form algorithmic environments, refining pacing and visual hooks to maximize viewer engagement and retention.</li>
        </ul>
      </div>
    </ProjectLayout>
  );
}