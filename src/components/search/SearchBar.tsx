'use client';

import React, { startTransition, useEffect, useState } from 'react';
import globalStyle from '/src/app/page.module.css';

import styles from './search.module.css';
import { productState } from '@/lib/jotail/themState';
import { useAtom } from 'jotai';
import SearchList from '@/components/search/SearchList';
import { ProductAPI } from '@/lib/product';
import { useThrottle } from '@uidotdev/usehooks';

function SearchBar() {
  const [name, setName] = useState('');
  const [, setProduct] = useAtom(productState);

  const throttledValue = useThrottle(name, 2000);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);

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
        <input type="text" onChange={handleChange} value={name} />

        <SearchList />
        <p>{throttledValue}</p>
      </div>
    </>
  );
}
export default SearchBar;
