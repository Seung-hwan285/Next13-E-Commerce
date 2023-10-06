'use server';

import KR from '/src/dictionaries/kr.json';
import EN from '/src/dictionaries/en.json';

import { ProductAPI } from '@/lib/product';

// kr
export const getI18n = async () => {
  const { kr_products } = KR.page;
  try {
    const { result } = await ProductAPI.getAllProducts();

    const { data } = result;

    const filterId = data.map((d) => {
      return d.id;
    });

    const arr2 = [];

    kr_products.forEach((d, idx) => {
      const id = kr_products[idx].id;
      const title = kr_products[idx].title;

      filterId.forEach((f_id) => {
        if (f_id === id) {
          arr2.push(title);
        }
      });
    });

    return arr2;
  } catch (err) {
    console.error(err);
  }
};

// en
export const getI18n2 = async () => {
  const { en_products } = EN.page;
  try {
    const { result } = await ProductAPI.getAllProducts();

    const { data } = result;

    const filterId = data.map((d) => {
      return d.id;
    });

    const arr2 = [];

    en_products.forEach((d, idx) => {
      const id = en_products[idx].id;
      const title = en_products[idx].title;

      filterId.forEach((f_id) => {
        if (f_id === id) {
          arr2.push(title);
        }
      });
    });

    return arr2;
  } catch (err) {
    console.error(err);
  }
};

export const get18n = async (locale) => {
  switch (locale) {
    case 'kr':
      return await getI18n();
    case 'en':
      return await getI18n2();
  }
};
