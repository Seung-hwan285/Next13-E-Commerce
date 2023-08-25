'use client';
import React, { useState } from 'react';
import styles from './product.module.css';
import { OptionsVariant, Variant } from '@/lib/types/product';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { createUrl } from '@/lib/utils/queryString';
import { variantIdState } from '@/lib/jotail/themState';
import { useAtom } from 'jotai';

function ProductOptions({ id, options }: OptionsVariant[]) {
  const CONFIG = ['X', 'XL', 'XXL', 'M', 'S'];
  const keys = ['Color', 'Size'];
  const [, setVariantIdAtom] = useAtom(variantIdState);

  const router: any = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const optionSearchParams = new URLSearchParams(searchParams.toString());

  const handleClick = (name: string) => {
    setVariantIdAtom(id);

    if (CONFIG.includes(name)) {
      optionSearchParams.set(keys[1], name);
    } else {
      optionSearchParams.set(keys[0], name);
    }
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <>
      <p>{options.name}</p>
      <div className={styles.productOption}>
        {options.map(({ id, name }) => {
          return (
            <div style={{ margin: '10px' }} key={id}>
              <button
                className={styles.flexContainer}
                onClick={() => handleClick(name)}
              >
                {name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ProductVariantSelector({ variantItems }: Variant) {
  if (!variantItems.data) {
    return <></>;
  }

  const sizeData = variantItems.data.filter((d) => d.name === 'Size');
  const colorData = variantItems.data.filter((d) => d.name === 'Color');

  return (
    <>
      {variantItems.data && (
        <dl className={styles.productSelectorContainer}>
          <dt className={styles.productOptionTitle}>Size</dt>
          <dd className={styles.productOption}>
            {sizeData &&
              sizeData.map(
                ({ id, name, meta, created, updated, options }: Data) => {
                  return (
                    <div key={id}>
                      <ProductOptions id={id} options={options} />
                    </div>
                  );
                }
              )}
          </dd>

          <dt className={styles.productOptionTitle}>Color</dt>
          <dd className={styles.productOption}>
            {colorData &&
              colorData.map(
                ({ id, name, meta, created, updated, options }: Data) => {
                  return (
                    <div key={id}>
                      <ProductOptions id={id} options={options} />
                    </div>
                  );
                }
              )}
          </dd>
        </dl>
      )}
    </>
  );
}
export default ProductVariantSelector;
