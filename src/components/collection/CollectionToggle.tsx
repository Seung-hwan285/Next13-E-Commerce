'use client';
import React, { useEffect } from 'react';
import styles from './collection.module.css';
import { useAtom } from 'jotai';
import { showState } from '@/lib/jotail/themState';
import NavBarItems from '@/components/layout/NavBarItems';

function CollectionToggle({ totalItems }: number) {
  const [show, setIsShow] = useAtom(showState);

  return (
    <>
      <div className={styles.toogleBox}>
        <div onClick={() => setIsShow(!show)} className={styles.toggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <NavBarItems totalItems={totalItems} />
      </div>
    </>
  );
}
export default CollectionToggle;
