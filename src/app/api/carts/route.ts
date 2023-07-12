import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';
import { ProductAPI } from '@/lib/product';
import { CartAPI } from '@/lib/cart';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

// POST는 잘들어간다. req값이
export async function POST(req: NextRequest): Promise<Response> {
  const { cartId, lineId } = await req.json();

  console.log(cartId);

  try {
    // TODO..

    return NextResponse.json(result);
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }

  return NextResponse.json({ status: 500 });
}

// DELETE는 안들어감  WHY?
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

// DELETE는 안들어감  WHY?
export async function PUT(req: NextRequest): Promise<Response> {
  try {
    const { cartId, lineId, quantity } = await req.json();

    console.log(quantity);
    await CartAPI.updateCartItem(cartId, lineId, quantity);

    return NextResponse.json({ status: 204 });
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}
