import React from 'react';
import styled from '@emotion/styled';
import ThemeToggle from '@/app/commons/ThemeToggle';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

type sessionType = {
  email: string;
  name: string;
  image: string | null;
};

function Navbar() {
  const { data: session } = useSession();
  const { email, name, image }: sessionType = session?.user || {};

  const handleLogoutClick = () => {
    signOut({
      callbackUrl: '/',
      // callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  return (
    <StyledNavbar>
      <NavBarButtonWrapper>
        <NavBarUl>
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
            <Link href="/">About</Link>
          </li>
        </NavBarUl>
      </NavBarButtonWrapper>
      <NavBarWrapper>
        <ThemeToggle />
        {image && (
          <ImageWrapper>
            <p>{name}</p>

            <Image src={image} width="50" height="10" alt="image" />
          </ImageWrapper>
        )}
      </NavBarWrapper>
    </StyledNavbar>
  );
}

export default Navbar;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 5rem;
  border-bottom: 0.1rem solid gray;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  img {
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
  }
  p {
    margin-left: 8px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const NavBarButtonWrapper = styled.div`
  display: flex;
  margin: 15px 20px;
  float: left;
  padding: 10px;
`;

const NavBarUl = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  li {
    margin-right: 20px;
    font-size: 19px;

    &:hover {
      color: #555;
    }
  }
`;

const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
`;
