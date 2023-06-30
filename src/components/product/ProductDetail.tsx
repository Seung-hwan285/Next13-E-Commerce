'use client';
import { useState } from 'react';
import React, { useEffect } from 'react';

function ProductDetail() {
  const [data, setData] = useState('fdas');

  useEffect(() => {
    setData('hiehi');
  }, []);

  return (
    <>
      <h1>{data}</h1>
    </>
  );
}
export default ProductDetail;
