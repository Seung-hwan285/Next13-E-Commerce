import React from 'react';
import { ProductAPI } from '@/lib/product';
import { Props } from '@/lib/types/product';
import { Metadata } from 'next';
import ProductItems from '@/components/product/ProductItems';
import ProductPagination from '@/components/product/ProductPagination';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
}

async function Product() {
  const { result, total, per_page } = await ProductAPI.getAllProducts();

  return (
    <>
      <ProductItems items={result.data} />

      <ProductPagination pages={Math.ceil(total / per_page)} />
    </>
  );
}

export default Product;
