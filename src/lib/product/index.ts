import { checkUrl } from '@/lib/utils/checkUrl';

type optionType = {
  method: string;
  body?: string;
  obj?: any;
};

const baseUrl = checkUrl(process.env.NEXT_PUBLIC_URL);

const createRequestOptions = (method, obj?, body?): optionType => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const isCache = obj?.cache ? 'force-cache' : 'no-store';

  console.log(isCache);

  const requesetOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
    },
    cache: isCache,
    // cache: 'force-cache',

    // cache: ${ob 'no-store',
    body: undefined,
  };

  if (method === 'GET') {
    return requesetOptions;
  }

  if (bodyObjects) {
    requesetOptions.body = bodyObjects;
  }

  console.log(requesetOptions);
  return requesetOptions;
};

const sendRequest = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    console.error('error');
  }

  return await response.json();
};

// // 1. search
// // 2. main
// // 3. collection
// const createUrl = (name: string, key: string) => {
//   const urls = [
//     {
//       main: `${baseUrl}/v1/products`,
//     },
//     {
//       search: `${baseUrl}/v1/products?query=${name}`,
//     },
//     {
//       collection: 'url',
//     },
//   ];
//
//   // const findUrl = urls.find((url)=>url.)
// };

export const ProductAPI = {
  getAllProducts: async () => {
    const options = createRequestOptions('GET');
    const url = `${baseUrl}/v1/products`;

    return await sendRequest(url, options);
  },

  getDetail: async (id) => {
    const url = `${baseUrl}/v1/products/${id}`;

    const options = createRequestOptions('GET');

    return await sendRequest(url, options);
  },

  getVariantItems: async (id) => {
    const url = `${baseUrl}/v1/products/${id}/variant_groups`;
    const options = createRequestOptions('GET');

    return await sendRequest(url, options);
  },

  getCategories: async (id?: string | unknown) => {
    const url = id
      ? `${baseUrl}/v1/categories?parent_id=${id}`
      : `${baseUrl}/v1/categories`;

    const obj = {
      cache: true,
    };

    const options = createRequestOptions('GET', obj);

    return await sendRequest(url, options);
  },

  getSearchProducts: async (name: string | unknown) => {
    if (name.length > 0) {
      const url = `${baseUrl}/v1/products?query=${name}`;

      const options = createRequestOptions('GET');
      return await sendRequest(url, options);
    }
  },

  getRelatedProducts: async (fileds: string | unknown) => {
    const url = `${baseUrl}/v1/products?include=${fileds}`;

    const options = createRequestOptions('GET');

    return await sendRequest(url, options);
  },

  // updateProduct: async (id: string, image: string | unknown) => {
  //   const url = `${baseUrl}/v1/products/${id}`;
  //
  //   const options = createRequestOptions('PUT', body, image);
  //
  //   return await sendRequest(url, options);
  // },
};
