/**
 * Helper to store and extract project demo login credentials / testing notes
 * safely within existing project description text without requiring database schema changes.
 */

export function extractDemoCredentials(description: string | null | undefined): {
  cleanDescription: string;
  demoCredentials: string | null;
} {
  if (!description) {
    return { cleanDescription: '', demoCredentials: null };
  }

  const match = description.match(/<!--DEMO_CREDENTIALS-->([\s\S]*?)<!--\/DEMO_CREDENTIALS-->/);
  if (match) {
    const demoCredentials = match[1].trim();
    const cleanDescription = description
      .replace(/<!--DEMO_CREDENTIALS-->[\s\S]*?<!--\/DEMO_CREDENTIALS-->/, '')
      .trim();
    return { cleanDescription, demoCredentials: demoCredentials || null };
  }

  return { cleanDescription: description, demoCredentials: null };
}

export function injectDemoCredentials(
  description: string | null | undefined,
  demoCredentials: string | null | undefined
): string {
  const base = description
    ? description.replace(/<!--DEMO_CREDENTIALS-->[\s\S]*?<!--\/DEMO_CREDENTIALS-->/, '').trim()
    : '';

  if (!demoCredentials || !demoCredentials.trim()) {
    return base;
  }

  return `${base}\n\n<!--DEMO_CREDENTIALS-->\n${demoCredentials.trim()}\n<!--/DEMO_CREDENTIALS-->`;
}
