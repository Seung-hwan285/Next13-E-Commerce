'use client';
import React from 'react';
import Link from 'next/link';
import styles from '/src/app/page.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles.footerBox}>
        <div className={styles.container}>
          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>Home</h1>
            <ul className={styles.footerUl}>
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
      </div>
    </footer>
  );
}
export default Footer;
