import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, page, device, browser } = body;

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ success: false, message: 'sessionId is required' }, { status: 400 });
    }

    // Privacy-first: We do NOT store IP addresses.
    // We only read optional country header provided by Vercel Edge (e.g. "SA", "YE", "AE")
    const country = request.headers.get('x-vercel-ip-country') || null;

    const normalizedPage = (page && typeof page === 'string' && page.length < 200) ? page : '/';
    const normalizedDevice = (device && typeof device === 'string' && device.length < 50) ? device : 'Desktop';
    const normalizedBrowser = (browser && typeof browser === 'string' && browser.length < 50) ? browser : 'Browser';

    const visit = await prisma.visitSession.upsert({
      where: { sessionId },
      update: {
        page: normalizedPage,
        lastPingAt: new Date(),
      },
      create: {
        sessionId,
        page: normalizedPage,
        device: normalizedDevice,
        browser: normalizedBrowser,
        country: country ? country.toUpperCase() : null,
        durationSeconds: 0,
        startedAt: new Date(),
        lastPingAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, sessionId: visit.sessionId });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
