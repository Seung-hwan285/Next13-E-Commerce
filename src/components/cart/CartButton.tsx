'use client';
import React, { useEffect } from 'react';
import styles from '@/components/product/product.module.css';
import { useRouter } from 'next/navigation';
import { ProductAPI } from '@/lib/product';

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
        담기
      </button>
    </>
  );
}
export default CartButton;
