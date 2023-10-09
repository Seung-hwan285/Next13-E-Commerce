'use client';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/commons/LodingSpinner';
import crossSVG from '/public/icons/cross.svg';
import Image from 'next/image';
import styles from './cart.module.css';

type DeleteProps = {
  cartId: string;
  lineId: string;
};

export default function CartDeleteButton({ cartId, lineId }: DeleteProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = async () => {
    startTransition(async () => {
      const response = await fetch(
        `/api/carts?cartId=${cartId}&lineId=${lineId}`,
        {
          method: 'DELETE',
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
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <button className={styles.cartDeleteButton} onClick={handleDeleteClick}>
          <Image
            className={styles.cartDeleteIcon}
            src={crossSVG}
            alt={'image'}
            width={15}
            height={15}
          />
        </button>
      )}
    </>
  );
}
