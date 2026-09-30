import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categorySchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText, slugify } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = categorySchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { name, slug, description, sortOrder } = parseResult.data;
    const safeSlug = slugify(slug || name);

    const existing = await prisma.category.findFirst({
      where: { slug: safeSlug, NOT: { id } },
    });
    if (existing) {
      return errorResponse('الـ Slug مستخدم مسبقاً', 400);
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: sanitizeText(name),
        slug: safeSlug,
        description: description ? sanitizeText(description) : null,
        sortOrder,
      },
    });

    return successResponse(updated, 'تم تحديث التصنيف بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء تحديث التصنيف', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return successResponse(null, 'تم حذف التصنيف بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء حذف التصنيف', 500);
  }
}
