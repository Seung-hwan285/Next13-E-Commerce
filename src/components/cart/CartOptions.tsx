'use client';

import React from 'react';
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
                {/*<li style={{ color: 'blue' }}>{color}</li>*/}
                {isId && (
                  <div>
                    {color && <p style={{ color: 'blue' }}>{color}</p>}
                    {size && <p style={{ color: 'blue' }}>{size}</p>}
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
