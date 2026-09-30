import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText, sanitizeRichText, slugify } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        features: { orderBy: { sortOrder: 'asc' } },
        _count: {
          select: { reviews: true },
        },
      },
    });

    const formatted = projects.map((p) => ({
      ...p,
      technologies: p.technologies.map((t) => t.technology),
    }));

    return successResponse(formatted);
  } catch (error) {
    console.error('Admin projects fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب المشاريع', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = projectSchema.safeParse(body);

    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const data = parseResult.data;
    const safeSlug = slugify(data.slug || data.title);

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug: safeSlug },
    });
    if (existing) {
      return errorResponse('الـ Slug مستخدم لمشروع آخر، يرجى اختيار slug مختلف', 400);
    }

    const newProject = await prisma.project.create({
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

    return successResponse(newProject, 'تم إنشاء المشروع بنجاح', 201);
  } catch (error) {
    console.error('Admin project create error:', error);
    return errorResponse('حدث خطأ أثناء إنشاء المشروع', 500);
  }
}
