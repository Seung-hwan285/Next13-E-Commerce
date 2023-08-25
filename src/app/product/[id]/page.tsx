import React from 'react';
import { ProductAPI } from '@/lib/product';
import { RelatedImage } from '@/lib/types/cart';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductVariantSelector from '@/components/product/ProductVariantSelector';
import CartButton from '@/components/cart/CartButton';

// const ComponentA = dynamic(()=> import('@/components/product/ProductVariantSelector'),{ssr: false});

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const asyncRelatedItem = ProductAPI.getDetailProductItem(id);
  const asyncVariantsItems = ProductAPI.getVariantItems(id);

  const [relatedItem, variantItems] = await Promise.all([
    asyncRelatedItem,
    asyncVariantsItems,
  ]);

  return <CartDetail relatedItem={relatedItem} variantItems={variantItems} />;
}

export default Page;

// Server => browser api , hooks 사용 불가
async function CartDetail({ relatedItem, variantItems }: any) {
  if (!relatedItem) return notFound();
  if (!variantItems) return notFound();

  const relatedImages = relatedItem?.related_products.map(
    (rel: RelatedImage, index: number) => ({
      id: rel.id,
      images: rel.image.url,
      name: rel.name,
      sku: rel.sku,
    })
  );

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ProductGallery
          name={relatedItem.name}
          price={relatedItem.price.formatted_with_symbol}
          title={relatedItem.image.url}
          images={relatedImages}
        />

        <ProductVariantSelector variantItems={variantItems} />

        <CartButton />
      </div>
    </>
  );
}
