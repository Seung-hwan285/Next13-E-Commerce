import React from 'react';
import styles from './loding.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinnerOverlay}>
      <div className={styles.LoadingSpinner}></div>
    </div>
  );
};

export default LoadingSpinner;
