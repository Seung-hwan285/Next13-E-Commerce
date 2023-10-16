import { ProductAPI } from "@/lib/product";
import styles from "@/components/product/product.module.css";
import { Product } from "@/lib/types/product";
import Link from "next/link";
import React from "react";
import { get18n } from "@/lib/utils/i18n";

async function Page({ params }: { params: { id: string } }) {
  const { name, lang, id } = params;

  console.log(name);
  console.log(lang);
  const products = await get18n(lang, id, name);

  console.log(products);
  // const { data: products } = await ProductAPI.getSearchProducts(name);

  return <Products products={products} />;
}

export default Page;

async function Products({ products }: Product[]) {
  return (
    <ul className={styles.productContainer}>
      {products &&
        products.map(({ id, name, image, price }: Product) => {
          return (
            <>
              <Link href={`/product/${id}`} key={id}>
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
                </div>
              </Link>
            </>
          );
        })}
    </ul>
  );
}
