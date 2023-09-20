'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import { productState, searchListState } from '@/lib/jotail/themState';
import styles from '@/components/product/product.module.css';
import Link from 'next/link';
import { useAtom } from 'jotai';

function SearchList() {
  const products = useAtomValue(productState);
  const [show, setIsShow] = useAtom(searchListState);

  const handleClick = () => {
    setIsShow(false);
  };

  return (
    <>
      {show && (
        <ul className={styles.resultList}>
          {products &&
            products.map(({ id, name }) => {
              return (
                <Link onClick={handleClick} href={`/search/${name}`} key={id}>
                  <h1 className={styles.searchTitle}>{name}</h1>
                </Link>
              );
            })}
        </ul>
      )}
    </>
  );
}
export default SearchList;
