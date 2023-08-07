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
  key: string;
  title: string;
  name: string;
  price: string;
  images: Image[];
};

export type RelatedImage = {
  images: HTMLImageElement | string;
  name: string;
  index: string;
};
