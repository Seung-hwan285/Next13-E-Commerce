'use client';
import React from 'react';
import styles from './product.module.css';

import { OptionsVariant, Variant, VariantItems } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils/queryString';
import { variantIdState } from '@/lib/jotail/themState';
import { useAtom } from 'jotai';
import CartButton from '@/components/cart/CartButton';

function ProductOptions({ id, options }: OptionsVariant[]) {
  const CONFIG = ['X', 'XL', 'XXL', 'M', 'S'];
  const keys = ['Color', 'Size'];
  const [variantAtom, setVariantIdAtom] = useAtom(variantIdState);

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
    console.log(optionUrl);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className={styles.productBox}>
      <p>{options.name}</p>
      <div className={styles.productOption}>
        {options.map(({ id, name }) => {
          return (
            <div className={styles.productOptionItem} key={id}>
              <button
                data-set={name}
                className={
                  CONFIG.includes(name)
                    ? styles.flexContainer
                    : styles.selectColor
                }
                onClick={() => handleClick(name)}
              >
                {CONFIG.includes(name) && `${name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductItems({ title, data }: VariantItems) {
  const dtElement = title === 'Size' ? 'Choose Size' : 'Select Color';

  return (
    <>
      <div>
        <dt className={styles.productOptionTitle}>{dtElement}</dt>

        <dd className={styles.productOption}>
          {data &&
            data.map(({ id, options }) => {
              return (
                <div key={id}>
                  <ProductOptions id={id} options={options} />
                </div>
              );
            })}
        </dd>
      </div>
    </>
  );
}

function ProductVariantSelector({ description, variantItems }: Variant) {
  if (!variantItems.data) {
    return <></>;
  }

  const sliceDescription = description
    ?.slice(3, description?.length - 4)
    .trim();

  const sizeData = variantItems.data.filter((d) => d.name === 'Size');
  const colorData = variantItems.data.filter((d) => d.name === 'Color');

  return (
    <>
      {variantItems?.data && (
        <dl className={styles.productSelectorContainer}>
          <ProductItems title={'Size'} data={sizeData} />
          <ProductItems title={'Color'} data={colorData} />

          <div>
            <h2 className={styles.productOptionTitle}>Product information</h2>

            <textarea
              cols={10}
              rows={5}
              readOnly={true}
              className={styles.productDescription}
            >
              {sliceDescription}
            </textarea>

            <CartButton />
          </div>
        </dl>
      )}
    </>
  );
}
export default ProductVariantSelector;
