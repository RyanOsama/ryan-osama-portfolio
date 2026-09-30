import { getAdminSession } from '@/lib/session';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return errorResponse('غير مسجل الدخول', 401);
  }
  return successResponse({ id: session.id, username: session.username });
}
