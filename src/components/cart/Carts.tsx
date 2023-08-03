'use client';
import React, { useEffect } from 'react';
import styles from '@/components/cart/cart.module.css';
import CartDeleteButton from '@/components/cart/CartDeleteButton';
import CartcCountButton from '@/components/cart/CartcCountButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Carts = {
  carts: {
    created: number;
    currency: {
      code: string;
      symbol: string;
    };
    discount?: string[];
    expires: number;
    hosted_checkout_url: string;
    id: string;
    line_items: any;
    meta?: string;
    subtotal: any;
    total_items: number;
    total_unique_items: number;
    update: number;
  };
};

function Carts({ carts }: Carts) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      {carts && (
        <div className={styles.cartContainer}>
          {<LineItemComponent item={carts.line_items} cartId={carts.id} />}
        </div>
      )}
    </>
  );
}

export default Carts;

type Items = {
  id: string;
  image: any;
  is_valid: boolean;
  line_total: any;
  name: string;
  permalink: string;
  price: any;
  product_id: string;
  product_meta?: string[];
  product_name: string;
  quantity: number;
  selected_options: string[];
  sky?: string;
  tax?: string;
  variant?: string;
};

type ItemType = {
  item: Items[];
  cartId: string;
};

function LineItemComponent({ item, cartId }: ItemType) {
  return (
    <div>
      {item.map(({ id, name, image, quantity, product_id, price }) => {
        return (
          <>
            <Link href={`/product/${product_id}`}>
              <div key={id} className={styles.cartListWrapper}>
                <div>
                  <p>{name}</p>
                  <img
                    className={styles.cartImage}
                    src={image.url}
                    alt="image"
                  />
                  <p>{price.raw}</p>
                </div>
              </div>
            </Link>

            <div className={styles.cartWrapper}>
              <div className={styles.cartButtonWrapper}>
                <CartDeleteButton cartId={cartId} lineId={id} />
                <CartcCountButton
                  cartId={cartId}
                  lineId={id}
                  count={quantity}
                />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
