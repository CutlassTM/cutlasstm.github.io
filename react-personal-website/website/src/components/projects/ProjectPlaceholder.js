import React from 'react';
import ProjectLayout from './ProjectLayout';
import styles from "../../pages/single.module.css";

export default function ProjectPlaceholder() {
  return (
    <ProjectLayout
      title="[Your Project Title Here]"
      role="[Your Role, e.g., Front-End Developer]"
      year="2026"
      type="[Project Type, e.g., Web Utility]"
      themeColor="var(--color-web)"
      heroImg="/PlaceholderImage.jpg"
      video="#"
      tech={["React", "JavaScript", "CSS3", "Tool 4", "Tool 5"]}
      liveLink="#"
      buttonLabel="Coming Soon"
    >
      <div className={styles.textContent}>
        <h2>Project Overview</h2>
        <p>[Briefly describe what the application does and the problem it solves. For example: A lightweight, browser-based image resizing tool designed to help users quickly scale and optimize images without sacrificing visual quality.]</p>
        
        <h2>My Role & Contributions</h2>
        <p>[Summarize your main responsibilities. Example: I developed the core user interface and engineered the file-processing logic to ensure fast, efficient performance entirely within the user's browser.]</p>
        
        <ul className={styles.featureList}>
          <li><strong>[Key Feature 1 - e.g., Intuitive UI/UX]:</strong> [Explain the feature. Example: Designed a clean, accessible drag-and-drop interface for seamless file uploads and immediate visual feedback.]</li>
          <li><strong>[Key Feature 2 - e.g., Client-Side Processing]:</strong> [Explain the technical achievement. Example: Implemented core manipulation logic directly in the browser to ensure maximum user privacy and zero server latency.]</li>
          <li><strong>[Key Feature 3 - e.g., Performance Optimization]:</strong> [Explain the outcome. Example: Structured the component hierarchy to ensure the application remains highly responsive, even when handling large, high-resolution media files.]</li>
        </ul>
      </div>
    </ProjectLayout>
  );
}