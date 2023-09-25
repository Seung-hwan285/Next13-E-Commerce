import React from 'react';
import { ProductAPI } from '@/lib/product';
import { RelatedImage } from '@/lib/types/cart';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductVariantSelector from '@/components/product/ProductVariantSelector';
import { Metadata } from 'next';
import { Props } from '@/lib/types/product';
import { DiscountAPI } from '@/lib/discount';

export async function generateMetadata({
  params,
}: Props): // parent: ResolvedMetadata
Promise<Metadata> {
  const { id } = params;

  const data = await ProductAPI.getDetail(id);

  if (!data) return notFound();

  return {
    title: data.name,
    description: data.description || '',
    // ima
  };
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const asyncRelatedItem = ProductAPI.getDetail(id);
  const asyncVariantsItems = ProductAPI.getVariantItems(id);
  const asyncDiscountItems = DiscountAPI.getDisCount();

  const [relatedItem, variantItems, discountItems] = await Promise.all([
    asyncRelatedItem,
    asyncVariantsItems,
    asyncDiscountItems,
  ]);

  return (
    <ProductDetail
      relatedItem={relatedItem}
      variantItems={variantItems}
      discountItems={discountItems}
    />
  );
}

export default Page;

function ProductDetail({ relatedItem, variantItems, discountItems }: any) {
  if (!relatedItem) return notFound();
  if (!variantItems) return notFound();

  const relatedImages = relatedItem?.related_products?.map(
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
    raw: relatedItem.price.raw,
    formatted_with_symbol: relatedItem.price.formatted_with_symbol,
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/*Client */}
        <ProductGallery
          name={relatedItem.name}
          price={prices}
          title={relatedItem.image.url}
          id={relatedItem.id}
          description={relatedItem.description}
          images={relatedImages}
          discountItems={discounts}
        />

        {/*Client */}
        <ProductVariantSelector
          description={relatedItem.description}
          variantItems={variantItems}
        />

        {/*Client */}

        {/*Server */}
        {/*<ProductCategories categories={relatedItem.categories} />*/}
        {/*<Categories relatedItem={relatedItem} />*/}
      </div>
    </>
  );
}