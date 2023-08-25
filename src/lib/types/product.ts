export type PriceType = {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
};

type ProductVariant = {
  product_id: number;
  id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: null | string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: string;
  option3: null | string;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: null | number;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
};

type ProductOption = {
  product_id: number;
  id: number;
  name: string;
  position: number;
  value: string[];
};

type ProductImages = {
  product_id: number;
  id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt?: string;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
  admin_graphql_api_id: string;
};

type RecordKey =
  | 'title'
  | 'body_html'
  | 'vendor'
  | 'product_type'
  | 'created_at'
  | 'handle'
  | 'updated_at'
  | 'published_at'
  | 'template_suffix'
  | 'status'
  | 'published_scope'
  | 'tags'
  | 'admin_graphql_api_id';

export type Products = Record<RecordKey, string> & {
  id: number;
  variants: ProductVariant[];
  options: ProductOption[];
  images: ProductImages[];
  image: ProductImages;
};

export type OptionalUtils<T> = {
  [K in keyof T]?: T[K];
};

export type Data = OptionalUtils<{
  id: string;
  name: string;
  meta: string;
  created: number;
  updated: number;
  options: string[];
}>;

export type Pagination = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: any;
};

export type Variant = {
  variantItems: Data[];
  meta: {
    pagination: Pagination;
  };
};

export type Options = {
  id: string;
  name: string;
  price: PriceType;
  assets?: string[];
  meta?: string;
  created: number;
  updated: number;
};

export type OptionsVariant = {
  id: string;
  options: Options;
};
