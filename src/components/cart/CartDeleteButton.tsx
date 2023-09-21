'use client';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/commons/LodingSpinner';
import crossSVG from '/public/icons/cross.svg';
import Image from 'next/image';

import styles from './cart.module.css';
import { deleteCartItem } from '@/components/cart/actions';

type DeleteProps = {
  cartId: string;
  lineId: string;
};

export default function CartDeleteButton({ cartId, lineId }: DeleteProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = async () => {
    startTransition(() => {
      deleteCartItem(cartId, lineId);
      router.refresh();
    });
  };

  return (
    <>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <button className={styles.cartDeleteButton} onClick={handleDeleteClick}>
          <Image src={crossSVG} alt={'image'} width={15} height={15} />
        </button>
      )}
    </>
  );
}
