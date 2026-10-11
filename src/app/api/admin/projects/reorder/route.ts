import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectIds, updates } = body;

    if (Array.isArray(projectIds) && projectIds.length > 0) {
      await prisma.$transaction(
        projectIds.map((id: string, index: number) =>
          prisma.project.update({
            where: { id },
            data: { sortOrder: index },
          })
        )
      );

      return successResponse(null, 'تم تحديث ترتيب المشاريع بنجاح');
    }

    if (Array.isArray(updates) && updates.length > 0) {
      await prisma.$transaction(
        updates.map((item: { id: string; sortOrder: number }) =>
          prisma.project.update({
            where: { id: item.id },
            data: { sortOrder: item.sortOrder },
          })
        )
      );

      return successResponse(null, 'تم تحديث ترتيب المشاريع بنجاح');
    }

    return errorResponse('بيانات الترتيب غير صالحة', 400);
  } catch (error) {
    console.error('Projects reorder error:', error);
    return errorResponse('حدث خطأ أثناء تحديث ترتيب المشاريع', 500);
  }
}
