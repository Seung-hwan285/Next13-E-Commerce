import React from 'react';
import styles from './cart.module.css';
import { ProductAPI } from '@/lib/requestApi/product';

async function getCart() {
  const data = await ProductAPI.getCartItems();
  return data;
}

export default async function Cart() {
  const carts = await getCart();
  console.log(carts);

  return (
    <>
      {carts && (
        <div className={styles.cartContainer}>
          <h1 className={styles.cartTitle}>{carts.total_items}</h1>
          <p className={styles.cartSubtotal}>
            {carts.subtotal.formatted_with_symbol}
          </p>

          {<LineItemComponent item={carts.line_items} />}
        </div>
      )}
    </>
  );
}

function LineItemComponent({ item }: any) {
  console.log(item);
  return (
    <div>
      {item.map(({ id, name, image }) => {
        return (
          <div key={id} className={styles.cartListWrapper}>
            <p>Name : {name}</p>
            <img className={styles.cartImage} src={image.url} alt="image" />
          </div>
        );
      })}
    </div>
  );
}
