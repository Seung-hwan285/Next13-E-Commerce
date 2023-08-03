type optionType = {
  method: string;
  body?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

const url = `${baseUrl}/v1/carts/cart_A12Jwr01rx5Pjn`;

const createRequestOptions = (method, body): optionType => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const requesetOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
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

  if (response.ok) {
    const data = await response.json();

    return data;
  }
};

// app dir 에서 fetch를  try~catch로 감싼 상태에서 {cahce : no-stroe} 사용하고 SSR 호출하게 되면
// 프로덕션에서 에러나옴
// DynamicServerError: Dynamic server usage: no-store fetch https://api.github.com/v1/products /
export const ProductAPI = {
  getAllProducts: async () => {
    const options = createRequestOptions('GET', '');
    const url = `${baseUrl}/v1/products`;

    return await sendRequest(url, options);
  },

  addCartItem: async (id: string) => {
    const body = {
      id: id,
      quality: 1,
    };
    const options = createRequestOptions('POST', body);

    return await sendRequest(url, options);
  },

  getCartItems: async () => {
    const options = createRequestOptions('GET', '');
    return await sendRequest(url, options);
  },

  getDetailProductItem: async (id) => {
    const url = `${baseUrl}/v1/products/${id}`;
    const options = createRequestOptions('GET', '');

    return await sendRequest(url, options);
  },
  updateProduct: async (product_id, variant_id) => {
    const url = `${baseUrl}/v1/products/${product_id}/variants/${variant_id}`;

    const body = {
      product_id: product_id,
      variant_id: variant_id,
    };

    const options = createRequestOptions('PUT', body);

    console.log(options);

    return await sendRequest(url, options);
  },
};
