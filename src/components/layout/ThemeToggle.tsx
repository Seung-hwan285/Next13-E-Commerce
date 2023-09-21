'use client';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { themState } from '@/lib/jotail/themState';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './layout.module.css';

type Session = {
  email: string;
  name: string;
  image: string;
};

function ThemeToggle() {
  const [activeThem, setActiveTheme] = useAtom(themState);
  const inactiveTheme = activeThem === 'light' ? 'dark' : 'light';

  const { data: session } = useSession();
  const { name, image }: Session = session?.user || {};

  useEffect(() => {
    document.body.dataset.theme = activeThem;
  }, [activeThem]);

  const handleClick = () => {
    setActiveTheme(inactiveTheme);
  };

  return (
    <>
      <ToggleButton type="button" onClick={handleClick}>
        <ToggleThumb activeTheme={activeThem} />
        <span>🌙</span>
        <span>☀️</span>

        {image && (
          <div className={styles.imageWrapper}>
            <p>{name}</p>
            <Image src={image} width="50" height="10" alt="image" />
          </div>
        )}
      </ToggleButton>
    </>
  );
}

export default ThemeToggle;

const ToggleButton = styled.button`
  --toggle-width: 80px;
  --toggle-height: 38px;
  --toggle-padding: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;
  line-height: 1;
  width: var(--toggle-width);
  height: var(--toggle-height);
  padding: var(--toggle-padding);
  border: 0;
  border-radius: calc(var(--toggle-width) / 2);
  cursor: pointer;
  background: var(--color-bg-toggle);
  transition: background 0.25s ease-in-out;
  span {
    font-size: 20px;
  }
`;

const ToggleThumb = styled.span`
  position: absolute;
  top: var(--toggle-padding);
  left: var(--toggle-padding);
  width: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  height: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  border-radius: 50%;
  background: white;
  transition: transform 0.25s ease-in-out;
  transform: ${(p) =>
    p.activeTheme === 'dark'
      ? 'translate3d(calc(var(--toggle-width) - var(--toggle-height)), 0, 0)'
      : 'none'};
`;
