import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'development' ? ['http://localhost:3001'] : null;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const origin = request.headers.get('origin');

  if (origin && !allowedOrigins?.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'bad request',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  return response;
}

export { default } from 'next-auth/middleware';
export const config = { matcher: ['/api', '/about'] };
