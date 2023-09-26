'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './layout.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { productSSRState, showState } from '@/lib/jotail/themState';
import { getCollection } from '@/components/collection/action';
import ClientColletions from '@/components/collection/ClientColletions';
import Image from 'next/image';
import Icon from '../../../public/free-icon-font-cart-minus-9795335.svg';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useRouter } from 'next/navigation';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    position: 'absolute',
    right: 32,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 2px',
  },
}));

function NavBarItems({ totalItems }: number) {
  const { data: session } = useSession();
  const [show, setShow] = useAtom(showState);

  const setData = useSetAtom(productSSRState);

  const handleLogoutClick = () => {
    signOut({
      // callbackUrl: '/',
      callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  // server action
  async function handleClick() {
    const res = await getCollection();
    setData(res.data);
  }

  return (
    <>
      <aside className={`${show ? styles.open : styles.close}`}>
        <div onClick={() => setShow(!show)} className={styles.closeToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.iconContainer}>
          <Image src={Icon} height={100} width={120} alt="shop" />
        </div>

        <div className={styles.dropDownContainer}>
          <div className={styles.sidebarHead}>
            <h1>Sidebar</h1>
          </div>
          <div className={styles.sidebarBody}>
            <nav>
              <div className={styles.menu}>
                <li className={styles.list}>
                  <Link href="/">
                    <HomeIcon color="primary" />
                  </Link>
                </li>
                <li className={styles.list}>
                  {!session ? (
                    <Link href="/login">
                      <AssignmentIndIcon color="primary" />
                    </Link>
                  ) : (
                    <button onClick={handleLogoutClick}>Logout</button>
                  )}
                </li>
                <li className={styles.list}>
                  <Link href="/cart">
                    <IconButton color="primary" aria-label="cart">
                      {totalItems > 0 ? (
                        <StyledBadge
                          badgeContent={totalItems}
                          color="secondary"
                        >
                          <ShoppingCartIcon />
                        </StyledBadge>
                      ) : (
                        <StyledBadge color="secondary">
                          <ShoppingCartIcon />
                        </StyledBadge>
                      )}
                    </IconButton>
                  </Link>
                </li>

                <form action={handleClick}>
                  <li onClick={handleClick} className={styles.listCollection}>
                    <CollectionsIcon color="primary" />

                    <div className={styles.dropDown}>
                      <ClientColletions />
                    </div>
                  </li>
                </form>
              </div>
            </nav>
          </div>

          <div className={styles.sidebarFoot}>
            <p>2023-09-01</p>
          </div>
        </div>
      </aside>
    </>
  );
}
export default NavBarItems;
