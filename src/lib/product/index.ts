import { checkUrl } from '@/lib/utils/checkUrl';

type optionType = {
  method: string;
  body?: string;
  image?: any;
};

const baseUrl = checkUrl(process.env.NEXT_PUBLIC_URL);

const createRequestOptions = (method, body, image): optionType => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const requesetOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': image
        ? process.env.NEXT_PUBLIC_SECRET_KEY
        : process.env.NEXT_PUBLIC_SHOP_KEY,
    },
    cache: 'no-store',
    body: undefined,
  };

  if (method === 'GET') {
    return requesetOptions;
  }

  if (bodyObjects) {
    requesetOptions.body = bodyObjects;
  }

  return requesetOptions;
};

const sendRequest = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('error');
  }

  const data = await response.json();

  return data;
};

// app dir 에서 fetch를  try~catch로 감싼 상태에서 {cahce : no-stroe} 사용하고 SSR 호출하게 되면
// 프로덕션에서 에러나옴
// DynamicServerError: Dynamic server usage: no-store fetch https://api.github.com/v1/products /
export const ProductAPI = {
  getAllProducts: async () => {
    const options = createRequestOptions('GET', '', '');
    const url = `${baseUrl}/v1/products`;

    return await sendRequest(url, options);
  },

  getDetailProductItem: async (id) => {
    const url = `${baseUrl}/v1/products/${id}`;
    const options = createRequestOptions('GET', '', '');

    return await sendRequest(url, options);
  },

  getVariantItems: async (id) => {
    const url = `${baseUrl}/v1/products/${id}/variant_groups`;
    const options = createRequestOptions('GET', '', '');

    return await sendRequest(url, options);
  },

  getCategories: async (id: string | unknown) => {
    if (!id) {
      const url = `${baseUrl}/v1/categories`;
      const options = createRequestOptions('GET', '', '');

      return await sendRequest(url, options);
    }

    const url = `${baseUrl}/v1/categories?parent_id=${id}`;
    const options = createRequestOptions('GET', '', '');
    return await sendRequest(url, options);
  },

  updateProduct: async (id: string, image: string | unknown) => {
    const url = `${baseUrl}/v1/products/${id}`;

    const options = createRequestOptions('PUT', body, image);

    return await sendRequest(url, options);
  },
};
