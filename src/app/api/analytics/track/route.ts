import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { visitorToken, sessionId, page, device, browser } = body;

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ success: false, message: 'sessionId is required' }, { status: 400 });
    }

    const vToken = (visitorToken && typeof visitorToken === 'string') ? visitorToken : sessionId;

    // Privacy-first: We do NOT store IP addresses.
    const country = request.headers.get('x-vercel-ip-country') || null;

    const normalizedPage = (page && typeof page === 'string' && page.length < 200) ? page : '/';
    const normalizedDevice = (device && typeof device === 'string' && device.length < 50) ? device : 'Desktop';
    const normalizedBrowser = (browser && typeof browser === 'string' && browser.length < 50) ? browser : 'Browser';

    // Check if session already exists
    const existingSession = await prisma.visitSession.findUnique({
      where: { sessionId },
    });

    if (existingSession) {
      await prisma.visitSession.update({
        where: { sessionId },
        data: {
          page: normalizedPage,
          lastPingAt: new Date(),
        },
      });
      return NextResponse.json({ success: true, visitCount: existingSession.visitCount });
    }

    // New visit session: count how many times this specific person (visitorToken) visited before
    const previousVisits = await prisma.visitSession.count({
      where: { visitorToken: vToken },
    });
    const visitCount = previousVisits + 1;

    const visit = await prisma.visitSession.create({
      data: {
        visitorToken: vToken,
        sessionId,
        visitCount,
        page: normalizedPage,
        device: normalizedDevice,
        browser: normalizedBrowser,
        country: country ? country.toUpperCase() : null,
        durationSeconds: 0,
        startedAt: new Date(),
        lastPingAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, sessionId: visit.sessionId, visitCount: visit.visitCount });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
