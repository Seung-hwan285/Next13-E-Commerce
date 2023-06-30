'use client';
import React, { useEffect } from 'react';
import ThemeToggle from '@/components/commons/ThemeToggle';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './layout.module.css';

type sessionType = {
  email: string;
  name: string;
  image: string | null;
};

function Navbar() {
  // useSession 클라이언트에서만 사용가능한 훅이라 ssr로 접근이 안댐
  const { data: session } = useSession();
  console.log('ㄴㄷ');

  const { email, name, image }: sessionType = session?.user || {};

  const handleLogoutClick = () => {
    signOut({
      callbackUrl: '/',
      // callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.imageWrapper}>
        <div className={styles.navbarUl}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            {!session ? (
              <Link href="/login">Login</Link>
            ) : (
              <button onClick={handleLogoutClick}>Logout</button>
            )}
          </li>

          <li>
            <Link href="/about">About</Link>
          </li>
        </div>
      </div>
      <div className={styles.navbarWrapper}>
        <ThemeToggle />
        {image && (
          <div className={styles.imageWrapper}>
            <p>{name}</p>
            <Image src={image} width="50" height="10" alt="image" />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// const StyledNavbar = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   height: 5rem;
//   border-bottom: 0.1rem solid gray;
// `;
//
// const ImageWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 1.5rem;
//   img {
//     border-radius: 50%;
//     height: 3rem;
//     width: 3rem;
//     margin-right: 1rem;
//   }
//   p {
//     margin-left: 8px;
//     font-size: 1.2rem;
//     font-weight: bold;
//   }
// `;
//
// const NavBarUl = styled.div`
//   list-style: none;
//   display: flex;
//   align-items: center;
//   li {
//     margin-right: 20px;
//     font-size: 19px;
//
//     &:hover {
//       color: #555;
//     }
//   }
// `;
//
// const NavBarWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;
