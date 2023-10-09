import React from 'react';
import { ProductAPI } from '@/lib/product';
import ProductItems from '@/components/product/ProductItems';
import ProductPagination from '@/components/product/ProductPagination';
import ProductOptions from '@/components/product/ProductOptions';
import { Locale } from '@/i18n.config';

async function Product({ page: { lang } }: { lang: Locale }) {
  const { result, total, per_page } = await ProductAPI.getAllProducts(5);

  return (
    <>
      <ProductItems items={result.data} />
      <ProductPagination pages={Math.ceil(total / per_page)} />
      <ProductOptions />
    </>
  );
}

export default Product;
