'use client';
import React, { startTransition, useEffect } from 'react';
import styles from '@/components/product/product.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { CartAPI } from '@/lib/cart';
import { useAtom } from 'jotai';
import { sessionState } from '@/lib/jotail/themState';
import { setSessionStroage } from '@/lib/utils/session';

function CartButton() {
  const router = useRouter();

  const [optionAtom, setOptionAtom] = useAtom<any>(sessionState);

  const pathname = usePathname();

  const handleClick = async () => {
    const { href } = window.location;

    const queryString = href.split('?')[1]?.split('&') || '';

    const color = queryString[0]?.split('=')[1] || '';

    const size =
      (queryString.length === 2 && queryString[1].split('=')[1]) || '';

    const id = pathname.split('/')[3];

    const data = {
      product_id: id,
      values: {
        color: color,
        size: size,
      },
    };

    const isProductId = optionAtom?.some((data) => {
      if (data.product_id === id) {
        return true;
      }
    });

    if (isProductId) {
      setOptionAtom((prev) => {
        const tempData = prev.map((p) =>
          p.product_id === id ? { ...p, values: data.values } : p
        );
        setSessionStroage('product', tempData);
        return tempData;
      });
    } else {
      setOptionAtom((prev) => {
        if (!prev) {
          return null;
        }
        const tempData = [...prev, data];
        setSessionStroage('product', tempData);
        return tempData;
      });
    }
    await CartAPI.addCartItem(id);

    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <button className={styles.cartButton} onClick={handleClick}>
        Add to cart
      </button>
    </>
  );
}
export default CartButton;
