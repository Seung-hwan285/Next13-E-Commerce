'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { productSSRState } from '@/lib/jotail/themState';
import CollectionList from '@/components/collection/CollectionList';

function ClientColletions() {
  const [data, setData] = useAtom(productSSRState);

  return <CollectionList products={data} />;
}
export default ClientColletions;
