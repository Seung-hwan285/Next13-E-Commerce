'use client';

import './globals.css';

import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/app/theme';
import { NextAuthProvider } from '@/app/NextAuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <head />
        <body>
          <NextAuthProvider>{children}</NextAuthProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
