import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { level: 'desc' }],
    });
    return successResponse(skills);
  } catch (error) {
    console.error('Skills fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب المهارات', 500);
  }
}
