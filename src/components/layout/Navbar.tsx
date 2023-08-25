import React from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { AiOutlineCaretDown } from 'react-icons/ai';
import styles from './layout.module.css';
import NavBarItems from '@/components/layout/NavBarItems';
import Categories from '@/components/categories/Categories';

/*  Server Component  */
export default async function Navbar() {
  return (
    <nav className={styles.nav}>
      {/*  Client Component  */}
      <div className={styles.imageWrapper}>
        <div className={styles.navbarUl}>
          <NavBarItems icon={<AiOutlineCaretDown />} />
        </div>
      </div>

      {/*  Server Component  */}
      <div className={styles.navbarWrapper}>
        <Categories />
        {/*Client Component*/}
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
