'use client';
import React, { useEffect, useState } from 'react';
import styles from './product.module.css';
import { Gallery, Image } from '@/lib/types/cart';

function ProductGallery({
  id,
  title,
  name,
  price,
  images,
  discountItems,
}: Gallery) {
  if (!images) {
    return <></>;
  }

  const [currentImage, setCurrentImage] = useState(0);

  const [change, setChange] = useState(false);

  const handleClick = (idx: number) => {
    setCurrentImage(idx);
    setChange(true);
  };

  const [formatedPrice, setFormatedPrice] = useState('');

  const saleValue =
    discountItems[0]?.product_ids?.includes(id) && discountItems[0].value;

  const saleProduct = price.raw - saleValue;

  const temp = String(saleProduct).padStart(5, '$').split('');

  const number = temp[2];

  const replacePrice = temp
    .join('')
    .replace(/(\d)(?=(?:\d{2})+(?!\d))/g, `,${number}`);

  useEffect(() => {
    if (saleValue) {
      const str = price.formatted_with_symbol.substring(0, 6);

      const temp2 = price.formatted_with_symbol.replace(str, replacePrice);

      setFormatedPrice(temp2);
    }
  }, []);

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

            {saleValue ? (
              <div>
                <h1 className={styles.productSale}>{formatedPrice}</h1>

                <div className={styles.originPrice}>
                  <h1>{price.formatted_with_symbol}</h1>
                  <span>{discountItems[0].value}</span>
                </div>
              </div>
            ) : (
              <h1 className={styles.productPrice}>
                {price.formatted_with_symbol}
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductGallery;
