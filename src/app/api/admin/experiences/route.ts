import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { experienceSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
    return successResponse(experiences);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء جلب الخبرات', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = experienceSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { title, organization, location, description, startDate, endDate, isCurrent, sortOrder } =
      parseResult.data;

    const exp = await prisma.experience.create({
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

    return successResponse(exp, 'تم إضافة الخبرة بنجاح', 201);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء إضافة الخبرة', 500);
  }
}
