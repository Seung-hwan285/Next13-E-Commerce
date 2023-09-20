import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { fetchProduct } from '@/components/product/action';
import styles from '@/app/page.module.css';
import LoadingSpinner from '@/components/commons/LodingSpinner';
import ProductItems from '@/components/product/ProductItems';

function ProductLoad() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const load = async () => {
    await delay(500);
    const nextPage = (page % 3) + 1;

    const newProduct = (await fetchProduct(nextPage)) ?? [];

    setProducts((prev) => [...prev, ...newProduct]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      load();
    }
  }, [inView]);

  return (
    <>
      <ProductItems items={products} />
      <div className={styles.loadContainer} ref={ref}>
        {inView && <LoadingSpinner />}
      </div>
    </>
  );
}
export default ProductLoad;
