export type PriceType = {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
};
export type ImageType = {
  id: string;
  url: string;
  description: string;
  is_image: string;
  filename: string;
  file_size: string;
  file_extension: string;
  image_dimensions: {
    width: number;
    height: number;
  };
};

export type ProductsType = Record<'id' | 'name' | 'categories', string> & {
  description: PriceType;
  image: ImageType;
};
