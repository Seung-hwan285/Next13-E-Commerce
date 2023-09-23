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

  const { limit } = searchParams;

  console.log(searchParams);

  console.log(page);

  const { result, total, per_page } = await ProductAPI.getNextPage(
    page as number,
    limit as number
  );

  return (
    <>
      <ProductItems items={result.data} />
      <ProductPagination pages={Math.ceil(total / per_page)} />
      <ProductOptions />
    </>
  );
}
//
// async function Page(
//   { params }: { params: { page: string } },
//   searchParams: { searchParams: string | string[] | undefined }
// ) {
//   const { page } = params;
//
//   console.log(searchParams);
//
//   console.log(page);
//
//   const { result, total, per_page } = await ProductAPI.getNextPage(
//     page as number
//   );
//
//   return (
//     <>
//       <ProductItems items={result.data} />
//       <ProductPagination pages={Math.ceil(total / per_page)} />
//       <ProductOptions />
//     </>
//   );
// }
// export default Page;
