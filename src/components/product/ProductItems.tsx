import { notFound } from 'next/navigation';
import styles from '@/components/product/product.module.css';
import Link from 'next/link';
import React from 'react';
import { Product } from '@/lib/types/product';
import { get18n } from '@/lib/utils/i18n';

async function ProductItems({ lang, items }: Product[]) {
  if (!items) {
    notFound();
  }

  const data = await get18n(lang);

  const f18nData1 = items.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    price: {
      formatted_with_symbol: item.price.formatted_with_symbol,
    },
  }));

  const keys = data.map((d) => {
    return d.id;
  });

  const f18nData3 = f18nData1.map((s) =>
    keys
      .map((k) => {
        if (s.id === k) {
          const findIndex = data.findIndex((d) => d.id === k);
          return Object.assign({}, s, data[findIndex]);
        }
      })
      .find((f) => {
        if (f) {
          return f;
        }
      })
  );

  return (
    <>
      <ul className={styles.productContainer}>
        {f18nData3.length &&
          f18nData3.map(({ id, name, image, price }: Product) => {
            return (
              <div key={id}>
                <Link href={`/product/${id}`} key={id}>
                  <h1 className={styles.title}>{name}</h1>

                  <div className={styles.imageWrapper}>
                    {image && (
                      <img
                        className={styles.image}
                        src={image?.url}
                        alt="image"
                      />
                    )}
                  </div>
                  <div className={styles.detailWrapper}>
                    <p>{price.formatted_with_symbol}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </ul>
    </>
  );
}
export default ProductItems;
