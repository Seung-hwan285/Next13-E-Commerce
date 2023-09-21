import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';
import { CartAPI } from '@/lib/cart';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function GET(): Promise<Response> {
  try {
    // return NextResponse.json(cookie);
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}

// export async function POST(req: NextRequest): Promise<Response> {
//   const { cartId, lineId } = await req.json();
//
//   try {
//   } catch (err) {
//     if (isRoutesError(err)) {
//       return NextResponse.json({ message: formatErrorMessage(err.message) });
//     }
//   }
//
//   return NextResponse.json({ status: 500 });
// }

export async function DELETE(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const cartId = searchParams.get('cartId');

  const lineId = searchParams.get('lineId');

  if (!cartId || !lineId) {
    return NextResponse.json({ error: '에러입니다.' }, { status: 400 });
  }

  try {
    await CartAPI.deleteCartItem(cartId, lineId);

    return NextResponse.json({ status: 204 });
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}

export async function PUT(req: NextRequest): Promise<Response> {
  try {
    const { cartId, lineId, quantity } = await req.json();

    await CartAPI.updateCartItem(cartId, lineId, quantity);

    return NextResponse.json({ status: 204 });
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}
