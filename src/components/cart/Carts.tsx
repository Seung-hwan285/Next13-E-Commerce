import React from 'react';
import styles from '@/components/cart/cart.module.css';
import CartDeleteButton from '@/components/cart/CartDeleteButton';
import CartcCountButton from '@/components/cart/CartcCountButton';

function Carts({ carts }: any) {
  return (
    <>
      {carts && (
        <div className={styles.cartContainer}>
          {/*<h1 className={styles.cartTitle}>{carts.total_items}</h1>*/}
          {/*<p className={styles.cartSubtotal}>*/}
          {/*  {carts.subtotal.formatted_with_symbol}*/}
          {/*</p>*/}

          {<LineItemComponent item={carts.line_items} cartId={carts.id} />}
        </div>
      )}
    </>
  );
}

export default Carts;

function LineItemComponent({ item, cartId }: any) {
  console.log(item);
  return (
    <div>
      {item.map(({ id, name, image, quantity }) => {
        return (
          <div key={id} className={styles.cartListWrapper}>
            <p>Name : {name}</p>
            <img className={styles.cartImage} src={image.url} alt="image" />

            <CartDeleteButton cartId={cartId} lineId={id} />
            <CartcCountButton cartId={cartId} lineId={id} count={quantity} />
          </div>
        );
      })}
    </div>
  );
}
