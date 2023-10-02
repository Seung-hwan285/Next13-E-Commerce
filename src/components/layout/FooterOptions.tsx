'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/app/[lang]/page.module.css';

function FooterOptions() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  // const redirectPathName = (location: string) => {};

  const optionCONFIG = ['en', 'kr'];

  return (
    <div className={styles.footerCountry}>
      <select>
        {optionCONFIG.map((option: string, index: number) => {
          return (
            <div key={index}>
              <option value={option}>{option}</option>
            </div>
          );
        })}
      </select>
    </div>
  );
}
export default FooterOptions;
