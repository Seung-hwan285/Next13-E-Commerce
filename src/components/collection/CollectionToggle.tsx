import React from "react";
import styles from "./collection.module.css";
import NavBarItems from "@/components/layout/NavBarItems";
import Link from "next/link";
import { CartAPI } from "@/lib/cart";
import NavbarButton from "@/components/layout/NavbarButton";

type Cok = {
  cookie: string;
};

async function CollectionToggle({ cookie }: Cok) {
  const carts = await CartAPI.getCartItems(cookie);

  return (
    <>
      <div style={{ position: "relative" }}>
        <NavbarButton />

        <div className={styles.categoryBox}>
          <Link href={"/"}>All Product</Link>
          <Link href={"/search/T-shirt"}>T-shirt</Link>
          <Link href={"/search/Cat"}>Cat</Link>
        </div>

        <NavBarItems totalItems={carts?.totalItems} />
      </div>
    </>
  );
}
export default CollectionToggle;
