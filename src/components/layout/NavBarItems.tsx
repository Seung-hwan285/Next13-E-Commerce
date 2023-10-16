"use client";

import React, { startTransition, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "./layout.module.css";
import { useAtom, useSetAtom } from "jotai";
import { productSSRState, showState } from "@/lib/jotail/themState";
import ClientColletions from "@/components/collection/ClientColletions";
import Image from "next/image";
import Icon from "../../../public/free-icon-font-cart-minus-9795335.svg";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CollectionsIcon from "@mui/icons-material/Collections";
import NavbarAuthIcon from "@/components/layout/NavbarAuthIcon";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    position: "absolute",
    right: 32,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 2px",
  },
}));

function NavBarItems({ totalItems }: number) {
  const { data: session } = useSession();
  // const [show, setShow] = useAtom(showState);

  const setData = useSetAtom(productSSRState);

  const handleLogoutClick = () => {
    signOut({
      // callbackUrl: '/',
      callbackUrl: "https://shop-seung-hwan285.vercel.app/",
    });
  };

  const handleClick = async () => {
    // const res = await getCollection();

    startTransition(async () => {
      const fetchData = await fetch(`/api/collection`, {
        method: "GET",
      });

      const res = await fetchData.json();

      setData(res.data.data);
    });
  };

  const [show, setIsShow] = useAtom(showState);
  const wrapperRef = React.useRef<HTMLInputElement>(null as HTMLInputElement);

  const handleOutsideClick = (
    e: DocumentEventMap["mousedown"] | React.MouseEvent
  ) => {
    if (
      e.target instanceof HTMLElement &&
      !wrapperRef?.current?.contains(e.target)
    ) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <aside
        ref={wrapperRef}
        className={`${show ? styles.open : styles.close}`}
        onMouseDown={handleOutsideClick}
      >
        <div
          data-testid="directions"
          onClick={() => setIsShow(!show)}
          className={styles.closeToggle}
        >
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
                  <Link data-testid="home" href="/">
                    <HomeIcon color="primary" />
                  </Link>
                </li>
                <li className={styles.list}>
                  {!session ? (
                    <Link data-testid="login" href="/login">
                      <AssignmentIndIcon color="primary" />
                    </Link>
                  ) : (
                    <PersonOffIcon
                      color="primary"
                      onClick={handleLogoutClick}
                    />
                    // <button onClick={handleLogoutClick}>Logout</button>
                  )}
                </li>

                <li className={styles.list}>
                  <Link data-testid="cart" href="/cart">
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
                    <CollectionsIcon data-testid="collection" color="primary" />

                    <div className={styles.dropDown}>
                      <ClientColletions />
                    </div>
                  </li>
                </form>
              </div>
            </nav>
          </div>

          <div className={styles.sidebarFooter}>
            {!!session && <NavbarAuthIcon />}
          </div>
        </div>
      </aside>
    </>
  );
}
export default NavBarItems;
