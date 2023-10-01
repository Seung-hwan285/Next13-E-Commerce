import { checkUrl } from '@/lib/utils/checkUrl';
import { Option } from '@/lib/types/product';
import { getProperError } from 'next/dist/lib/is-error';

const baseUrl = checkUrl(process.env.NEXT_PUBLIC_URL);

const createRequestOptions = (method, obj?, body?): Option => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const isCache = obj?.cache ? 'force-cache' : 'no-store';

  const requesetOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': process.env.NEXT_PUBLIC_SECRET_KEY,
    },
    cache: isCache,
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
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Request Error');
    }
    return await response.json();
  } catch (err) {
    const error = getProperError(err);
    console.error(error);
  }
};

export const DiscountAPI = {
  getDisCount: async () => {
    const url = `${baseUrl}/v1/discounts`;
    const options = createRequestOptions('GET');

    return await sendRequest(url, options);
  },
};
