'use client';
import React, { useState } from 'react';
import styles from './product.module.css';
import { Gallery, Image } from '@/lib/types/cart';

function Gallery({ title, name, price, images }: Gallery) {
  if (!images) {
    return null;
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
          <img
            className={styles.Image}
            src={change ? (images[currentImage].images as string) : title}
            width={200}
            height={300}
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
                <div key={idx}>
                  <li key={idx} className={styles.relatedLi}>
                    <img
                      onClick={() => handleClick(idx)}
                      className={styles.relatedcartImage}
                      src={image.images as string}
                    />
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {image.name as string}
                    </span>
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
export default Gallery;
