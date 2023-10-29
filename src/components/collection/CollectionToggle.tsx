"use client";
import React from "react";
import styles from "./collection.module.css";
import { useAtom } from "jotai";
import { showState } from "@/lib/jotail/themState";
import NavBarItems from "@/components/layout/NavBarItems";
import Link from "next/link";

type Toggle = {
  totalItems?: number;
};

function CollectionToggle({ totalItems }: Toggle) {
  const [show, setIsShow] = useAtom(showState);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          data-testid="navbar-ham"
          onClick={() => setIsShow(!show)}
          className={styles.toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.categoryBox}>
          <Link href={"/"}>All Product</Link>
          <Link href={"/search/T-shirt"}>T-shirt</Link>
          <Link href={"/search/Cat"}>Cat</Link>
        </div>

        <NavBarItems totalItems={totalItems} />
      </div>
    </>
  );
}
export default CollectionToggle;
