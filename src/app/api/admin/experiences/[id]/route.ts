import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { experienceSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = experienceSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { title, organization, location, description, startDate, endDate, isCurrent, sortOrder } =
      parseResult.data;

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        title: sanitizeText(title),
        organization: sanitizeText(organization),
        location: location ? sanitizeText(location) : null,
        description: sanitizeText(description),
        startDate: new Date(startDate),
        endDate: isCurrent || !endDate ? null : new Date(endDate),
        isCurrent,
        sortOrder,
      },
    });

    return successResponse(updated, 'تم تحديث الخبرة بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء تحديث الخبرة', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.experience.delete({ where: { id } });
    return successResponse(null, 'تم حذف الخبرة بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء حذف الخبرة', 500);
  }
}
