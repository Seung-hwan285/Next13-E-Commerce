'use client';
import React, { startTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/commons/LodingSpinner';

type DeleteProps = {
  cartId: string;
  lineId: string;
};

export default function CartDeleteButton({ cartId, lineId }: DeleteProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setIsLoading(true);

    const response = await fetch(
      `/api/carts?cartId=${cartId}&lineId=${lineId}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }
    setIsLoading(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button onClick={handleDeleteClick}>전체삭제</button>
      )}
    </>
  );
}
