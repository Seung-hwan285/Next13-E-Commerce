'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/components/product/product.module.css';

function ProductPagination({ pages }: number) {
  const pageItems = [...Array(pages).keys()];

  console.log(pageItems);
  return (
    <>
      <ul className={styles.paginationContainer}>
        {pageItems.length &&
          pageItems.map((p: number) => {
            const page = p + 1;
            return (
              <li className={styles.pageNumber} key={p}>
                <Link href={`${page}`}>{page}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
export default ProductPagination;
