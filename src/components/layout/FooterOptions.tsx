'use client';

import React, { useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import styles from '@/app/[lang]/page.module.css';
import KR from '/public/icons/kr.svg';
import US from '/public/icons/us.svg';
import Link from 'next/link';
import Image from 'next/image';

function FooterOptions() {
  const pathname = usePathname();

  // Error Fix : hydration error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  const CONFIG = [
    {
      index: 1,
      icon: KR,
      value: 'kr',
    },
    {
      index: 2,
      icon: US,
      value: 'en',
    },
  ];

  const redirectPathName = (location: string) => {
    if (!pathname) redirect('/');

    const segemtns = pathname.split('/');

    segemtns[1] = location;
    return segemtns.join('/');
  };

  return (
    <div className={styles.footerBottom}>
      <ul style={{ width: '200px' }}>
        {CONFIG.map(({ icon, value, index }) => {
          return (
            <li key={index}>
              <Link value={value} href={redirectPathName(value)}>
                <Image src={icon} alt={'icon'} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default FooterOptions;
