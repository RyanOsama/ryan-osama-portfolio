import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categorySchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText, slugify } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { projects: true } } },
    });
    return successResponse(categories);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء جلب التصنيفات', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = categorySchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { name, slug, description, sortOrder } = parseResult.data;
    const safeSlug = slugify(slug || name);

    const existing = await prisma.category.findUnique({ where: { slug: safeSlug } });
    if (existing) {
      return errorResponse('الـ Slug مستخدم مسبقاً', 400);
    }

    const category = await prisma.category.create({
      data: {
        name: sanitizeText(name),
        slug: safeSlug,
        description: description ? sanitizeText(description) : null,
        sortOrder,
      },
    });

    return successResponse(category, 'تم إضافة التصنيف بنجاح', 201);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء إضافة التصنيف', 500);
  }
}
