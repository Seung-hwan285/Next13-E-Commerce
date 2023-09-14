'use server';

import { ProductAPI } from '@/lib/product';
import { Products } from '@/lib/types/product';

export const getProduct = async (
  formData: string | unknown
): Promise<Products[] | string> => {
  if (!formData) {
    return 'error';
  }

  try {
    const value = formData.get('product') || '';
    const { data } = await ProductAPI.getAllProducts(value);

    return data;
  } catch (err) {
    return 'Error';
  }
};
