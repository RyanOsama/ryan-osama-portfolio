import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return errorResponse('Slug غير محدد', 400);
    }

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        features: { orderBy: { sortOrder: 'asc' } },
        technologies: {
          include: { technology: true },
          orderBy: { technology: { sortOrder: 'asc' } },
        },
        reviews: {
          where: { status: 'approved' },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    });

    if (!project) {
      return errorResponse('المشروع غير موجود', 404);
    }

    const totalRating = project.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = project.reviews.length > 0 ? (totalRating / project.reviews.length).toFixed(1) : '5.0';

    const formatted = {
      ...project,
      technologies: project.technologies.map((t) => t.technology),
      averageRating: Number(averageRating),
      reviewsCount: project.reviews.length,
    };

    return successResponse(formatted);
  } catch (error) {
    console.error('Project details fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب تفاصيل المشروع', 500);
  }
}
