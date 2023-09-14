'use client';
import React from 'react';
import Link from 'next/link';

import styles from '/src/app/page.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles.footerBox}>
        <div className={styles.container}>
          <Link href={'/'}>Logo Icon</Link>

          <div className={styles.home}>
            <h6>Home</h6>
            <ul>
              <li>
                <Link href={'/categories'}>Categories</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6>Contact Us</h6>
            <ul>
              <li>
                <span>email : test</span>
              </li>
            </ul>
          </div>

          <div>
            <h6>Our Offers</h6>
            <ul>
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

          <div>
            <h6>Service</h6>
            <ul>
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
