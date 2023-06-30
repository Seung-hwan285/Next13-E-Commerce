type optionType = {
  method: string;
  body?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

const createRequestOptions = (method, body): optionType => {
  const bodyObjects = body ? body : JSON.stringify(body);

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
    },
    bodyObjects,
    cache: 'no-store',
  };
};

const sendRequest = async (url, options) => {
  const response = await fetch(url, options);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const ProductAPI = {
  getAllProducts: async () => {
    try {
      const options = createRequestOptions('GET', '');
      const url = `${baseUrl}/v1/products`;

      return await sendRequest(url, options);
    } catch (err) {
      console.error(err);
    }
  },
};
