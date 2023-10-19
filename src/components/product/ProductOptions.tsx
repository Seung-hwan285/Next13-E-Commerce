"use client";

import React from "react";
import ProductColumn from "@/components/product/ProductColumn";
import ProductSort from "@/components/product/ProductSort";

export type ProductOptions = {
  options: {
    name: string;
    updated: string;
    price: string;
  };
};

function ProductOptions({ options }: ProductOptions) {
  return (
    <>
      <ProductSort options={options} />
      <ProductColumn />
    </>
  );
}
export default ProductOptions;
