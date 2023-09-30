import { PriceType } from '@/lib/types/product';

export type Image = {
  index: number;
  id: string;
  name: string;
  sku: string | null;
  permalink: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  quantity: number;
  images: {
    url?: string;
    name: string;
  }[];
};

export type Gallery = {
  id: string;
  key: string;
  title: string;
  name: string;
  price: {
    raw: number;
    formatted_with_symbol: string;
  };
  images: Image[];
  description: string;
  skus: string | string[];
  discountItems: {
    value: number;
    product_ids: string[] | string | unknown;
  };
};

export type RelatedImage = {
  images: HTMLImageElement | string;
  name: string;
  index: string;
};

export type Cart = {
  carts: {
    created: number;
    currency: {
      code: string;
      symbol: string;
    };
    discount?: string[];
    expires: number;
    hosted_checkout_url: string;
    id: string;
    line_items: string[];
    meta?: string;
    subtotal: string;
    total_items: number;
    total_unique_items: number;
    update: number;
  };
};

type Items = {
  id: string;
  image: string;
  is_valid: boolean;
  line_total: string | number;
  name: string;
  permalink: string;
  price: PriceType;
  product_id: string;
  product_meta?: string[];
  product_name: string;
  quantity: number;
  selected_options: string[];
  sky?: string;
  tax?: string;
  variant?: string;
};

export type Temp = {
  product_id: string;
  key: string;
  option: string;
  variant_id: string;
};

export type Item = {
  item: Items[];
  cartId: string;
};
