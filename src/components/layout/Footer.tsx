import React from 'react';
import Link from 'next/link';
import styles from '/src/app/[lang]/page.module.css';
import Icon from '/public/free-icon-font-cart-minus-9795335.svg';
import Image from 'next/image';
import { Locale } from '@/i18n.config';
import FooterOptions from '@/components/layout/FooterOptions';
import { getDictionary } from '@/lib/content/dictionary';

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

            <p>{page.footer.description}</p>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>
              {page.footer.footerAbout.Title}
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
            <h1 className={styles.footerWrapper}>
              {page.footer.contact.Title}
            </h1>
            <ul className={styles.footerUl}>
              <li>
                <span>{page.footer.contact.Email}</span>
              </li>
            </ul>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>{page.footer.offers.Title}</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>{page.footer.offers.Information}</span>
              </li>

              <li>
                <span>{page.footer.offers.Policy}</span>
              </li>

              <li>
                <span>{page.footer.offers.Terms}</span>
              </li>
            </ul>
          </div>

          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>{page.footer.offers.Title}</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>{page.footer.offers.Information}</span>
              </li>

              <li>
                <span>{page.footer.offers.Policy}</span>
              </li>

              <li>
                <span>{page.footer.offers.Terms}</span>
              </li>
            </ul>
          </div>
          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>{page.footer.offers.Title}</h1>
            <ul className={styles.footerUl}>
              <li>
                <span>{page.footer.offers.Information}</span>
              </li>

              <li>
                <span>{page.footer.offers.Policy}</span>
              </li>

              <li>
                <span>{page.footer.offers.Terms}</span>
              </li>
            </ul>
          </div>
          <div className={styles.footerContainer}>
            <h1 className={styles.footerWrapper}>
              {page.footer.service.Title}
            </h1>
            <ul className={styles.footerUl}>
              <li>
                <span>{page.footer.offers.Information}</span>
              </li>

              <li>
                <span>{page.footer.offers.Policy}</span>
              </li>

              <li>
                <span>{page.footer.offers.Terms}</span>
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
