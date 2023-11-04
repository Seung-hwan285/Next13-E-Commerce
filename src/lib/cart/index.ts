import { getCookie } from "@/lib/utils/cookies";
import { getProperError } from "next/dist/lib/is-error";

type optionType = {
  method: string;
  body?: string;
};
const baseUrl = process.env.NEXT_PUBLIC_URL;

const createRequestOptions = (method, body): optionType => {
  const bodyObjects = body ? JSON.stringify(body) : body;

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": process.env.NEXT_PUBLIC_SHOP_KEY,
    },
    cache: "no-store",
    body: undefined,
  };

  if (bodyObjects) {
    requestOptions.body = bodyObjects;
  }

  return requestOptions;
};

const sendRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Request Error");
    }
    return await response.json();
  } catch (err) {
    const error = getProperError(err);
    console.error(error);
  }
};

export const CartAPI = {
  deleteCartItem: async (cartId, lineId) => {
    const url = `${baseUrl}/v1/carts/${cartId}/items/${lineId}`;
    const options = createRequestOptions("DELETE", "");
    return await sendRequest(url, options);
  },

  updateCartItem: async (cartId, lineId, quantity) => {
    const url = `${baseUrl}/v1/carts/${cartId}/items/${lineId}`;

    const body = {
      quantity: quantity,
    };

    const options = createRequestOptions("PUT", body);
    const res = await sendRequest(url, options);

    return res;
  },

  addCartItem: async (id?: string) => {
    const cookie = getCookie("cartId");

    const url = `${baseUrl}/v1/carts/${cookie}`;

    const body = {
      id: id,
      quality: 1,
    };

    const options = createRequestOptions("POST", body);

    return await sendRequest(url, options);
  },

  getCartItems: async (cookie: string | undefined) => {
    const options = createRequestOptions("GET", "");
    const url = `${baseUrl}/v1/carts/${cookie}`;
    return await sendRequest(url, options);
  },

  createCart: async () => {
    const url = `${baseUrl}/v1/carts`;
    const options = createRequestOptions("GET", "");
    return await sendRequest(url, options);
  },
};
