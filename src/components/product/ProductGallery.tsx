'use client';
import React, { useState } from 'react';
import styles from './product.module.css';
import { Gallery, Image } from '@/lib/types/cart';

function ProductGallery({ title, name, price, images, description }: Gallery) {
  if (!images) {
    return null;
  }

  const [currentImage, setCurrentImage] = useState(0);

  const [change, setChange] = useState(false);

  const handleClick = async (idx: number) => {
    setCurrentImage(idx);
    setChange(true);
  };

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <div className={styles.imageBox}>
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
