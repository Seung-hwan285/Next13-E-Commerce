"use client";

import React, { startTransition, useEffect, useState } from "react";

import styles from "./search.module.css";
import { productState, searchListState } from "@/lib/jotail/themState";
import { useAtom, useSetAtom } from "jotai";
import { ProductAPI } from "@/lib/product";
import { useThrottle } from "@uidotdev/usehooks";
// import { onTTFB, onCLS, onLCP, onFID } from "web-vitals";

function SearchBar() {
  const [name, setName] = useState("");
  const [, setProduct] = useAtom(productState);

  const throttledValue = useThrottle(name, 2000);

  const setIsShow = useSetAtom(searchListState);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    setIsShow(true);
    if (value.length > 0) {
      startTransition(async () => {
        const { data } = await ProductAPI.getSearchProducts(value);
        setProduct(data);
      });
    }
  };

  useEffect(() => {
    if (throttledValue.length === 0) {
      setProduct([]);
    }
  }, [throttledValue]);

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          data-testid="search-bar"
          className={styles.searchInput}
          type="text"
          name="search"
          onChange={handleChange}
          value={name}
          placeholder={"Search"}
        />
      </div>
    </>
  );
}
export default SearchBar;
