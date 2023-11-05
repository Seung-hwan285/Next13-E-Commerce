import { isRoutesError } from '@/lib/type-guards/isRoutesError';
import { NextResponse } from 'next/server';
import { ProductAPI } from '@/lib/product';

export const runtime = 'edge';
function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function GET(): Promise<Response> {
  try {
    const data = await ProductAPI.getCategories();
    return NextResponse.json({ data });
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }
}
