import React from 'react';
import { notFound } from 'next/navigation';

type Related = {
  id: string;
  url: string;
  description?: string;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extensions: string;
  image_dimensions: {
    width: number;
    height: number;
  };
  meta?: Array<string>;
  created_at: number;
  updated_at: number;
};

function ProductCategories({ relatedItem }: Related[]) {
  console.log(relatedItem.related_products);

  if (!relatedItem) {
    return notFound();
  }

  return (
    <>
      <h1>RELATED PRODUCTS</h1>

      {relatedItem.related_products.map(
        ({
          image: {
            url,
            image_dimensions: { width, height },
          },
        }) => {
          return (
            <>
              <img src={url} />
              {/*<Image src={url} alt={'realted_image'} />*/}
            </>
          );
        }
      )}

      {/*{relatedItem &&*/}
      {/*  relatedItem?.related_products?.image?.map((data) => {*/}
      {/*    console.log(data);*/}
      {/*    return (*/}
      {/*      <>*/}
      {/*        /!*<Image src={url} alt={'related_image'} />*!/*/}
      {/*      </>*/}
      {/*    );*/}
      {/*  })}*/}
    </>
  );
}
export default ProductRelated;
