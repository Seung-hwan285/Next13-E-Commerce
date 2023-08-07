import React from 'react';
import { ProductAPI } from '@/lib/product';
import Gallery from '@/components/product/Gallery';
import { RelatedImage } from '@/lib/types/cart';

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const getDetailItem = await ProductAPI.getDetailProductItem(id);

  return <CartDetail item={getDetailItem} />;
}

export default Page;

// Server
async function CartDetail({ item }: any) {
  console.log(item);

  const relatedImages = item?.related_products.map(
    (rel: RelatedImage, index: number) => ({
      images: rel.image.url,
      name: rel.name,
      index: index + 1,
    })
  );

  console.log(relatedImages);

  return (
    <>
      <Gallery
        name={item.name}
        price={item.price.formatted_with_symbol}
        title={item.image.url}
        images={relatedImages}
      />
    </>
  );
}
