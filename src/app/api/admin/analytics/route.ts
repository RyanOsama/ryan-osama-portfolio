import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const activeThreshold = new Date(Date.now() - 90 * 1000); // active within last 90 seconds

    const [
      totalVisits,
      todayVisits,
      activeNow,
      recentVisits,
      durationAggregate,
      todayVisitsList,
    ] = await Promise.all([
      prisma.visitSession.count(),
      prisma.visitSession.count({
        where: {
          startedAt: { gte: todayStart },
        },
      }),
      prisma.visitSession.count({
        where: {
          lastPingAt: { gte: activeThreshold },
        },
      }),
      prisma.visitSession.findMany({
        take: 100,
        orderBy: { startedAt: 'desc' },
      }),
      prisma.visitSession.aggregate({
        _avg: { durationSeconds: true },
      }),
      prisma.visitSession.findMany({
        where: { startedAt: { gte: todayStart } },
        select: { startedAt: true },
      }),
    ]);

    // Calculate hourly distribution for today (0-23)
    const hourlyVisits = Array(24).fill(0);
    for (const v of todayVisitsList) {
      const hour = new Date(v.startedAt).getHours();
      hourlyVisits[hour]++;
    }

    return successResponse({
      totalVisits,
      todayVisits,
      activeNow,
      avgDurationSeconds: Math.round(durationAggregate._avg.durationSeconds || 0),
      recentVisits,
      hourlyVisits,
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    return errorResponse('فشل في جلب إحصائيات الزوار', 500);
  }
}
