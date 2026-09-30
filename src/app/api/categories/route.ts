import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });
    return successResponse(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب التصنيفات', 500);
  }
}
