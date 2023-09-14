import { atom, Getter } from 'jotai';
import { OptionalUtils, Products } from '@/lib/types/product';
import { ProductAPI } from '@/lib/product';
import { atomWithLocation } from 'jotai-location';

export const themState = atom('light');
export const variantIdState = atom<string>('');
export const sessionState = atom([]);
export const productState = atom<Products[] | string>([]);
export const isSearchState = atom(false);
export const idState = atom('');
export const showState = atom(false);
export const serverState = atom(false);
export const productSSRState = atom<Products[]>([]);

export const asyncData = atom(null, async (set, get) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/v1/categories`);

  const result = await response.json();
  console.log(result);

  return result;
});

export const readOnlySession = atom((get) => get(sessionState));
export const readOnlyProduct = atom((get) => get(productState));

export const optionIdState = atom<any[]>([
  {
    product_id: '',
    values: {
      color: '',
      size: '',
    },
  },
]);

export const tempAtom = atom(null, async (get): Promise<any> => {
  const id = get(idState);

  if (!id) {
    return await ProductAPI.getAllProducts();
  }
  return await ProductAPI.getDetail(id);
});

export const atomWithRefresh = <T>(fn: (get: Getter) => T) => {
  const refreshCounter = atom(0);
  return atom(
    (get) => {
      get(refreshCounter);
      return fn(get);
    },
    (_, set) => set(refreshCounter, (i) => i + 1)
  );
};
export type OptionAtom = OptionalUtils<{
  product_id: string;
  values: {
    color: string;
    size: string;
  };
}>;

export type Temp = {
  options: OptionAtom;
};

export const productData = atom((get) => {
  const id = get(idState);
  console.log(id);

  const pathname = get(pathnameState);

  // const pathname = get(locationAtom);

  if (!id) {
    return ProductAPI.getAllProducts();
  }

  return ProductAPI.getSearchProducts(id);
});
