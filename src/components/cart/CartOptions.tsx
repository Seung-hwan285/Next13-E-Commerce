'use client';

import React from 'react';
import styles from './cart.module.css';

import { readOnlySession } from '@/lib/jotail/themState';
import { useAtomValue } from 'jotai';

function CartOptions({ id }: string) {
  const sessionAtom = useAtomValue(readOnlySession);

  return (
    <>
      <ul>
        {sessionAtom &&
          sessionAtom.map(({ values: { color, size }, product_id }, index) => {
            const isId = product_id === id;

            return (
              <div key={index}>
                {isId && (
                  <div className={styles.fontContainer}>
                    {size && <p>SIZE : {size}</p>}
                    {color && <p>COLOR : {color}</p>}
                  </div>
                )}
              </div>
            );
          })}
      </ul>
    </>
  );
}
export default CartOptions;
