import React from "react";
import styles from "@/components/product/product.module.css";
import { Product } from "@/lib/types/product";
import { Related } from "@/lib/types/cart";

function ProductRelated({ productItems }: Product) {
  return (
    <div className={styles.relatedBox}>
      <h1 className={styles.relatedTitle}>Related Products</h1>
      {productItems ? (
        <ul className={styles.relatedProduct}>
          {productItems.map(
            ({
              image,
              id,
              name,
              price: { formatted_with_symbol },
            }: Related) => {
              return (
                <li key={id} className={styles.relatedProductLi}>
                  <figure>
                    <img src={image?.url} alt />
                  </figure>
                  <div className={styles.relatedOptionWrapper}>
                    <h1>{name}</h1>
                    <h2>{formatted_with_symbol}</h2>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      ) : null}
    </div>
  );
}

export default ProductRelated;
