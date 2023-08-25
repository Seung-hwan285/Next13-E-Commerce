import React from 'react';
import ProductItems from '@/components/product/ProductItems';
import { Cookie } from '@/components/cart/Cookie';

export default async function Home() {
  return (
    <>
      <h1>Home 입니다.</h1>
      <ProductItems />
      <Cookie />
    </>
  );
}
