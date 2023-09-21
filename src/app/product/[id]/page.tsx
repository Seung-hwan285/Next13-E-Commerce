import React from 'react';
import { ProductAPI } from '@/lib/product';
import { RelatedImage } from '@/lib/types/cart';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductVariantSelector from '@/components/product/ProductVariantSelector';
import { Metadata } from 'next';
import { Props } from '@/lib/types/product';

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

  const [relatedItem, variantItems] = await Promise.all([
    asyncRelatedItem,
    asyncVariantsItems,
  ]);

  return <CartDetail relatedItem={relatedItem} variantItems={variantItems} />;
}

export default Page;

function CartDetail({ relatedItem, variantItems }: any) {
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/*Client */}
        <ProductGallery
          name={relatedItem.name}
          price={relatedItem.price.formatted_with_symbol}
          title={relatedItem.image.url}
          description={relatedItem.description}
          images={relatedImages}
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
