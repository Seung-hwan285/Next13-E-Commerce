'use server';

import KR from '/src/dictionaries/kr.json';
import EN from '/src/dictionaries/en.json';

import { ProductAPI } from '@/lib/product';

// kr
export const getKR = async (id?: string) => {
  const { kr_products } = KR.page;
  const arr2 = [];

  try {
    if (!id) {
      const { result } = await ProductAPI.getAllProducts();

      const { data } = result;

      const filterId = data.map((d) => {
        return d.id;
      });

      kr_products.forEach((d) => {
        filterId.forEach((f_id) => {
          if (f_id === d.id) {
            arr2.push({ id: d.id, name: d.name });
          }
        });
      });

      return arr2;
    } else {
      const relatedItems = await ProductAPI.getDetail(id);

      // 1. name , decription
      const relatedObj = {
        id: relatedItems.id,
        name: relatedItems.name,
        description: relatedItems.description
          .toString()
          .slice(3, relatedItems.description.toString().length - 4)
          .trim(),
      };

      const filter18nObj = kr_products
        .map((data) => {
          if (data.id === relatedObj.id) {
            return Object.assign({}, relatedObj, data);
          }
        })
        .find((f) => {
          if (f) return f;
        });

      return {
        filter18nObj,
        relatedItems,
      };
    }

    // const { data } = result;
  } catch (err) {
    console.error(err);
  }
};

// en

// 1.name
// 2.description
// 3. size
// 4. color => map
export const getEN = async (id?: string) => {
  // const { page } = await getDictionary(lang); => 바꿔보기
  const { en_products } = EN.page;

  // id : prod_1

  try {
    if (!id) {
      const { result } = await ProductAPI.getAllProducts();

      const { data } = result;

      const filterId = data.map((d) => {
        return d.id;
      });

      const arr2 = [];

      en_products.forEach((d, idx) => {
        const id = en_products[idx].id;
        const title = en_products[idx].name;

        filterId.forEach((f_id) => {
          if (f_id === id) {
            arr2.push({ id: id, name: title });
          }
        });
      });

      return arr2;
    } else {
      const relatedItems = await ProductAPI.getDetail(id);

      // 1. name , decription
      const relatedObj = {
        id: relatedItems.id,
        name: relatedItems.name,
        description: relatedItems.description
          .toString()
          .slice(3, relatedItems.description.toString().length - 4)
          .trim(),
      };

      const filter18nObj = en_products
        .map((data) => {
          if (data.id === relatedObj.id) {
            return Object.assign({}, relatedObj, data);
          }
        })
        .find((f) => {
          if (f) return f;
        });

      return {
        filter18nObj,
        relatedItems,
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const get18n = async (locale, id) => {
  // id : prod_1
  switch (locale) {
    case 'kr':
      return await getKR(id);
    case 'en':
      // id : prod_1

      return await getEN(id);
  }
};
