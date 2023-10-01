import React from 'react';
import styles from '@/components/product/product.module.css';
import { Product } from '@/lib/types/product';
import { Image, Related } from '@/lib/types/cart';

async function ProductRelated({ productItems }: Product) {
  console.log(productItems);

  return (
    <>
      {productItems ? (
        <ul className={styles.relatedProduct}>
          {productItems.map(({ image, id, name }: Related) => {
            return (
              <li key={id} className={styles.relatedProductLi}>
                <div>
                  <h1>{name}</h1>
                  <img src={image?.url} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      {/*{productItems ? (*/}
      {/*  <ul className={styles.relatedContainer}>*/}
      {/*    {productItems.map((image: Image, id: string, name: string) => {*/}
      {/*      return (*/}
      {/*        <li key={id} className={styles.relatedLi}>*/}
      {/*          <img*/}
      {/*            className={styles.relatedcartImage}*/}
      {/*            src={image.url as string}*/}
      {/*            alt="image"*/}
      {/*          />*/}
      {/*          <span>{name}</span>*/}
      {/*        </li>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </ul>*/}
      {/*) : null}*/}
    </>
  );
}
export default ProductRelated;
