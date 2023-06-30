// type optionsType = {
//   method: string;
//   body?: string;
// };
//
// const createRequestOptions = (method, body): optionsType => {
//   return {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Authorization': process.env.NEXT_PUBLIC_SHOP_KEY,
//     },
//     body: JSON.stringify(body),
//   };
// };
//
// const sendRequest = async (url, options) => {
//   const response = await fetch(url, options);
//   if (response.ok) {
//     return await response.json();
//   }
// };
//
// export const ProductAPI = {
//   getAllProducts: async () => {
//     try {
//       const options = createRequestOptions('GET', '');
//       const url = `${process.env.NEXT_PUBLIC_URL}/v1/products`;
//
//       return await sendRequest(url, options);
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';

function formatErrorMessage(err: Error): string {
  // all object key return keys
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data;
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }

  return NextResponse.json({ status: 500 });
}
