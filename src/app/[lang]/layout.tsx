import './globals.css';
import React from 'react';
import { NextAuthProvider } from '@/lib/provider/NextAuthProvider';
import Navbar from '@/components/layout/Navbar';
import { Inter } from '@next/font/google';
import Footer from '@/components/layout/Footer';
import { Cookie } from '@/components/cart/Cookie';
import { i18n, Locale } from '@/i18n.config';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Error: Invariant: Method expects to have requestAsyncStorage, none available
// export const runtime = 'edge'; // 'nodejs' (default) | 'edge'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'E-Commerce',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <NextAuthProvider>
        <body className={inter.className}>
          <Cookie />
          <Navbar />
          <main>{children}</main>
          <Footer lang={params.lang} />
        </body>
      </NextAuthProvider>
    </html>
  );
}
