import React from 'react';
import { ProductAPI } from '@/lib/product';
import styles from './product.module.css';

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const getDetailItem = await ProductAPI.getDetailProductItem(id);
  return <CartDetail item={getDetailItem} />;
}

export default Page;

async function CartDetail({ item }: any) {
  console.log(item);

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <img
            className={styles.Image}
            src={item.image.url}
            width={200}
            height={300}
            alt="Product"
          />
        </div>

        <div className={styles.productDetails}>
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{item.name}</h1>
            <p className={styles.productPrice}>
              {item.price.formatted_with_symbol}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
