import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
    return successResponse(experiences);
  } catch (error) {
    console.error('Experiences fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب الخبرات', 500);
  }
}
