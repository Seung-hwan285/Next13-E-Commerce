"use client";

import React, { useEffect, useState } from "react";
import ImageWithPlaceholder from "@/components/commons/ImageMetaData";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { onLCP } from "web-vitals";

type Wrapper = {
  src: string;
  value: string;
};

function FooterLink({ src, value }: Wrapper) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  onLCP(console.log);

  const redirectPathName = (location: string) => {
    if (!pathname) redirect("/");

    const segemtns = pathname.split("/");

    segemtns[1] = location;

    console.log(location);
    return segemtns.join("/");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <>
      <Link
        prefetch={false}
        value={value}
        href={redirectPathName(value)}
      ></Link>
    </>
  );
}
export default FooterLink;
