'use client';

import { notFound, redirect } from 'next/navigation';
import styles from '@/components/product/product.module.css';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Product } from '@/lib/types/product';

function ProductItems({ items }: Product[]) {
  if (!items) {
    notFound();
  }

  return (
    <>
      <ul className={styles.productContainer}>
        {items &&
          items.map(({ id, name, image, price }: Product) => {
            return (
              <>
                <Link href={`/product/${id}`} key={id}>
                  <h1 className={styles.title}>{name}</h1>

                  <div className={styles.imageWrapper}>
                    {image && (
                      <img
                        className={styles.image}
                        src={image?.url}
                        alt="image"
                      />
                    )}
                  </div>
                  <div className={styles.detailWrapper}>
                    <p>{price.formatted_with_symbol}</p>
                  </div>
                </Link>
              </>
            );
          })}
      </ul>
    </>
  );
}
export default ProductItems;
