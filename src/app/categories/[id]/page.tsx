import React from 'react';
import { ProductAPI } from '@/lib/product';
import styles from './categories.module.css';

async function Categories({ params }: { params: { id: string } }) {
  const { data } = await ProductAPI.getCategories(params.id);

  return (
    <>
      <ul className={styles.container}>
        {data &&
          data.map(({ id, assets, name, description }) => {
            return (
              <li key={id}>
                <div className={styles.wrapper}>
                  <p>{name}</p>
                  <p>{description}</p>

                  {assets.map(({ url, id, description }) => {
                    return (
                      <div key={id}>
                        <img
                          className={styles.urlImage}
                          src={url}
                          alt="image"
                        />
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
export default Categories;
