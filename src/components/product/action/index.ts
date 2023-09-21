import { ProductAPI } from '@/lib/product';

export const fetchProduct = async (pageNumber: number): Promise<any> => {
  try {
    const { data: products } = await ProductAPI.getAllProducts(pageNumber);

    return products;
  } catch (err) {
    return 'error';
  }
};
