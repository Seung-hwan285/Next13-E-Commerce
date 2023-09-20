import React from 'react';
import { ProductAPI } from '@/lib/product';
import styles from './categories.module.css';
import Link from 'next/link';

async function Categories() {
  const categories = await ProductAPI.getCategories();

  return (
    <>
      <ul className={styles.container}>
        <div className={styles.wrapper}>
          {categories &&
            // id : parent_id
            categories.data.map(({ id, name, slug }) => {
              return (
                <li className={styles.categoriesItem} key={id}>
                  <Link
                    style={{ fontSize: '1.5rem' }}
                    href={`/categories/${id}`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
        </div>
      </ul>
    </>
  );
}
export default Categories;
