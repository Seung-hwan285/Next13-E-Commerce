'use client';
import styles from './cart.module.css';
import React, { useTransition } from 'react';
import { experimental_useOptimistic as useOptimistic } from 'react';
import upSVG from '/public/icons/free-icon-font-arrow-alt-square-down-7434694.svg';
import downSVG from '/public/icons/free-icon-font-arrow-alt-square-up-7434723.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { putLikeButton } from '@/components/cart/actions';

type DeleteProps = {
  cartId: string;
  lineId: string;
  count: number;
  formatted?: string | number;
};

type State = {
  count: number;
  sending: boolean;
};

function CartcCountButton({ cartId, lineId, count, formatted }: DeleteProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [optimistickCount, addOptimisticCount] = useOptimistic(
    {
      count,
      sending: false,
    },
    (state: State, newCount: number) => ({
      ...state,
      count: newCount,
      sending: true,
    })
  );

  const handlePlusClick = async (amount: number) => {
    addOptimisticCount(optimistickCount.count + amount);

    const objData = {
      quantity: optimistickCount.count + amount,
      cartId: cartId,
      lineId: lineId,
    };

    startTransition(async () => {
      const response = await fetch(
        `/api/carts?cartId=${objData.cartId}&lineId=${objData.lineId}&quantity=${objData.quantity}`,
        {
          method: 'PUT',
        }
      );

      const data = await response.json();
      if (data.error) {
        alert('error');
        return;
      }

      router.refresh();
    });
  };

  const handleMinusClick = async (amount: number) => {
    addOptimisticCount(optimistickCount.count - amount);

    const objData = {
      quantity: optimistickCount.count - amount,
      cartId: cartId,
      lineId: lineId,
    };

    startTransition(async () => {
      const response = await fetch(
        `/api/carts?cartId=${objData.cartId}&lineId=${objData.lineId}&quantity=${objData.quantity}`,
        {
          method: 'PUT',
        }
      );

      const data = await response.json();

      if (data.error) {
        alert('error');
        return;
      }

      router.refresh();
    });
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonTemp}>
          <div className={styles.countButtonWrapper}>
            {isPending ? (
              <div className={styles.spinner}></div>
            ) : (
              <div className={styles.buttonPrice}>
                <p>${formatted}</p>
              </div>
            )}

            <p className={styles.count}>{optimistickCount.count}</p>

            <div className={styles.temp}>
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
          </div>
        </div>
      </div>
    </>
  );
}
export default CartcCountButton;
