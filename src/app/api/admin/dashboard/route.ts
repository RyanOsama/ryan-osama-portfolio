import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalReviews,
      pendingReviews,
      approvedReviews,
      totalServices,
      totalSkills,
      recentReviews,
      recentProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { isFeatured: true } }),
      prisma.review.count(),
      prisma.review.count({ where: { status: 'pending' } }),
      prisma.review.count({ where: { status: 'approved' } }),
      prisma.service.count(),
      prisma.skill.count(),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { project: { select: { title: true } } },
      }),
      prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
    ]);

    // Average rating calculation
    const ratingAggregation = await prisma.review.aggregate({
      where: { status: 'approved' },
      _avg: { rating: true },
    });

    const averageRating = ratingAggregation._avg.rating
      ? Number(ratingAggregation._avg.rating.toFixed(1))
      : 5.0;

    return successResponse({
      stats: {
        totalProjects,
        featuredProjects,
        totalReviews,
        pendingReviews,
        approvedReviews,
        totalServices,
        totalSkills,
        averageRating,
      },
      recentReviews,
      recentProjects,
    });
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    return errorResponse('حدث خطأ أثناء تحميل إحصائيات لوحة التحكم', 500);
  }
}
