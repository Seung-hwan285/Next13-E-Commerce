'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import { productState } from '@/lib/jotail/themState';
import styles from '@/components/product/product.module.css';
import Link from 'next/link';

function SearchList() {
  const products = useAtomValue(productState);

  return (
    <>
      <ul className={styles.resultList}>
        {products &&
          products.map(({ id, name }) => {
            return (
              <Link href={`/search/${name}`} key={id}>
                <h1 className={styles.searchTitle}>{name}</h1>
              </Link>
            );
          })}
      </ul>
    </>
  );
}
export default SearchList;
