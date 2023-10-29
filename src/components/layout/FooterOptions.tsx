"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/[lang]/page.module.css";

import Image from "next/image";

import KR from "/public/kr.svg";
import US from "/public/us.svg";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

function FooterOptions() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const CONFIG = [
    {
      index: 1,
      icon: KR,
      value: "kr",
    },
    {
      index: 2,
      icon: US,
      value: "en",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  const redirectPathName = (location: string) => {
    if (!pathname) redirect("/");

    const segemtns = pathname.split("/");

    segemtns[1] = location;
    return segemtns.join("/");
  };

  return (
    <div className={styles.footerBottom}>
      <ul style={{ width: "200px" }}>
        {CONFIG.map(({ icon, value, index }) => {
          return (
            <li key={index}>
              <Link
                href={redirectPathName(value)}
                prefetch={false}
                value={value}
              >
                <Image src={icon} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default FooterOptions;
