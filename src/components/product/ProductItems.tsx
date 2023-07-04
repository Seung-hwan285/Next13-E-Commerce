import React from 'react';
import { ProductAPI } from '@/lib/requestApi/product';
import styles from './product.module.css';
import { ProductsType } from '@/lib/types/product';
import CartButton from '@/components/cart/CartButton';

async function getProduct() {
  const { data: products } = await ProductAPI.getAllProducts();

  return products;
}

// 서버컴포넌트에서는 이벤트를 걸 수가 없다.
// 서버에서 시작되기 때문에 사용자 이벤트를 거는 순간 트리거 에러가나옴
// 클라이언트 컴포넌트를 새로 만들고 붙이는식

export default async function ProductItems() {
  const products = await getProduct();
  return (
    <>
      <ul className={styles.productContainer}>
        {products &&
          products.map(
            ({
              id,
              name,
              image,
              categories,
              description,
              price,
            }: ProductsType) => {
              return (
                <>
                  <li key={id}>
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
                      <CartButton id={id} />
                    </div>
                  </li>
                </>
              );
            }
          )}
      </ul>
    </>
  );
}
