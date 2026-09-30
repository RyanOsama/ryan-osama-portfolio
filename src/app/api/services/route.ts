import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return successResponse(services);
  } catch (error) {
    console.error('Services fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب الخدمات', 500);
  }
}
