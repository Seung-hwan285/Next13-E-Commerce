'use client';

import React, { useEffect } from 'react';
import ProductColumn from '@/components/product/ProductColumn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductSort from '@/components/product/ProductSort';

function ProductOptions() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const optionSearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (pathname === '/') {
      optionSearchParams.set('', '/1');
    }

    const parms = optionSearchParams.get('');

    if (typeof parms === 'string') {
      router.replace(parms, { scroll: false });
    }
  }, []);

  return (
    <>
      <ProductSort />
      <ProductColumn />;
    </>
  );
}
export default ProductOptions;
