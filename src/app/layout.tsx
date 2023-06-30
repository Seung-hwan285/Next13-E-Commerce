'use client';

import './globals.css';
import React from 'react';
import { NextAuthProvider } from '@/lib/provider/NextAuthProvider';
import Head from '@/app/head';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/app/theme';
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <Head />
        <NextAuthProvider>
          <body>
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
            <footer></footer>
          </body>
        </NextAuthProvider>
      </ThemeProvider>
    </html>
  );
}
