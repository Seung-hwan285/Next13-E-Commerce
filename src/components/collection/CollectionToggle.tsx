'use client';

import React, { useEffect } from 'react';
import styles from './collection.module.css';
import { useAtom } from 'jotai';
import { showState } from '@/lib/jotail/themState';
import NavBarItems from '@/components/layout/NavBarItems';

function CollectionToggle() {
  const [show, setIsShow] = useAtom(showState);
  const wrapperRef = React.useRef<HTMLInputElement>(null as HTMLInputElement);

  const handleOutsideClick = (
    e: DocumentEventMap['mousedown'] | React.MouseEvent
  ) => {
    if (
      e.target instanceof HTMLElement &&
      wrapperRef?.current?.contains(e.target)
    ) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <>
      <div className={styles.toogleBox}>
        <div onClick={() => setIsShow(!show)} className={styles.toggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <NavBarItems />
      </div>
    </>
  );
}
export default CollectionToggle;
