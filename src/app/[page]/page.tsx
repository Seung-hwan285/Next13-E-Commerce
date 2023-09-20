import { ProductAPI } from '@/lib/product';
import React from 'react';
import ProductItems from '@/components/product/ProductItems';
import ProductPagination from '@/components/product/ProductPagination';

async function Page({ params }: { params: { id: string } }) {
  const { page } = params;

  const { result, total, per_page } = await ProductAPI.getNextPage(
    page as number
  );

  return (
    <>
      <ProductItems items={result.data} />;
      <ProductPagination pages={Math.ceil(total / per_page)} />
    </>
  );
}
export default Page;
