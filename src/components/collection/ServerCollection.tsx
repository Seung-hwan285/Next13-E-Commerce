import React from 'react';

import { ProductAPI } from '@/lib/product';
import CollectionList from '@/components/collection/CollectionList';

async function ServerCollections() {
  const { data: products } = await ProductAPI.getCategories();

  return <CollectionList products={products} />;
}
export default ServerCollections;
