'use client';

import React from 'react';
import styles from '@/components/product/product.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils/queryString';

function ProductSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const CONFIG = ['desc', 'asc'];

  const optionSearchParams = new URLSearchParams(searchParams.toString());

  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (CONFIG.includes(value)) {
      optionSearchParams.set('sortDirection', value);
    } else {
      optionSearchParams.set('sortBy', value);
    }

    const optionUrl = createUrl(pathname, optionSearchParams);

    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className={styles.columnOptions}>
      <select onChange={handleClick}>
        <option value="name">Name</option>
        <option value="updated_at">Updated</option>
        <option value="price">Price</option>
        <option value="desc">High to low</option>
        <option value="asc">Low to high</option>
      </select>
    </div>
  );
}
export default ProductSort;
