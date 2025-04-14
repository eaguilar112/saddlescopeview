import { NextResponse } from 'next/server';
import { isAdmin } from '@/app/actions';

export async function GET() {
  const admin = await isAdmin();
  return NextResponse.json({ isAdmin: admin });
}
