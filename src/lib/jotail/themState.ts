import { atom, Getter } from 'jotai';
import { OptionalUtils, Products } from '@/lib/types/product';

export const themState = atom('light');
export const variantIdState = atom<string>('');
export const sessionState = atom([]);
export const productState = atom<Products[] | string>([]);
export const isSearchState = atom(false);
export const idState = atom('');
export const showState = atom<boolean>(false);
export const searchListState = atom<boolean>(true);
export const serverState = atom(false);
export const productSSRState = atom<Products[]>([]);

export const readOnlySession = atom((get) => get(sessionState));
