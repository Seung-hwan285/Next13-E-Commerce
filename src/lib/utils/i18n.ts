"use server";

import KR from "/src/dictionaries/ko.json";
import EN from "/src/dictionaries/en.json";

import { ProductAPI } from "@/lib/product";

// kr
export const getKR = async (id?: string) => {
  const { kr_products, options } = KR.page;
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
            arr2.push({ id: d.id, name: d.name, options: options });
          }
        });
      });

      return arr2;
    } else {
      const relatedItems = await ProductAPI.getDetail(id);
      const productItems = await ProductAPI.getAllProducts();

      const prices = productItems.result.data
        .map((d) => ({
          price: d.price.raw,
        }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 5)
        .map((p) => {
          return p.price;
        });

      const findItems = productItems.result.data
        .filter((f) => prices.includes(f.price.raw))
        .sort((a, b) => a.price.raw - b.price.raw);

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

      const arr2 = [];

      kr_products.forEach((kr) => {
        findItems.forEach((p_id) => {
          if (kr.id === p_id.id) {
            arr2.push({
              id: p_id.id,
              name: kr.name,
              image: {
                url: p_id.image.url,
              },
              price: {
                formatted_with_symbol: p_id.price.formatted_with_symbol,
              },
            });
          }
        });
      });

      return {
        filter18nObj,
        relatedItems,
        arr2,
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const getEN = async (id?: string) => {
  const { en_products, options } = EN.page;

  try {
    if (!id) {
      const { result } = await ProductAPI.getAllProducts();

      const { data } = result;

      const filterId = data.map((d) => {
        return d.id;
      });

      const arr2 = [];

      en_products.forEach((d, idx) => {
        filterId.forEach((f_id) => {
          const id = en_products[idx].id;
          const title = en_products[idx].name;

          if (f_id === id) {
            arr2.push({ id: id, name: title, options: options });
          }
        });
      });

      return arr2;
    } else {
      const relatedItems = await ProductAPI.getDetail(id);
      const productItems = await ProductAPI.getAllProducts();

      const prices = productItems.result.data
        .map((d) => ({
          price: d.price.raw,
        }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 5)
        .map((p) => {
          return p.price;
        });

      const findItems = productItems.result.data
        .filter((f) => prices.includes(f.price.raw))
        .sort((a, b) => a.price.raw - b.price.raw);

      const arr2 = [];

      en_products.forEach((en) => {
        findItems.forEach((p_id) => {
          if (en.id === p_id.id) {
            arr2.push({
              id: p_id.id,
              name: p_id.name,
              image: {
                url: p_id.image.url,
              },
              price: {
                formatted_with_symbol: p_id.price.formatted_with_symbol,
              },
            });
          }
        });
      });

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
        arr2,
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const get18n = async (locale, id) => {
  // id : prod_1
  switch (locale) {
    case "ko":
      return await getKR(id);
    case "en":
      return await getEN(id);
  }
};
