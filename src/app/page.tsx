import React from 'react';

import { Cookie } from '@/components/cart/Cookie';
import Product from '@/components/product/Product';

export default function Home() {
  return (
    <>
      <h1>Home 입니다.</h1>
      <Product />
      <Cookie />
    </>
  );
}
