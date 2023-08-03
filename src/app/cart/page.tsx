import React from 'react';
import { ProductAPI } from '@/lib/product';
import Carts from '@/components/cart/Carts';

export default async function Page() {
  const carts = await ProductAPI.getCartItems();

  return <Carts carts={carts} />;
}
