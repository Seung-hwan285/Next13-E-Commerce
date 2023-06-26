'use clinet';

import React from 'react';
import styled from '@emotion/styled';
import ThemeToggle from '@/app/commons/ThemeToggle';

function Navbar() {
  return (
    <StyledNavbar>
      <NavBarWrapper>
        <ThemeToggle />
      </NavBarWrapper>
    </StyledNavbar>
  );
}

export default Navbar;

const StyledNavbar = styled.nav`
  height: 5rem;
  border-bottom: 0.1rem solid gray;
  color: #fff;
`;

const NavBarWrapper = styled.div`
  float: right;
  margin: 16px 10px;
`;
