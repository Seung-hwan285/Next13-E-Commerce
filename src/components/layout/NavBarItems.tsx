'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './layout.module.css';

function NavBarItems({ icon }: string) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const wrapperRef = React.useRef<HTMLInputElement>(
    null as HTMLInputElement | null as HTMLInputElement
  );

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleOutsideClick = (
    e: DocumentEventMap['mousedown'] | React.MouseEvent
  ) => {
    if (
      e.target instanceof HTMLElement &&
      !wrapperRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogoutClick = () => {
    signOut({
      // callbackUrl: '/',
      callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.dropDown}
      onClick={handleButtonClick}
      onMouseDown={handleOutsideClick}
    >
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
