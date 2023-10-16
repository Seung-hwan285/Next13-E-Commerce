"use client";

import React from "react";
import styles from "@/components/product/product.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils/queryString";
import ProductOptions from "@/components/product/ProductOptions";

function ProductSort({ options }: ProductOptions) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { name, updated, price } = options[0].options;

  const CONFIG = ["desc", "asc"];

  const optionSearchParams = new URLSearchParams(searchParams.toString());

  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (CONFIG.includes(value)) {
      optionSearchParams.set("sortDirection", value);
    } else {
      optionSearchParams.set("sortBy", value);
    }

    const optionUrl = createUrl(pathname, optionSearchParams);

    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className={styles.columnOptions}>
      <select data-testid="column" onChange={handleClick}>
        <option value="name">{name}</option>
        <option value="updated_at">{updated}</option>
        <option value="price">{price}</option>
      </select>
    </div>
  );
}
export default ProductSort;
