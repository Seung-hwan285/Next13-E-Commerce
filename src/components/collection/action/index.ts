'use server';

import { ProductAPI } from '@/lib/product';

export const getCollection = async () => {
  try {
    const res = await ProductAPI.getCategories();
    return res;
    // revalidateTag('cart');
  } catch (err) {
    return 'error';
  }
};
