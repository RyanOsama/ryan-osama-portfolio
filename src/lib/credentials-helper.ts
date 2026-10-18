/**
 * Helper to store and extract project demo login credentials / testing notes
 * safely within existing project description text without requiring database schema changes.
 */

export interface ParsedCredentials {
  raw: string;
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
}

export function parseCredentialDetails(creds: string | null | undefined): ParsedCredentials | null {
  if (!creds || !creds.trim()) return null;
  const raw = creds.trim();

  const phoneMatch = raw.match(/(?:phone|mobile|tel|هاتف|رقم(?:\s*الهاتف)?)\s*[:=]\s*([^\s\n\r]+)/i);
  const emailMatch = raw.match(/(?:email|بريد(?:\s*إلكتروني)?)\s*[:=]\s*([^\s\n\r]+)/i);
  const userMatch = raw.match(/(?:username|user|المستخدم|اسم\s*المستخدم)\s*[:=]\s*([^\s\n\r]+)/i);
  const passMatch = raw.match(/(?:password|pass|كلمة\s*المرور|السر)\s*[:=]\s*([^\s\n\r]+)/i);

  return {
    raw,
    phone: phoneMatch ? phoneMatch[1] : undefined,
    email: emailMatch ? emailMatch[1] : undefined,
    username: userMatch ? userMatch[1] : undefined,
    password: passMatch ? passMatch[1] : undefined,
  };
}

export function extractDemoCredentials(description: string | null | undefined): {
  cleanDescription: string;
  demoCredentials: string | null;
} {
  if (!description) {
    return { cleanDescription: '', demoCredentials: null };
  }

  // 1. Explicit HTML comment tags
  const match = description.match(/<!--DEMO_CREDENTIALS-->([\s\S]*?)<!--\/DEMO_CREDENTIALS-->/);
  if (match) {
    const demoCredentials = match[1].trim();
    const cleanDescription = description
      .replace(/<!--DEMO_CREDENTIALS-->[\s\S]*?<!--\/DEMO_CREDENTIALS-->/, '')
      .trim();
    return { cleanDescription, demoCredentials: demoCredentials || null };
  }

  // 2. Plain text pattern fallback (e.g. phone: ... password: ...)
  const plainPattern = /(?:(?:phone|mobile|tel|هاتف|رقم|email|بريد|username|user|المستخدم)\s*[:=]\s*[^\n]+[\r\n\s]*)+(?:password|pass|كلمة\s*المرور|السر)\s*[:=]\s*[^\n]+/i;
  const plainMatch = description.match(plainPattern);
  if (plainMatch) {
    const demoCredentials = plainMatch[0].trim();
    const cleanDescription = description.replace(plainMatch[0], '').trim();
    return { cleanDescription, demoCredentials };
  }

  return { cleanDescription: description, demoCredentials: null };
}

export function injectDemoCredentials(
  description: string | null | undefined,
  demoCredentials: string | null | undefined
): string {
  let base = description
    ? description.replace(/<!--DEMO_CREDENTIALS-->[\s\S]*?<!--\/DEMO_CREDENTIALS-->/, '').trim()
    : '';

  base = base
    .replace(/(?:(?:phone|mobile|tel|هاتف|رقم|email|بريد|username|user|المستخدم)\s*[:=]\s*[^\n]+[\r\n\s]*)+(?:password|pass|كلمة\s*المرور|السر)\s*[:=]\s*[^\n]+/i, '')
    .trim();

  if (!demoCredentials || !demoCredentials.trim()) {
    return base;
  }

  return `${base}\n\n<!--DEMO_CREDENTIALS-->\n${demoCredentials.trim()}\n<!--/DEMO_CREDENTIALS-->`;
}

