import React from 'react';
import { ProductAPI } from '@/lib/product';
import styles from './categories.module.css';
import { Product, Props } from '@/lib/types/product';
import { Metadata, ResolvedMetadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params, searchParms }: Props,
  parent: ResolvedMetadata
): Promise<Metadata> {
  const { id } = params;

  const data = await ProductAPI.getCategories(id);

  console.log(data);
  if (!data) return notFound();

  return {
    title: data.name,
    description: data.description || '',
    // ima
  };
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: products } = await ProductAPI.getCategories(id);

  return <Categories products={products} />;
}

export default Page;

function Categories({ products }: Product) {
  return (
    <>
      <ul className={styles.container}>
        {products &&
          products.map(({ id, assets, name, description }) => {
            return (
              <div key={id}>
                <div className={styles.wrapper}>
                  <p>{name}</p>
                  <p>{description}</p>

                  {assets.map(({ url, id, description }) => {
                    return (
                      <li key={id}>
                        <img
                          className={styles.urlImage}
                          src={url}
                          alt="image"
                        />
                      </li>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </ul>
    </>
  );
}
