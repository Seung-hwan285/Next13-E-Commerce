import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';
import { ProductAPI } from '@/lib/requestApi/product';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    // TODO..

    const data = await ProductAPI.getCartItems();
    const result = await data.json();
    console.log(result);

    return NextResponse.json(result);
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }

  return NextResponse.json({ status: 500 });
}
