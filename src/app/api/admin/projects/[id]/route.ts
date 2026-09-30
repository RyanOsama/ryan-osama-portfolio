import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText, sanitizeRichText, slugify } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        features: { orderBy: { sortOrder: 'asc' } },
        technologies: { include: { technology: true } },
      },
    });

    if (!project) {
      return errorResponse('المشروع غير موجود', 404);
    }

    return successResponse({
      ...project,
      technologies: project.technologies.map((t) => t.technology),
    });
  } catch (error) {
    console.error('Admin project get error:', error);
    return errorResponse('حدث خطأ أثناء جلب المشروع', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = projectSchema.safeParse(body);

    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const data = parseResult.data;
    const safeSlug = slugify(data.slug || data.title);

    // Check slug collision
    const existing = await prisma.project.findFirst({
      where: { slug: safeSlug, NOT: { id } },
    });
    if (existing) {
      return errorResponse('الـ Slug مستخدم لمشروع آخر', 400);
    }

    // Update project with transaction (features & technologies replacement)
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing features & tech links
      await tx.projectFeature.deleteMany({ where: { projectId: id } });
      await tx.projectTechnology.deleteMany({ where: { projectId: id } });

      return tx.project.update({
        where: { id },
        data: {
          title: sanitizeText(data.title),
          slug: safeSlug,
          shortDescription: sanitizeText(data.shortDescription),
          description: sanitizeRichText(data.description),
          problem: data.problem ? sanitizeRichText(data.problem) : null,
          solution: data.solution ? sanitizeRichText(data.solution) : null,
          categoryId: data.categoryId || null,
          coverImage: data.coverImage,
          liveUrl: data.liveUrl || null,
          githubUrl: data.githubUrl || null,
          status: data.status,
          isFeatured: data.isFeatured,
          sortOrder: data.sortOrder,
          features: {
            create: data.features.map((f, idx) => ({
              title: sanitizeText(f.title),
              description: f.description ? sanitizeText(f.description) : null,
              sortOrder: f.sortOrder ?? idx,
            })),
          },
          technologies: {
            create: data.technologyIds.map((techId) => ({
              technologyId: techId,
            })),
          },
        },
        include: {
          category: true,
          technologies: { include: { technology: true } },
          features: true,
        },
      });
    });

    return successResponse(updated, 'تم تحديث المشروع بنجاح');
  } catch (error) {
    console.error('Admin project update error:', error);
    return errorResponse('حدث خطأ أثناء تحديث المشروع', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return errorResponse('المشروع غير موجود', 404);
    }

    await prisma.project.delete({ where: { id } });

    return successResponse(null, 'تم حذف المشروع بنجاح');
  } catch (error) {
    console.error('Admin project delete error:', error);
    return errorResponse('حدث خطأ أثناء حذف المشروع', 500);
  }
}
