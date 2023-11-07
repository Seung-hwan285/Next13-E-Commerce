"use client";
import React, { useEffect } from "react";

import { setCookie } from "@/components/cart/actions/setCookie";

export function Cookie() {
  useEffect(() => {
    setCookie();
  }, []);

  return <></>;
}
