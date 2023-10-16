import { ProductAPI } from "@/lib/product";
import React from "react";
import ProductItems from "@/components/product/ProductItems";
import ProductPagination from "@/components/product/ProductPagination";
import ProductOptions from "@/components/product/ProductOptions";
import { get18n } from "@/lib/utils/i18n";

export default async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page, lang } = params;

  const p = page === "globals.css" ? 1 : page;

  const { limit, sortBy } = searchParams;

  const obj = {
    o_page: p,
    o_limit: limit,
    o_sortBy: sortBy,
  };

  const { result, total, per_page } = await ProductAPI.getNextPage(obj);
  const data = await get18n(lang);

  const options = data
    .map((d) => ({
      options: d.options,
    }))
    .slice(0, 1);

  return (
    <>
      <ProductItems lang={params.lang} items={result?.data} />
      <ProductPagination lang={lang} pages={Math.ceil(total / per_page)} />
      <ProductOptions options={options} />
    </>
  );
}
