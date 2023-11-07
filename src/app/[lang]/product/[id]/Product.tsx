import React, { Suspense } from "react";
import ProductItems from "@/components/product/ProductItems";
import ProductPagination from "@/components/product/ProductPagination";
import ProductOptions from "@/components/product/ProductOptions";
import Footer from "@/components/layout/Footer";

export const runtime = "edge";

async function ProductPage({
  options,
  total,
  per_page,
  params,
  result,
  lang,
}: any) {
  return (
    <>
      <section>
        <ProductItems lang={lang} items={result?.data} />
      </section>

      <section>
        <ProductPagination lang={lang} pages={Math.ceil(total / per_page)} />
        <ProductOptions options={options} />
      </section>

      <footer>
        <Footer lang={lang} />
      </footer>
    </>
  );
}

export default ProductPage;
