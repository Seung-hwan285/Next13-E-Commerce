'use client';
import React, { useState } from 'react';
import styles from './product.module.css';
import { Gallery, Image } from '@/lib/types/cart';

// git action test
function ProductGallery({ title, name, price, images }: Gallery) {
  if (!images) {
    return <></>;
  }

  const [currentImage, setCurrentImage] = useState(0);

  const [change, setChange] = useState(false);

  const handleClick = (idx: number) => {
    setCurrentImage(idx);
    setChange(true);
  };

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <div className={styles.imageBox}>
            {images ? (
              <ul className={styles.relatedContainer}>
                {images.map((image: Image, idx: number) => {
                  return (
                    <li key={image.id} className={styles.relatedLi}>
                      <img
                        onClick={() => handleClick(idx)}
                        className={styles.relatedcartImage}
                        src={image.images as string}
                        alt="image"
                      />
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <img
              className={styles.Image}
              src={change ? (images[currentImage].images as string) : title}
              alt="Product"
            />
          </div>
        </div>

        <div className={styles.productDetails}>
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{name}</h1>
            <p className={styles.productPrice}>{price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductGallery;
