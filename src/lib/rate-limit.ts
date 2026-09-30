import { prisma } from './prisma';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number; // in milliseconds
  blockDurationMs?: number; // lock duration if exceeded
}

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

export function checkMemoryRateLimit(
  key: string,
  config: RateLimitConfig = { maxAttempts: 5, windowMs: 60 * 1000 }
): { allowed: boolean; remaining: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || entry.expiresAt < now) {
    memoryStore.set(key, { count: 1, expiresAt: now + config.windowMs });
    return { allowed: true, remaining: config.maxAttempts - 1 };
  }

  if (entry.count >= config.maxAttempts) {
    const retryAfterSeconds = Math.ceil((entry.expiresAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true, remaining: config.maxAttempts - entry.count };
}

export async function checkLoginRateLimit(
  ip: string,
  username: string
): Promise<{ allowed: boolean; message?: string }> {
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION_MINUTES = 15;
  const now = new Date();

  const attempt = await prisma.loginAttempt.findUnique({
    where: { ip_username: { ip, username } },
  });

  if (attempt && attempt.blockedUntil && attempt.blockedUntil > now) {
    const remainingMinutes = Math.ceil(
      (attempt.blockedUntil.getTime() - now.getTime()) / (1000 * 60)
    );
    return {
      allowed: false,
      message: `تم حظر المحاولات مؤقتاً لأسباب أمنية. يرجى المحاولة بعد ${remainingMinutes} دقيقة.`,
    };
  }

  return { allowed: true };
}

export async function recordFailedLogin(ip: string, username: string) {
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION_MINUTES = 15;
  const now = new Date();

  const attempt = await prisma.loginAttempt.findUnique({
    where: { ip_username: { ip, username } },
  });

  if (!attempt) {
    await prisma.loginAttempt.create({
      data: {
        ip,
        username,
        attempts: 1,
      },
    });
    return;
  }

  const newAttempts = attempt.attempts + 1;
  let blockedUntil: Date | null = null;

  if (newAttempts >= MAX_ATTEMPTS) {
    blockedUntil = new Date(now.getTime() + BLOCK_DURATION_MINUTES * 60 * 1000);
  }

  await prisma.loginAttempt.update({
    where: { id: attempt.id },
    data: {
      attempts: newAttempts,
      blockedUntil,
    },
  });
}

export async function resetLoginAttempts(ip: string, username: string) {
  try {
    await prisma.loginAttempt.deleteMany({
      where: { ip, username },
    });
  } catch {
    // Ignore if not found
  }
}
