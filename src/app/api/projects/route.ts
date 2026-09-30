import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const featuredOnly = searchParams.get('featured') === 'true';

    const where: any = {};
    if (featuredOnly) {
      where.isFeatured = true;
    }
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        category: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        _count: {
          select: {
            reviews: { where: { status: 'approved' } },
          },
        },
      },
    });

    const formatted = projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      shortDescription: p.shortDescription,
      coverImage: p.coverImage,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      status: p.status,
      isFeatured: p.isFeatured,
      sortOrder: p.sortOrder,
      category: p.category,
      technologies: p.technologies.map((t) => t.technology),
      approvedReviewsCount: p._count.reviews,
      createdAt: p.createdAt,
    }));

    return successResponse(formatted);
  } catch (error) {
    console.error('Projects fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب المشاريع', 500);
  }
}
