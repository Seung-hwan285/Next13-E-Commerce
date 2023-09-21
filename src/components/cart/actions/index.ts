'use server';
import { CartAPI } from '@/lib/cart';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addCartItem = async (formData: any): Promise<string> => {
  const id = formData.get('product_id');

  if (!id) {
    return 'error';
  }

  try {
    await CartAPI.addCartItem(id);
  } catch (err) {
    return 'error';
  }
};

export const deleteCartItem = async (cartId: string, lineId: string) => {
  if (!cartId || !lineId) {
    return 'error';
  }

  try {
    await CartAPI.deleteCartItem(cartId, lineId);
    redirect('/cart');
  } catch (err) {
    return 'error';
  }
};

// cartId , lineId , quantity

export const putLikeButton = async (data) => {
  const { cartId, lineId, quantity } = data;

  if (!cartId || !lineId) {
    return 'error';
  }

  try {
    await CartAPI.updateCartItem(cartId, lineId, quantity);
  } catch (err) {
    return 'error';
  }
};
