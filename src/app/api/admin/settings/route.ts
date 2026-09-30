import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeText } from '@/lib/sanitize';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    return successResponse(settingsMap);
  } catch (error) {
    return errorResponse('حدث خطأ أثناء جلب إعدادات الموقع', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (typeof body !== 'object' || body === null) {
      return errorResponse('بيانات الإعدادات غير صالحة', 400);
    }

    const updates = Object.entries(body).map(([key, value]) => {
      const stringValue = typeof value === 'string' ? value : String(value ?? '');
      return prisma.siteSetting.upsert({
        where: { key },
        update: { value: sanitizeText(stringValue) },
        create: { key, value: sanitizeText(stringValue), group: 'general' },
      });
    });

    await prisma.$transaction(updates);

    return successResponse(body, 'تم حفظ الإعدادات بنجاح');
  } catch (error) {
    console.error('Settings update error:', error);
    return errorResponse('حدث خطأ أثناء حفظ الإعدادات', 500);
  }
}
