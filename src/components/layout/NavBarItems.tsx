'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './layout.module.css';

function NavBarItems({ icon }: string) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleLogoutClick = () => {
    signOut({
      // callbackUrl: '/',
      callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  return (
    <div className={styles.dropDown} onClick={handleButtonClick}>
      {icon}

      {open && (
        <div className={styles.menu}>
          <li className={styles.list}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.list}>
            {!session ? (
              <Link href="/login">Login</Link>
            ) : (
              <button onClick={handleLogoutClick}>Logout</button>
            )}
          </li>

          <li className={styles.list}>
            <Link href="/cart">Cart</Link>
          </li>
        </div>
      )}
    </div>
  );
}
export default NavBarItems;
