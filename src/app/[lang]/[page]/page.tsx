import { ProductAPI } from "@/lib/product";
import React, { Suspense } from "react";
import { get18n } from "@/lib/utils/i18n";
import Product from "@/app/[lang]/product/[id]/Product";
import ProductLogo from "@/components/product/ProductLogo";
import Skeleton from "@/components/commons/Skeleton";

export const runtime = "edge";

async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page, lang, name } = params;

  const p = page === "globals.css" ? 1 : page;

  const { limit, sortBy } = searchParams;

  const obj = {
    o_page: p,
    o_limit: limit,
    o_sortBy: sortBy,
  };

  const { result, total, per_page } = await ProductAPI.getNextPage(obj);
  const data = await get18n(lang, name);

  const options = data
    .map((d) => ({
      options: d.options,
    }))
    .slice(0, 1);

  return (
    <>
      <Suspense fallback={<Skeleton name={name} lang={lang} />}>
        <ProductLogo />

        <Product
          params={params}
          lang={lang}
          total={total}
          per_page={per_page}
          result={result}
          options={options}
        />
      </Suspense>
    </>
  );
}
export default Page;
