'use server';
import React from 'react';
import Link from 'next/link';
import styles from '/src/app/[lang]/page.module.css';
import Icon from '/public/free-icon-font-cart-minus-9795335.svg';
import Image from 'next/image';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/content/dictionary';
import FooterOptions from '@/components/layout/FooterOptions';

async function Footer({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);

  return (
    <footer>
      <div className={styles.footerBox}>
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            <div style={{ textAlign: 'center' }}>
              <h1 className={styles.footerWrapper}>{page.footer.title}</h1>
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
            <h1 className={styles.footerWrapper}>
              {page.footer.footerAbout.title}
            </h1>
            <ul className={styles.footerUl}>
              <li>
                <Link href={'/'}>{page.footer.footerAbout.Home}</Link>
              </li>

              <li>
                <Link href={'/search/Cat'}>{page.footer.footerAbout.Cat}</Link>
              </li>

              <li>
                <Link href={'/search/T-shirt'}>
                  {page.footer.footerAbout.Tshirt}
                </Link>
              </li>

              <li>
                <Link href={'/cart'}>{page.footer.footerAbout.Cart}</Link>
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

          <FooterOptions />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
