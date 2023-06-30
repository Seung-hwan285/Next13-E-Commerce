'use client';
import React from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiOutlineCaretDown } from 'react-icons/ai';
import styles from './layout.module.css';
import NavBarItems from '@/components/layout/NavBarItems';

type sessionType = {
  email: string;
  name: string;
  image: string | null;
};

function Navbar() {
  const { data: session } = useSession();

  const { email, name, image }: sessionType = session?.user || {};

  return (
    <nav className={styles.nav}>
      <div className={styles.imageWrapper}>
        <div className={styles.navbarUl}>
          <NavBarItems icon={<AiOutlineCaretDown />} />
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
