'use server';

import React from 'react';
import { CartAPI } from '@/lib/cart';

import { notFound } from 'next/navigation';
import Carts from '@/components/cart/Carts';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookie = cookies().get('cartId')?.value;

  const carts = await CartAPI.getCartItems(cookie);

  if (!carts) notFound();

  return <Carts carts={carts} />;
}
