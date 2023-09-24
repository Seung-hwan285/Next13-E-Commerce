import { ProductAPI } from '@/lib/product';
import React from 'react';
import ProductItems from '@/components/product/ProductItems';
import ProductPagination from '@/components/product/ProductPagination';
import ProductOptions from '@/components/product/ProductOptions';

export default async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = params;
  const { limit, sortBy } = searchParams;

  const obj = {
    o_page: page,
    o_limit: limit,
    o_sortBy: sortBy,
  };

  const { result, total, per_page } = await ProductAPI.getNextPage(obj);

  return (
    <>
      <ProductItems items={result.data} />
      <ProductPagination pages={Math.ceil(total / per_page)} />
      <ProductOptions />
    </>
  );
}
