"use server";

import React from "react";

import styles from "./loding.module.css";
import { get18n } from "@/lib/utils/i18n";
import { Locale } from "@/i18n.config";

type Skeleton = {
  pages?: number;
  name?: string;
  lang: Locale;
};

async function Skeleton({ name, lang }: Skeleton) {
  const getProducts = await get18n(lang, "", name);

  const sliceLen = !name
    ? getProducts?.slice(0, 5).length
    : getProducts?.length;

  return (
    <ul className={styles.gridContainer}>
      <div className={styles.gridWrapper}>
        {Array.from({ length: sliceLen }, (_, index) => {
          return <div key={index} className={styles.gridItem}></div>;
        })}
      </div>
    </ul>
  );
}
export default Skeleton;
