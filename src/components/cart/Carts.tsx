'use client';
import React, { useEffect } from 'react';
import styles from '@/components/cart/cart.module.css';
import CartDeleteButton from '@/components/cart/CartDeleteButton';
import CartcCountButton from '@/components/cart/CartcCountButton';
import Link from 'next/link';
import CartOptions from '@/components/cart/CartOptions';
import { getSessionStroage } from '@/lib/utils/session';
import { useAtom } from 'jotai';
import { sessionState } from '@/lib/jotail/themState';

// jotai
//   const [updateAtom, setUpdateAtom] = updateAtom(itemIdState);
// const [itemId] = useAtom(updateAtom);
//   const [,update] = useAtom(setUpdateAtom);

function LineItemComponent({ item, cartId }: ItemType) {
  const [productOptions, setProductOptions] = useAtom(sessionState);

  // session

  useEffect(() => {
    const options = getSessionStroage('product');
    setProductOptions(options);
  }, []);

  return (
    <div>
      {item.map(
        ({ id, name, image, quantity, product_id, line_total }, index) => {
          return (
            <div key={product_id}>
              <Link href={`/product/${product_id}`}>
                <div key={id} className={styles.cartListWrapper}>
                  <div>
                    <p>{name}</p>
                    <img
                      className={styles.cartImage}
                      src={image?.url}
                      alt="image"
                    />
                  </div>

                  <CartOptions id={product_id} />
                  {/*  [ 0 : {color : PINK , size : 'S'} , 1: {color : 'GREEN'}]*/}
                </div>
              </Link>

              <div className={styles.cartWrapper}>
                <CartDeleteButton cartId={cartId} lineId={id} />

                <div className={styles.cartButtonWrapper}>
                  <CartcCountButton
                    cartId={cartId}
                    lineId={id}
                    count={quantity}
                    formatted={line_total.formatted}
                  />
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

function Carts({ carts }: Carts) {
  // const router = useRouter();
  //
  // //
  // // useEffect(() => {
  // //   router.refresh();
  // // }, [router]);
  return (
    <>
      {carts && (
        <div className={styles.cartContainer}>
          {
            <LineItemComponent
              key={carts.id}
              item={carts.line_items}
              cartId={carts.id}
            />
          }
        </div>
      )}
    </>
  );
}

export default Carts;
