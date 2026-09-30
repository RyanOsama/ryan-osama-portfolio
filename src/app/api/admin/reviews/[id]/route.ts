import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reviewStatusSchema, getZodErrorMessage } from '@/lib/validations';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = reviewStatusSchema.safeParse(body);

    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return errorResponse('التعليق غير موجود', 404);
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { status: parseResult.data.status },
    });

    return successResponse(updated, `تم تحديث حالة التعليق إلى ${parseResult.data.status}`);
  } catch (error) {
    console.error('Admin review status update error:', error);
    return errorResponse('حدث خطأ أثناء تحديث حالة التعليق', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return errorResponse('التعليق غير موجود', 404);
    }

    await prisma.review.delete({ where: { id } });
    return successResponse(null, 'تم حذف التعليق بنجاح');
  } catch (error) {
    console.error('Admin review delete error:', error);
    return errorResponse('حدث خطأ أثناء حذف التعليق', 500);
  }
}
