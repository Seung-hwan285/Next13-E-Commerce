type optionType = {
  method: string;
  body?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

const createRequestOptions = (method, body): optionType => {
  const bodyObjects = body ? body : JSON.stringify(body);

  // 이전에 이거 안넣어서 계속 캐싱된 데이터가 패칭되는 현상 있었음
  // Next js SSR 기본적으로 캐싱기능을 지원해서 다양한 fetch 에 캐싱 핸들러 옵션이 장착되어 있음.

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
