'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import styles from '@/components/layout/layout.module.css';
import Image from 'next/image';

function NavbarAuthIcon() {
  const { data: session } = useSession();
  const { name, image }: Session = session?.user || {};
  return (
    <>
      {image && (
        <div className={styles.imageWrapper}>
          <Image src={image} width="50" height="50" alt="image" />
          <h1>{name}</h1>
        </div>
      )}
    </>
  );
}
export default NavbarAuthIcon;
