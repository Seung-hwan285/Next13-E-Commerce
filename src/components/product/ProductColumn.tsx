'use client';
import React from 'react';
import styles from '@/components/product/product.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils/queryString';

function ProductColumn() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const optionSearchParams = new URLSearchParams(searchParams.toString());

  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    optionSearchParams.set('limit', value);

    const optionUrl = createUrl(pathname, optionSearchParams);

    console.log(optionUrl);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className={styles.columnOptions}>
      <select onChange={handleClick}>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
export default ProductColumn;
