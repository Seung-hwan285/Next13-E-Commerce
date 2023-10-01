import './globals.css';
import React from 'react';
import { NextAuthProvider } from '@/lib/provider/NextAuthProvider';
import Navbar from '@/components/layout/Navbar';
import { Inter } from '@next/font/google';
import Footer from '@/components/layout/Footer';
import { Cookie } from '@/components/cart/Cookie';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Cookie />
        </body>
      </NextAuthProvider>
    </html>
  );
}
