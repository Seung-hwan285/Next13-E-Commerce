import { NextRequest, NextResponse } from 'next/server';
import { isRoutesError } from '@/lib/type-guards/isRoutesError';

function formatErrorMessage(err: Error): string {
  // 모든 키 반환
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // TODO..
  } catch (err) {
    if (isRoutesError(err)) {
      return NextResponse.json({ message: formatErrorMessage(err.message) });
    }
  }

  return NextResponse.json({ status: 500 });
}
