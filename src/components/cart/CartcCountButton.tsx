'use client';
import styles from './cart.module.css';
import React from 'react';
import { experimental_useOptimistic as useOptimistic } from 'react';
import upSVG from '/public/icons/free-icon-font-arrow-alt-square-down-7434694.svg';
import downSVG from '/public/icons/free-icon-font-arrow-alt-square-up-7434723.svg';
import Image from 'next/image';

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

  const handlePlusClick = async (amount: number) => {
    addOptimisticCount(optimistickCount.count + amount);

    const data = {
      quantity: optimistickCount.count + amount,
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

  const handleMinusClick = async (amount: number) => {
    addOptimisticCount(optimistickCount.count - amount);

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
          <Image
            onClick={() => handleMinusClick(1)}
            alt={'image'}
            width={25}
            height={30}
            src={upSVG}
            style={{ margin: '5px', cursor: 'pointer' }}
          />
          <Image
            onClick={() => handlePlusClick(1)}
            alt={'image'}
            width={25}
            height={30}
            src={downSVG}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className={styles.horizontalCount}>
          <p className={styles.countLabel}>Count:</p>
          <p className={styles.countNumber}>{optimistickCount.count}</p>
        </div>
      </div>
    </>
  );
}
export default CartcCountButton;
