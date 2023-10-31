"use server";

import React from "react";
import { ProductAPI } from "@/lib/product";
import { RelatedImage } from "@/lib/types/cart";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductVariantSelector from "@/components/product/ProductVariantSelector";
import { Metadata } from "next";
import { Props } from "@/lib/types/product";
import { DiscountAPI } from "@/lib/discount";
import ProductRelated from "@/components/product/ProductRelated";
import { get18n } from "@/lib/utils/i18n";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const data = await ProductAPI.getDetail(id);

  if (!data) notFound();

  return {
    title: data.name,
    description: data.description || "",
  };
}

async function Page({
  params,
}: {
  params: { id: string; page: { locale: string } };
}) {
  const { id, lang } = params;

  const { filter18nObj, relatedItems, arr2 } = await get18n(lang, id);

  const asyncDiscountItems = DiscountAPI.getDisCount();
  const asyncVariantsItems = ProductAPI.getVariantItems(id);

  const [discountItems, variantItems] = await Promise.all([
    asyncDiscountItems,
    asyncVariantsItems,
  ]);

  return (
    <ProductDetail
      filter18nObj={filter18nObj}
      relatedItems={relatedItems}
      variantItems={variantItems}
      discountItems={discountItems}
      productItems={arr2}
    />
  );
}

export default Page;

function ProductDetail({
  filter18nObj,
  relatedItems,
  variantItems,
  discountItems,
  productItems,
}: any) {
  if (!relatedItems) notFound();
  if (!variantItems) notFound();

  const relatedImages = relatedItems?.related_products?.map(
    (rel: RelatedImage) => ({
      id: rel.id,
      images: rel.image.url,
      name: rel.name,
      sku: rel.sku,
    })
  );

  const discounts = discountItems.data.map((d) => ({
    value: d.value,
    product_ids: d.product_ids,
  }));

  const prices = {
    raw: relatedItems.price.raw,
    formatted_with_symbol: relatedItems.price.formatted_with_symbol,
  };

  const f18nSizeAndColor = {
    Size: filter18nObj.size,
    Color: filter18nObj.color,
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {/*Client */}
        <ProductGallery
          name={filter18nObj.name}
          price={prices}
          title={relatedItems.image.url}
          id={filter18nObj.id}
          description={filter18nObj.description}
          images={relatedImages}
          discountItems={discounts}
        />

        {/*Client */}
        <ProductVariantSelector
          description={filter18nObj.description}
          f18nSizeAndColor={f18nSizeAndColor}
          variantItems={variantItems}
          cartButton={filter18nObj.button}
        />
        {/*Client */}
        <ProductRelated productItems={productItems} />
      </div>
    </>
  );
}
