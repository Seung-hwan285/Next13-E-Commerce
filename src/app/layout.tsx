'use client';

import './globals.css';
import React from 'react';
import { NextAuthProvider } from '@/app/provider/NextAuthProvider';
import Head from '@/app/head';
import { ThemeProvider } from '@emotion/react';
import Navbar from '@/app/layouts/Navbar';
import { theme } from '@/app/theme';

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
