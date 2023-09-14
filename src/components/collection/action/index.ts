'use server';

import { ProductAPI } from '@/lib/product';

export const getCollection = async () => {
  try {
    const res = await ProductAPI.getCategories();
    console.log(res);
    return res;
    // revalidateTag('cart');
  } catch (err) {
    return 'error';
  }
};
