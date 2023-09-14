'use client';

import React from 'react';
import styles from '@/components/product/product.module.css';
import { Product } from '@/lib/types/product';
import Link from 'next/link';
import { productData } from '@/lib/jotail/themState';
import { useAtom } from 'jotai';

function ProductItems() {
  const [productAtom] = useAtom(productData);

  return (
    <>
      <ul className={styles.productContainer}>
        {productAtom &&
          productAtom.data.map(({ id, name, image, price }: Product) => {
            return (
              <div key={id}>
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
                    {/*<CartButton id={id} />*/}
                  </div>
                </Link>
              </div>
            );
          })}
      </ul>
    </>
  );
}
export default ProductItems;
