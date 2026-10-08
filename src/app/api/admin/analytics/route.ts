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
      recentVisits,
      durationAggregate,
      todayVisitsList,
      allUniqueGroups,
      todayUniqueGroups,
      activeNow,
    ] = await Promise.all([
      prisma.visitSession.count(),
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
      prisma.visitSession.groupBy({
        by: ['visitorToken'],
        _count: { id: true },
      }),
      prisma.visitSession.groupBy({
        by: ['visitorToken'],
        where: { startedAt: { gte: todayStart } },
      }),
      prisma.visitSession.count({
        where: {
          lastPingAt: { gte: activeThreshold },
        },
      }),
    ]);

    // Map of visitorToken to their total visits count
    const visitorTotalMap = new Map<string, number>();
    for (const g of allUniqueGroups) {
      if (g.visitorToken) {
        visitorTotalMap.set(g.visitorToken, g._count.id);
      }
    }

    // Assign consistent short visitor numbers (e.g. Visitor #1, Visitor #2)
    const visitorOrderMap = new Map<string, number>();
    let visitorCounter = 1;

    // Get earliest visits to number visitors chronologically
    const earliestVisits = await prisma.visitSession.findMany({
      select: { visitorToken: true },
      orderBy: { startedAt: 'asc' },
    });

    for (const v of earliestVisits) {
      if (v.visitorToken && !visitorOrderMap.has(v.visitorToken)) {
        visitorOrderMap.set(v.visitorToken, visitorCounter++);
      }
    }

    // Attach totalVisitsByVisitor and visitorNumber to recent visits
    const enhancedRecentVisits = recentVisits.map((v) => {
      const vToken = v.visitorToken || v.sessionId;
      return {
        ...v,
        visitorNumber: visitorOrderMap.get(vToken) || 1,
        totalVisitsByThisPerson: visitorTotalMap.get(vToken) || v.visitCount || 1,
      };
    });

    // Calculate hourly distribution for today (0-23)
    const hourlyVisits = Array(24).fill(0);
    for (const v of todayVisitsList) {
      const hour = new Date(v.startedAt).getHours();
      hourlyVisits[hour]++;
    }

    return successResponse({
      totalVisits, // Total sessions/visits
      uniqueVisitors: allUniqueGroups.length, // Total distinct people
      todayUniqueVisitors: todayUniqueGroups.length, // Distinct people today
      todayVisits: todayVisitsList.length, // Total sessions today
      activeNow,
      avgDurationSeconds: Math.round(durationAggregate._avg.durationSeconds || 0),
      recentVisits: enhancedRecentVisits,
      hourlyVisits,
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    return errorResponse('فشل في جلب إحصائيات الزوار', 500);
  }
}
