import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return successResponse(technologies);
  } catch (error) {
    console.error('Technologies fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب التقنيات', 500);
  }
}
