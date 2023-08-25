'use server';

import { cookies } from 'next/headers';
import { CartAPI } from '@/lib/cart';

export async function setCookieComponent() {
  const cookie = await CartAPI.createCart();

  const cookieStore = cookies().get('cartId')?.value;
  if (!cookieStore) {
    cookies().set('cartId', cookie.id);
  }
}
