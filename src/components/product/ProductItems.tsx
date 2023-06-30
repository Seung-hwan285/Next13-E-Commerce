import React from 'react';
import { ProductAPI } from '@/lib/requestApi/product';

import styles from './product.module.css';
type productsTYpe = {
  id: number;
  name: string;
  image: string;
};

async function getProduct() {
  const { data } = await ProductAPI.getAllProducts();
  console.log('---------------------test');
  console.log(data);

  return data;
}

export default async function ProductItems() {
  const products = await getProduct();
  console.log(products);

  return (
    <>
      <ul className={styles.productContainer}>
        {products &&
          products.map(
            ({ id, name, image, categories, description, price }: any) => {
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
