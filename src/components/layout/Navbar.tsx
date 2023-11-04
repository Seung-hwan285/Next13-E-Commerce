"use server";

import React from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import styles from "./layout.module.css";
import SearchBar from "@/components/search/SearchBar";
import CollectionToggle from "@/components/collection/CollectionToggle";
import SearchList from "@/components/search/SearchList";
import { cookies } from "next/headers";
import { CartAPI } from "@/lib/cart";
import Logo from "../../../public/brand_logo.svg";
import Image from "next/image";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function Navbar() {
  const cookie = cookies().get("cartId")?.value;

  await delay(1000);

  const carts = await CartAPI.getCartItems(cookie);

  return (
    <header>
      <div className={styles.searchWrapper}>
        <Image width={150} height={100} src={Logo} />
        <SearchBar />
        <SearchList />

        <div className={styles.navbarWrapper}>
          <ThemeToggle />
        </div>
      </div>

      <nav className={styles.nav}>
        {!cookie ? (
          <CollectionToggle />
        ) : (
          <CollectionToggle totalItems={carts?.total_items} />
        )}
      </nav>
    </header>
  );
}
