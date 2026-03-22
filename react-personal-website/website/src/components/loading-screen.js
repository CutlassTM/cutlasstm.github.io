import React from "react";
import styles from "./loading-screen.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
      <div className={styles.text}>
        Loading
        <span className={styles.dots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;