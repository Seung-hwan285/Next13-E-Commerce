'use client';
import React from 'react';
import Link from 'next/link';
import styles from '/src/app/page.module.css';
import Icon from '/public/free-icon-font-cart-minus-9795335.svg';
import Image from 'next/image';

function Footer() {
  return (
    <footer>
      <div className={styles.footerBox}>
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            <div style={{ textAlign: 'center' }}>
              <h1 className={styles.footerWrapper}>Shop</h1>
              <Image src={Icon} height={52} width={100} alt="shop" />
            </div>

            <p>
              Ipsum is simply dummy text of the printing and typesetting
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever.Since the 1500s, when an unknown printer.
            </p>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>About</h1>
            <ul className={styles.footerUl}>
              <li>
                <Link href={'/'}>Home</Link>
              </li>

              <li>
                <Link href={'/search/Cat'}>Cat</Link>
              </li>

              <li>
                <Link href={'/search/T-shirt'}>T-Shirt</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>Contact Us</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>email</span>
              </li>
            </ul>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>Our Offers</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>About Us</span>
              </li>

              <li>
                <span>Information</span>
              </li>

              <li>
                <span>Privacy Policy</span>
              </li>

              <li>
                <span>Terms & Conditions</span>
              </li>
            </ul>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>Our Offers</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>About Us</span>
              </li>

              <li>
                <span>Information</span>
              </li>

              <li>
                <span>Privacy Policy</span>
              </li>

              <li>
                <span>Terms & Conditions</span>
              </li>
            </ul>
          </div>
          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>Our Offers</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>About Us</span>
              </li>

              <li>
                <span>Information</span>
              </li>

              <li>
                <span>Privacy Policy</span>
              </li>

              <li>
                <span>Terms & Conditions</span>
              </li>
            </ul>
          </div>
          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>Service</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>About Us</span>
              </li>

              <li>
                <span>Information</span>
              </li>

              <li>
                <span>Privacy Policy</span>
              </li>

              <li>
                <span>Terms & Conditions</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerLine}>
          <div className={styles.footerTitle}>
            <p> © 2023 Ecommerce theme by www.shop.com</p>
          </div>

          <div className={styles.footerCountry}>
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;