'use client';
import React, { useEffect } from 'react';
import styles from '@/components/product/product.module.css';
import { ProductAPI } from '@/lib/requestApi/product';
import { useRouter } from 'next/navigation';

type CartProps = {
  id: string;
};

function CartButton({ id }: CartProps) {
  const router = useRouter();

  const handleButtonClick = async (id: string) => {
    await ProductAPI.addCartItem(id);
    // 서버사이드 props 리프레시로 다시 불러와줘야함. 안그럼 데이터가 그대로 유지
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

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
