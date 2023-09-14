'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './layout.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { productSSRState, showState } from '@/lib/jotail/themState';
import { getCollection } from '@/components/collection/action';
import ClientColletions from '@/components/collection/ClientColletions';

function NavBarItems() {
  const { data: session } = useSession();
  const [show, setShow] = useAtom(showState);
  // const [data] = useAtom(asyncData);

  const setData = useSetAtom(productSSRState);

  const handleLogoutClick = () => {
    signOut({
      // callbackUrl: '/',
      callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  // server action
  async function handleClick() {
    const res = await getCollection();
    setData(res.data);
  }

  return (
    <>
      <aside className={`${show ? styles.open : styles.close}`}>
        <div onClick={() => setShow(!show)} className={styles.closeToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.dropDownContainer}>
          <div className={styles.sidebarHead}>
            <h1>Sidebar</h1>
          </div>
          <div className={styles.sidebarBody}>
            <nav>
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

                <form action={handleClick}>
                  <li onClick={handleClick} className={styles.listCollection}>
                    <span>Collection</span>

                    <div className={styles.dropDown}>
                      <ClientColletions />
                    </div>
                  </li>
                </form>
              </div>
            </nav>
          </div>

          <div className={styles.sidebarFoot}>
            <p>2023-09-01</p>
          </div>
        </div>
      </aside>
    </>
  );
}
export default NavBarItems;
