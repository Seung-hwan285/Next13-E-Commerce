import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';
import { ProductAPI } from '@/lib/product';

function formatErrorMessage(err: Error): string {
  // 모든 키 반환
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    return NextResponse.json({ status: 204 });
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }

  return NextResponse.json({ status: 500 });
}

export async function PUT(req: NextRequest): Promise<Response> {
  try {
    const headers = req.headers;
    const { productId, image } = await req.json();

    // const data = await ProductAPI.updateProduct(productId, image);

    return NextResponse.json({ data });
    // await ProductAPI.updateProduct(productId, image);
    // const { searchParams } = new URL(req.url);
    // const { product_id } = searchParams.get('product_id');
    // const { variant_id } = searchParams.get('variant_id');
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}
