'use server';
import React from 'react';

import Product from '@/components/product/Product';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/content/dictionary';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div>
      <Product page={page} />
    </div>
  );
}
