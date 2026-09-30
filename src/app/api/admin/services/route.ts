import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serviceSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return successResponse(services);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء جلب الخدمات', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = serviceSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { title, description, icon, sortOrder, isActive } = parseResult.data;

    const service = await prisma.service.create({
      data: {
        title: sanitizeText(title),
        description: sanitizeText(description),
        icon: icon || null,
        sortOrder,
        isActive,
      },
    });

    return successResponse(service, 'تم إضافة الخدمة بنجاح', 201);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء إضافة الخدمة', 500);
  }
}
