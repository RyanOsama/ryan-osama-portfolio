import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reviewSubmitSchema, getZodErrorMessage } from '@/lib/validations';
import { sanitizeText } from '@/lib/sanitize';
import { checkMemoryRateLimit } from '@/lib/rate-limit';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    const where: any = { status: 'approved' };
    if (projectId) {
      where.projectId = projectId;
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        projectId: true,
        name: true,
        rating: true,
        comment: true,
        createdAt: true,
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return successResponse(reviews);
  } catch (error) {
    console.error('Public reviews fetch error:', error);
    return errorResponse('حدث خطأ أثناء جلب التقييمات', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Rate limit: max 3 reviews per 10 minutes per IP
    const rateLimit = checkMemoryRateLimit(`review_${ip}`, {
      maxAttempts: 3,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return errorResponse(
        `لقد قمت بإرسال عدة تقييمات مؤخراً. يرجى الانتظار ${rateLimit.retryAfterSeconds} ثانية قبل المحاولة مجدداً.`,
        429
      );
    }

    const body = await request.json();
    const parseResult = reviewSubmitSchema.safeParse(body);

    if (!parseResult.success) {
      return errorResponse(getZodErrorMessage(parseResult.error), 422);
    }

    const { projectId, name, email, rating, comment } = parseResult.data;

    // Sanitize text against XSS/injection
    const safeName = sanitizeText(name);
    const safeComment = sanitizeText(comment);
    const safeEmail = email ? sanitizeText(email) : null;

    if (projectId) {
      const projectExists = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!projectExists) {
        return errorResponse('المشروع المحدد غير موجود', 404);
      }
    }

    const newReview = await prisma.review.create({
      data: {
        projectId: projectId || null,
        name: safeName,
        email: safeEmail,
        rating,
        comment: safeComment,
        status: 'approved', // Immediately approved as requested
      },
    });

    return successResponse(
      { id: newReview.id, status: newReview.status },
      'شكراً لك! تم إرسال تقييمك ونشره بنجاح.'
    );
  } catch (error) {
    console.error('Review submit error:', error);
    return errorResponse('حدث خطأ أثناء إرسال التقييم', 500);
  }
}
