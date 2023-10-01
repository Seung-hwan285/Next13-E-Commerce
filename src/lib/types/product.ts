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

export type VaruantData = OptionalUtils<{
  readonly id: string;
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
  links: string;
};

export type Variant = {
  description?: string;
  variantItems: VaruantData[];
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

interface Price {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

interface Inventory {
  managed: boolean;
  available: number;
}

interface SEO {
  title: string | null;
  description: string | null;
}

interface Conditionals {
  is_active: boolean;
  is_tax_exempt: boolean;
  is_pay_what_you_want: boolean;
  is_inventory_managed: boolean;
  is_sold_out: boolean;
  has_digital_delivery: boolean;
  has_physical_delivery: boolean;
  has_images: boolean;
  collects_fullname: boolean;
  collects_shipping_address: boolean;
  collects_billing_address: boolean;
  collects_extra_fields: boolean;
}

interface Is {
  active: boolean;
  tax_exempt: boolean;
  pay_what_you_want: boolean;
  inventory_managed: boolean;
  sold_out: boolean;
}

interface Has {
  digital_delivery: boolean;
  physical_delivery: boolean;
  images: boolean;
}

interface Collects {
  fullname: boolean;
  shipping_address: boolean;
  billing_address: boolean;
  extra_fields: boolean;
}

interface Category {
  id: string;
  slug: string;
  name: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

interface Image {
  id: string;
  url: string;
  description: string | null;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: string;
  image_dimensions: ImageDimensions;
  meta: null[];
  created_at: number;
  updated_at: number;
}

export type Product = {
  id: string;
  created: number;
  updated: number;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  price: Price;
  inventory: Inventory;
  sku: string;
  sort_order: number;
  seo: SEO;
  thank_you_url: string | null;
  meta: null;
  conditionals: Conditionals;
  is: Is;
  has: Has;
  collects: Collects;
  checkout_url: {
    checkout: string;
    display: string;
  };
  categories: Category[];
  image: Image;

  pages?: number[];
};

export type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type VariantItems = {
  title: string;
  data: VaruantData;

  sliceDescription?: string;
};

export type Option = {
  method: string;
  body?: string;
  obj?: {
    cache: boolean;
  };
};

export type Obj = {
  o_sortBy: string | string[] | undefined;
  o_limit: string | string[] | undefined;
  o_page: string | string[] | undefined;
};

type Related = {
  image: Image;
  name: string;
};
