"use server";

import { cookies } from "next/headers";
import { CartAPI } from "@/lib/cart";

export async function setCookie() {
  const cookieStore = cookies().get("cartId")?.value;

  if (!cookieStore) {
    const cookie = await CartAPI.createCart();
    cookies().set("cartId", cookie.id);
  }
}
