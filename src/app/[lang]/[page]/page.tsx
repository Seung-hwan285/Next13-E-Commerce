import { ProductAPI } from "@/lib/product";
import React, { Suspense } from "react";

import ProductItems from "@/components/product/ProductItems";
import ProductPagination from "@/components/product/ProductPagination";
import ProductOptions from "@/components/product/ProductOptions";
import { get18n } from "@/lib/utils/i18n";
import Footer from "@/components/layout/Footer";
import Skeleton from "@/components/commons/Skeleton";

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
    <Suspense
      fallback={
        <Skeleton
          pages={Math.ceil(total / per_page)}
          name={params.name}
          lang={params.lang}
        />
      }
    >
      <ProductItems lang={lang} items={result?.data} />
      <ProductPagination lang={lang} pages={Math.ceil(total / per_page)} />
      <ProductOptions options={options} />
      <Footer lang={lang} />
    </Suspense>
  );
}
