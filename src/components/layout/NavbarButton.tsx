"use client";

import React from "react";
import styles from "@/components/collection/collection.module.css";
import { useAtom } from "jotai";
import { showState } from "@/lib/jotail/themState";

// test
function NavbarButton() {
  const [show, setIsShow] = useAtom(showState);

  return (
    <div
      data-testid="navbar-ham"
      onClick={() => setIsShow(!show)}
      className={styles.toggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
export default NavbarButton;
