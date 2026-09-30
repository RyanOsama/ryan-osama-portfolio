import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serviceSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = serviceSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { title, description, icon, sortOrder, isActive } = parseResult.data;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: sanitizeText(title),
        description: sanitizeText(description),
        icon: icon || null,
        sortOrder,
        isActive,
      },
    });

    return successResponse(updated, 'تم تحديث الخدمة بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء تحديث الخدمة', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return successResponse(null, 'تم حذف الخدمة بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء حذف الخدمة', 500);
  }
}
