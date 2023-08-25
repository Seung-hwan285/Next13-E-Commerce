'use client';
import React, { useEffect } from 'react';

import { setCookieComponent } from '@/components/cart/setCookie';

export function Cookie() {
  useEffect(() => {
    setCookieComponent();
  }, []);

  return <></>;
}
