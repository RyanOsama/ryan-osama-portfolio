import { prisma } from '@/lib/prisma';
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
    console.error('Settings fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب إعدادات الموقع', 500);
  }
}
