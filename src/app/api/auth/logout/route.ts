import { removeAdminSessionCookie } from '@/lib/session';
import { successResponse } from '@/lib/api-response';

export async function POST() {
  await removeAdminSessionCookie();
  return successResponse(null, 'تم تسجيل الخروج بنجاح');
}
