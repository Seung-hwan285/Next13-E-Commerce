import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';

export const runtime = 'edge';
function formatErrorMessage(err: Error): string {
  // 모든 키 반환
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(): Promise<Response> {
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
    // // const data = await ProductAPI.updateProduct(productId, image);
    //
    // return NextResponse.json({ data });
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}
