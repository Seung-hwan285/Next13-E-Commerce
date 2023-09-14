import React from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import styles from './layout.module.css';
import SearchBar from '@/components/search/SearchBar';
import CollectionToggle from '@/components/collection/CollectionToggle';

export default async function Navbar() {
  return (
    <nav className={styles.nav}>
      <div>
        <CollectionToggle />
      </div>

      <div className={styles.searchWrapper}>
        <SearchBar />
      </div>

      <div className={styles.navbarWrapper}>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
