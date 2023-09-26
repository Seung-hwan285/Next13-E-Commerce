'use server';

import React from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import styles from './layout.module.css';
import SearchBar from '@/components/search/SearchBar';
import CollectionToggle from '@/components/collection/CollectionToggle';
import SearchList from '@/components/search/SearchList';
import { cookies } from 'next/headers';
import { CartAPI } from '@/lib/cart';

export default async function Navbar() {
  const cookie = cookies().get('cartId')?.value;
  const carts = await CartAPI.getCartItems(cookie);

  const { total_items } = carts;

  return (
    <nav className={styles.nav}>
      <CollectionToggle totalItems={total_items} />

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
