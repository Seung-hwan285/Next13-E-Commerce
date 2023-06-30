// import Image from 'next/image';
import React from 'react';
import ProductItems from '@/components/product/ProductItems';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // fdsa
  return (
    <>
      <h1>Home 입니다.</h1>
      {/*    컴포넌트가 오는걸로 일단 page가 오면 안된다.*/}
      <ProductItems />
    </>
  );
}
