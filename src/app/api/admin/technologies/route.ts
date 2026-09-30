import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { technologySchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText, slugify } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return successResponse(technologies);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء جلب التقنيات', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = technologySchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { name, slug, icon, category, sortOrder } = parseResult.data;
    const safeSlug = slugify(slug || name);

    const existing = await prisma.technology.findUnique({ where: { slug: safeSlug } });
    if (existing) {
      return errorResponse('الـ Slug مستخدم مسبقاً', 400);
    }

    const tech = await prisma.technology.create({
      data: {
        name: sanitizeText(name),
        slug: safeSlug,
        icon: icon || null,
        category: category || 'General',
        sortOrder,
      },
    });

    return successResponse(tech, 'تم إضافة التقنية بنجاح', 201);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء إضافة التقنية', 500);
  }
}
