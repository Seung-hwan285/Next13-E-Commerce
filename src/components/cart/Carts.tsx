'use client';
import React, { useEffect } from 'react';
import styles from '@/components/cart/cart.module.css';
import CartDeleteButton from '@/components/cart/CartDeleteButton';
import CartcCountButton from '@/components/cart/CartcCountButton';
import Link from 'next/link';
import { getSessionStroage } from '@/lib/utils/session';
import { useAtom } from 'jotai';
import { sessionState } from '@/lib/jotail/themState';
import { Cart, Item } from '@/lib/types/cart';
import CartOptions from '@/components/cart/CartOptions';

function LineItemComponent({ item, cartId }: Item) {
  const [, setProductOptions] = useAtom(sessionState);

  useEffect(() => {
    const options = getSessionStroage('product');
    setProductOptions(options);
  }, []);

  return (
    <div className={styles.cartWrapper}>
      {item.map(({ id, name, image, quantity, product_id, line_total }) => {
        return (
          <div key={product_id} className={styles.cartContainer}>
            <CartDeleteButton cartId={cartId} lineId={id} />
            {/* Image */}
            <Link href={`/product/${product_id}`}>
              <div key={id} className={styles.cartListWrapper}>
                <div className={styles.cartImageWrapper}>
                  <img
                    className={styles.cartImage}
                    src={image?.url}
                    alt="image"
                  />

                  <div className={styles.optionContainer}>
                    <h1>{name}</h1>
                    <CartOptions id={product_id} />
                  </div>
                </div>
              </div>
            </Link>
            <CartcCountButton
              cartId={cartId}
              lineId={id}
              count={quantity}
              product_id={product_id}
              formatted={line_total.formatted}
            />
          </div>
        );
      })}
    </div>
  );
}

function Carts({ carts }: Cart) {
  return (
    <>
      <div className={styles.cartBox}>
        <h1>My Cart ({carts.total_items})</h1>
        {/*<IconButton aria-label="cart">*/}
        {/*  <StyledBadge badgeContent={4} color="secondary">*/}
        {/*    <ShoppingCartIcon />*/}
        {/*  </StyledBadge>*/}
        {/*</IconButton>*/}
        {carts && (
          <LineItemComponent
            key={carts.id}
            item={carts.line_items}
            cartId={carts.id}
          />
        )}
      </div>
    </>
  );
}

export default Carts;
