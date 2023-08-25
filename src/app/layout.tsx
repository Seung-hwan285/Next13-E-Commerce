import './globals.css';
import React, { Suspense } from 'react';
import { NextAuthProvider } from '@/lib/provider/NextAuthProvider';
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body>
          <header>
            <Navbar />
          </header>
          <Suspense fallback={<h1>Error...</h1>}>
            <main>{children}</main>
          </Suspense>
          <footer></footer>
        </body>
      </NextAuthProvider>
    </html>
  );
}
