"use server";
import { CartAPI } from "@/lib/cart";

import { cookies } from "next/headers";

export const addCartItem = async (formData: any): Promise<string> => {
  const id = formData.get("product_id");

  if (!id) {
    return "error";
  }

  try {
    await CartAPI.addCartItem(id);
  } catch (err) {
    return "error";
  }
};

export const deleteCartItem = async (cartId: string, lineId: string) => {
  if (!cartId || !lineId) {
    return "error";
  }

  try {
    await CartAPI.deleteCartItem(cartId, lineId);
  } catch (err) {
    return "error";
  }
};

export const putLikeButton = async (data) => {
  const { cartId, lineId, quantity } = data;

  if (!cartId || !lineId) {
    return "error";
  }

  try {
    await CartAPI.updateCartItem(cartId, lineId, quantity);
  } catch (err) {
    return "error";
  }
};

export async function setCookieComponent() {
  const cookieStore = cookies().get("cartId")?.value;

  if (!cookieStore) {
    const cookie = await CartAPI.createCart();
    cookies().set("cartId", cookie.id);
  }
}
