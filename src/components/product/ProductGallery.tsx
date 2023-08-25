'use client';
import React, { useState } from 'react';
import styles from './product.module.css';
import { Gallery, Image } from '@/lib/types/cart';

function ProductGallery({ title, name, price, images }: Gallery) {
  if (!images) {
    return null;
  }

  const [currentImage, setCurrentImage] = useState(0);

  const [change, setChange] = useState(false);

  const handleClick = async (idx: number) => {
    setCurrentImage(idx);
    setChange(true);
    // window.history.pushState({}, '', `?images=${images[currentImage].index}`);
  };

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <img
            className={styles.Image}
            // src={images[0].images}
            src={change ? (images[currentImage].images as string) : title}
            alt="Product"
          />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{name}</h1>
            <p className={styles.productPrice}>{price}</p>
          </div>
          <ul className={styles.relatedContainer}>
            {images.map((image: Image, idx: number) => {
              return (
                <div key={image.id}>
                  <li key={image.id} className={styles.relatedLi}>
                    <img
                      onClick={() => handleClick(idx)}
                      className={styles.relatedcartImage}
                      src={image.images as string}
                    />
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
export default ProductGallery;
