import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { technologySchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText, slugify } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = technologySchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { name, slug, icon, category, sortOrder } = parseResult.data;
    const safeSlug = slugify(slug || name);

    const existing = await prisma.technology.findFirst({
      where: { slug: safeSlug, NOT: { id } },
    });
    if (existing) {
      return errorResponse('الـ Slug مستخدم مسبقاً', 400);
    }

    const updated = await prisma.technology.update({
      where: { id },
      data: {
        name: sanitizeText(name),
        slug: safeSlug,
        icon: icon || null,
        category: category || 'General',
        sortOrder,
      },
    });

    return successResponse(updated, 'تم تحديث التقنية بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء تحديث التقنية', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.technology.delete({ where: { id } });
    return successResponse(null, 'تم حذف التقنية بنجاح');
  } catch (error) {
    return errorResponse('حدث خطأ أثناء حذف التقنية', 500);
  }
}
