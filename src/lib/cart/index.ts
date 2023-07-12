const baseUrl = process.env.NEXT_PUBLIC_URL;

type optionType = {
  method: string;
  body?: string;
};

const url = `${baseUrl}/v1/carts/cart_G6kVw79Wa252eD`;

const createRequestOptions = (method, body): optionType => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
    },
    cache: 'no-store',
    body: undefined,
  };

  if (method === 'GET' || method === 'DELETE') {
    return requestOptions;
  }

  if (bodyObjects) {
    requestOptions.body = bodyObjects;
  }

  return requestOptions;
};

const sendRequest = async (url, options) => {
  const response = await fetch(url, options);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const CartAPI = {
  deleteCart: async () => {
    const options = createRequestOptions('DELETE', '');
    return await sendRequest(url, options);
  },

  deleteCartItem: async (cartId, lineId) => {
    const url = `${baseUrl}/v1/carts/${cartId}/items/${lineId}`;
    const options = createRequestOptions('DELETE', '');

    return await sendRequest(url, options);
  },

  updateCartItem: async (cartId, lineId, quantity) => {
    const url = `${baseUrl}/v1/carts/${cartId}/items/${lineId}`;
    const options = createRequestOptions('PUT', { quantity: quantity });

    return await sendRequest(url, options);
  },
};
