import { checkUrl } from '@/lib/utils/checkUrl';

type optionType = {
  method: string;
  body?: string;
  obj?: {
    cache: boolean;
  };
};

type Obj = {
  o_sortBy: string | string[] | undefined;
  o_limit: string | string[] | undefined;
  o_page: string | string[] | undefined;
};

const baseUrl = checkUrl(process.env.NEXT_PUBLIC_URL);

const createRequestOptions = (method, obj?, body?): optionType => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const isCache = obj?.cache ? 'force-cache' : 'no-store';

  const requesetOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
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
      throw new Error('Error');
    }
    return await response.json();
  } catch (err) {
    // const error = getProperError(err);
    console.error(err);
  }
};

export const ProductAPI = {
  getAllProducts: async (number?: number) => {
    const options = createRequestOptions('GET');
    const url = `${baseUrl}/v1/products?limit=${number}`;

    const result = await sendRequest(url, options);

    const { total } = result.meta.pagination;

    const per_page = 5;

    return {
      result,
      total,
      per_page,
    };
  },

  getNextPage: async (obj: Obj) => {
    const { o_page, o_limit, o_sortBy } = obj;

    const options = createRequestOptions('GET');

    const defaultOption = {
      limit: o_limit,
      page: o_page,
    };

    const urlOptions = [
      { limit: o_limit, page: o_page, sortBy: 'name' },
      { limit: o_limit, page: o_page, sortBy: 'price' },
      { limit: o_limit, page: o_page, sortBy: 'asc' },
      { limit: o_limit, page: o_page, sortBy: 'desc' },
      { limit: o_limit, page: o_page, sortBy: 'updated_at' },
    ];

    const findOptions =
      urlOptions.find((option) => option.sortBy === o_sortBy) || defaultOption;

    console.log(findOptions);

    const { limit, page, sortBy } = findOptions;

    const url = limit
      ? `${baseUrl}/v1/products?limit=${limit}&page=${page}&sortBy=${sortBy}`
      : `${baseUrl}/v1/products?limit=5&page=${page}`;

    const result = await sendRequest(url, options);

    const { total } = result.meta.pagination;
    const per_page = limit ? limit : 5;

    return {
      result,
      total,
      per_page,
    };
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

  // sort
  // -name
  // -price
  // -created
};
