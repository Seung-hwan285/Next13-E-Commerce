'use client';

import React, { useEffect } from 'react';
import ProductColumn from '@/components/product/ProductColumn';
import ProductSort from '@/components/product/ProductSort';

function ProductOptions() {
  return (
    <>
      <ProductSort />
      <ProductColumn />;
    </>
  );
}
export default ProductOptions;
