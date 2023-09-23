'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/components/product/product.module.css';

function ProductPagination({ pages }: number) {
  const pageItems = [...Array(pages).keys()];

  return (
    <>
      <ul className={styles.paginationContainer}>
        {pageItems.length &&
          pageItems.map((p: number) => {
            const page = p + 1;

            return (
              <>
                <Link
                  href={{
                    pathname: `/${page}`,
                  }}
                >
                  <li className={styles.pageNumber} key={p}>
                    {page}
                  </li>
                </Link>
              </>
            );
          })}
      </ul>
    </>
  );
}
export default ProductPagination;
