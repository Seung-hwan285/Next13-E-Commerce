import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // fdsa
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>하이하이</h1>
      </div>
    </main>
  );
}
