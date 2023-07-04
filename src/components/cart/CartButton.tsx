'use client';
import React from 'react';
import styles from '@/components/product/product.module.css';
import { ProductAPI } from '@/lib/requestApi/product';

type CartProps = {
  id: string;
};

function CartButton({ id }: CartProps) {
  const handleButtonClick = async (id: string) => {
    await ProductAPI.addCartItem(id);
  };

  return (
    <>
      <button
        className={styles.cartButton}
        onClick={() => handleButtonClick(id)}
      >
        장바구니
      </button>
    </>
  );
}
export default CartButton;
