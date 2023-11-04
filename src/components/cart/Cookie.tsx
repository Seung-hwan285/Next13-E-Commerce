"use client";
import React, { useEffect } from "react";

import { setCookieComponent } from "@/components/cart/actions/setCookie";

export function Cookie() {
  useEffect(() => {
    setCookieComponent();
  }, []);

  return <></>;
}
