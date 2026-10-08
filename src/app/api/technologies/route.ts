import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';
import { slugify } from '@/lib/sanitize';

export async function GET() {
  try {
    // Automatically sync skills into technologies so they can be assigned to projects
    try {
      const skills = await prisma.skill.findMany();
      for (const skill of skills) {
        const slug = slugify(skill.name);
        if (slug) {
          await prisma.technology.upsert({
            where: { slug },
            update: {
              name: skill.name,
              category: skill.category || 'General',
            },
            create: {
              name: skill.name,
              slug,
              icon: skill.icon || null,
              category: skill.category || 'General',
              sortOrder: skill.sortOrder || 0,
            },
          }).catch(() => {});
        }
      }
    } catch (syncErr) {
      console.warn('Skills sync warning:', syncErr);
    }

    const technologies = await prisma.technology.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return successResponse(technologies);
  } catch (error) {
    console.error('Technologies fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب التقنيات', 500);
  }
}
