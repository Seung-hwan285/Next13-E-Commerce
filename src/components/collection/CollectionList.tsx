'use client';
import styles from './collection.module.css';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types/product';

function CollectionList({ products }: Product) {
  return (
    <>
      {products && (
        <ul className={styles.container}>
          {products.map(({ name, id }) => {
            return (
              <div key={id} className={styles.wrapper}>
                <Link href={`/search/${name}`} className={styles.item}>
                  {name}
                </Link>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}
export default CollectionList;
