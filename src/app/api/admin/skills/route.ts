import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { skillSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ sortOrder: 'asc' }, { level: 'desc' }],
    });
    return successResponse(skills);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء جلب المهارات', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = skillSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { name, category, icon, level, sortOrder, isActive } = parseResult.data;

    const skill = await prisma.skill.create({
      data: {
        name: sanitizeText(name),
        category: sanitizeText(category),
        icon: icon || null,
        level,
        sortOrder,
        isActive,
      },
    });

    return successResponse(skill, 'تم إضافة المهارة بنجاح', 201);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء إضافة المهارة', 500);
  }
}
