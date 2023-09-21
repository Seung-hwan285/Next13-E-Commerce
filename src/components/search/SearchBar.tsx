'use client';

import React, { startTransition, useEffect, useState } from 'react';

import styles from './search.module.css';
import { productState, searchListState } from '@/lib/jotail/themState';
import { useAtom, useSetAtom } from 'jotai';
import { ProductAPI } from '@/lib/product';
import { useThrottle } from '@uidotdev/usehooks';

function SearchBar() {
  const [name, setName] = useState('');
  const [, setProduct] = useAtom(productState);

  const throttledValue = useThrottle(name, 2000);

  const setIsShow = useSetAtom(searchListState);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    setIsShow(true);
    if (value.length > 0) {
      startTransition(() => {
        const fetch = async () => {
          const { data } = await ProductAPI.getSearchProducts(value);
          setProduct(data);
        };

        fetch();
      });
    }
  };

  useEffect(() => {
    if (throttledValue.length === 0) {
      setProduct([]);
    }
  }, [throttledValue]);

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          onChange={handleChange}
          value={name}
        />
      </div>
    </>
  );
}
export default SearchBar;
