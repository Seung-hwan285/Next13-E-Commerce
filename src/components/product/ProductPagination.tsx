"use client";

import React from "react";
import Link from "next/link";
import styles from "@/components/product/product.module.css";
import { Locale } from "@/i18n.config";

type Pagination = {
  lang: Locale;
  pages: number;
};

function ProductPagination({ lang, pages }: Pagination) {
  const pageItems = [...Array(pages).keys()];

  return (
    <>
      <ul className={styles.paginationContainer}>
        {pageItems.length &&
          pageItems.map((p: number) => {
            const page = p + 1;

            return (
              <div key={p}>
                <Link
                  href={{
                    pathname: `/${lang}/${page}`,
                  }}
                >
                  <li className={styles.pageNumber} key={p}>
                    {page}
                  </li>
                </Link>
              </div>
            );
          })}
      </ul>
    </>
  );
}
export default ProductPagination;
