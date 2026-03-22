import React from 'react';
import ProjectLayout from './ProjectLayout';
import styles from "../../pages/single.module.css";

export default function KKHRoster() {
  return (
    <ProjectLayout
      title="KKH Roster App"
      role="Team Lead & Full-Stack Developer"
      year="2026"
      type="Full-Stack Development"
      themeColor="var(--color-fullstack)"
      heroImg="/KKHRosterApp.jpg"
      video="#"
      tech={["React", "Node", "Express", "MySQL", "Render", "Clever Cloud", "Figma", "GitHub"]}
      liveLink="https://kkh-rosters-application-fyp-republic.onrender.com/login"
      buttonLabel="View Application"
    >
      <div className={styles.textContent}>
        <h2>Project Overview</h2>
        <p>Developed as a Final Year Project at Republic Polytechnic, this full-stack application addresses the complex shift-scheduling needs for nurses at KK Women's and Children's Hospital (KKH). As the Team Lead, I guided a group of five developers to deliver a scalable, user-centric rostering solution from concept to deployment.</p>

        <h2>My Role & Contributions</h2>
        <p>I spearheaded the end-to-end software development lifecycle, bridging the gap between technical execution and client needs. My responsibilities spanned team management, UI/UX design, and full-stack engineering.</p>

        <ul className={styles.featureList}>
          <li><strong>Team Leadership & Collaboration:</strong> Directed a team of 4 developers, managing task delegation, code integration, and version control via GitHub to ensure seamless agile collaboration.</li>
          <li><strong>Stakeholder Management:</strong> Acted as the primary liaison with KKH stakeholders and our project supervisor. I led requirements gathering, facilitated regular feedback loops, and conducted rigorous user testing to ensure the application met actual clinical needs.</li>
          <li><strong>End-to-End UX/UI Design:</strong> Translated complex hospital rostering rules into an intuitive interface by designing comprehensive low-fidelity and high-fidelity wireframes in Figma.</li>
          <li><strong>Full-Stack Implementation:</strong> Engineered robust logic for automated shift allocations, built modular React components for easy updates, and structured MySQL schemas for efficient, real-time data querying.</li>
        </ul>

        <h2>Project Outcome & Recognition</h2>
        <p>The final application was highly successful, receiving official endorsement from our KKH stakeholders who praised its usability and effectiveness in solving their scheduling bottlenecks. Our project supervisor also highly commended the team's execution and the technical quality of the final product. As a testament to its success, the application was selected to be officially presented and showcased at the Republic Polytechnic Open House 2027.</p>
      </div>
    </ProjectLayout>
  );
}