import React from 'react';
import { ProductAPI } from '@/lib/requestApi/product';
import styles from './product.module.css';
import { ProductsType } from '@/lib/types/product';

async function getProduct() {
  const response = await ProductAPI.getAllProducts();
  const products = response.data;

  return products;
}

export default async function ProductItems() {
  const products = await getProduct();

  return (
    <>
      <ul className={styles.productContainer}>
        {products &&
          products.map(
            ({
              id,
              name,
              image,
              categories,
              description,
              price,
            }: ProductsType) => {
              console.log(image);
              return (
                <>
                  <div>
                    <li key={id}>
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
                      <p>{price.formatted_with_symbol}</p>
                    </li>
                  </div>
                </>
              );
            }
          )}
      </ul>
    </>
  );
}
