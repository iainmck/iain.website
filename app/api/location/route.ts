import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/functions'

export async function GET(request: Request) {
  const { city } = geolocation(request)

  return NextResponse.json({ city })
}
