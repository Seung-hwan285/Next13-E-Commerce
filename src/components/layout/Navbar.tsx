import React from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import styles from './layout.module.css';
import SearchBar from '@/components/search/SearchBar';
import CollectionToggle from '@/components/collection/CollectionToggle';
import SearchList from '@/components/search/SearchList';

export default async function Navbar() {
  return (
    <nav className={styles.nav}>
      <CollectionToggle />

      <div className={styles.searchWrapper}>
        <SearchBar />
        <SearchList />
      </div>

      <div className={styles.navbarWrapper}>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
