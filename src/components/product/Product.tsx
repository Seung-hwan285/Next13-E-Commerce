import React from 'react';
import styles from './product.module.css';
import { ProductAPI } from '@/lib/product';
import Link from 'next/link';
import { Product } from '@/lib/types/product';

async function Product() {
  const { data: products } = await ProductAPI.getAllProducts();

  return (
    <>
      <ul className={styles.productContainer}>
        {products &&
          products.map(({ id, name, image, price }: Product) => {
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
                    {/*<CartButton id={id} />*/}
                  </div>
                </Link>
              </>
            );
          })}
      </ul>
    </>
  );
}

export default Product;
