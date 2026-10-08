import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, durationSeconds, page } = body;

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const duration = typeof durationSeconds === 'number' && durationSeconds >= 0 ? Math.floor(durationSeconds) : 0;

    await prisma.visitSession.updateMany({
      where: { sessionId },
      data: {
        durationSeconds: duration,
        lastPingAt: new Date(),
        ...(page && typeof page === 'string' ? { page } : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ping error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
