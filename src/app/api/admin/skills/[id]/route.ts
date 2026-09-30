import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { skillSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = skillSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { name, category, icon, level, sortOrder, isActive } = parseResult.data;

    const updated = await prisma.skill.update({
      where: { id },
      data: {
        name: sanitizeText(name),
        category: sanitizeText(category),
        icon: icon || null,
        level,
        sortOrder,
        isActive,
      },
    });

    return successResponse(updated, 'تم تحديث المهارة بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء تحديث المهارة', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.skill.delete({ where: { id } });
    return successResponse(null, 'تم حذف المهارة بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء حذف المهارة', 500);
  }
}
