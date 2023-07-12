'use client';
import styles from './cart.module.css';
import React, { startTransition, useState } from 'react';
import { experimental_useOptimistic as useOptimistic } from 'react';

type DeleteProps = {
  cartId: string;
  lineId: string;
  count: number;
};

function CartcCountButton({ cartId, lineId, count }: DeleteProps) {
  const [optimistickCount, addOptimisticCount] = useOptimistic(
    {
      count,
      sending: false,
    },
    (state: any, newCount: any) => ({
      ...state,
      count: newCount,
      sending: true,
    })
  );

  const handlePlusClick = async () => {
    addOptimisticCount(optimistickCount.count + 1);

    const data = {
      quantity: optimistickCount.count + 1,
      cartId: cartId,
      lineId: lineId,
    };

    const response = await fetch(
      `/api/carts?cartId=${cartId}&lineId=${lineId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.error) {
      alert(result.error);
      return;
    }
  };

  const handleMinusClick = async () => {
    addOptimisticCount(optimistickCount.count - 1);

    const data = {
      quantity: optimistickCount.count - 1,
      cartId: cartId,
      lineId: lineId,
    };

    const response = await fetch(
      `/api/carts?cartId=${cartId}&lineId=${lineId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.error) {
      alert(result.error);
      return;
    }
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          <span onClick={handleMinusClick} className={styles.downButton} />
          <span onClick={handlePlusClick} className={styles.upbButton} />
        </div>
        OptimistLikes : {optimistickCount.count}
      </div>
    </>
  );
}
export default CartcCountButton;
