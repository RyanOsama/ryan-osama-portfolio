import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { loginSchema, getZodErrorMessage } from '@/lib/validations';
import { createSessionToken, setAdminSessionCookie } from '@/lib/session';
import { checkLoginRateLimit, recordFailedLogin, resetLoginAttempts } from '@/lib/rate-limit';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const body = await request.json();

    const parseResult = loginSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { username, password } = parseResult.data;

    // Check rate limit and brute-force block
    const rateLimit = await checkLoginRateLimit(ip, username);
    if (!rateLimit.allowed) {
      return errorResponse(rateLimit.message || 'تم تجاوز الحد الأقصى للمحاولات.', 429);
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      await recordFailedLogin(ip, username);
      return errorResponse('اسم المستخدم أو كلمة المرور غير صحيحة.', 401);
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      await recordFailedLogin(ip, username);
      return errorResponse('اسم المستخدم أو كلمة المرور غير صحيحة.', 401);
    }

    // Reset failed attempts on success
    await resetLoginAttempts(ip, username);

    // Update last login timestamp
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session token and set cookie
    const token = await createSessionToken({ id: admin.id, username: admin.username });
    await setAdminSessionCookie(token);

    return successResponse({ username: admin.username }, 'تم تسجيل الدخول بنجاح');
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('حدث خطأ أثناء تسجيل الدخول', 500);
  }
}
