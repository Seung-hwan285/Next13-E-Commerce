'use client';
// import Image from 'next/image';
import styles from './page.module.css';
import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // fdsa
  return (
    <>
      <main className={styles.main}>
        <div>
          <h1 className="text-current">하이하이</h1>
          <Link href="/login">로그인</Link>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      </main>
    </>
  );
}
