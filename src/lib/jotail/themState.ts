import { atom, Getter } from 'jotai';
import { OptionalUtils } from '@/lib/types/product';

export const themState = atom('light');
export const variantIdState = atom<string>('');
export const sessionState = atom([]);

export const readOnlySession = atom((get) => get(sessionState));

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

export const atomWithRefresh = <T>(fn: (get: Getter) => T) => {
  const refreshCounter = atom(0);

  return atom(
    (get) => {
      return get(optionIdState);
    },
    (get, set) => set(refreshCounter, (i) => i + 1)
  );
};

export const optionIdState = atom<any[]>([
  {
    product_id: '',
    values: {
      color: '',
      size: '',
    },
  },
]);
