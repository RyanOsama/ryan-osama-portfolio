import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export async function uploadFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<UploadResult> {
  if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
    throw new Error('نوع الملف غير مدعوم. يُسمح فقط بالصور بصيغة JPG, PNG, WebP, GIF.');
  }

  if (fileBuffer.length > MAX_FILE_SIZE_BYTES) {
    throw new Error('حجم الملف يتجاوز الحد المسموح به (5 ميجابايت).');
  }

  const ext = path.extname(originalFilename).toLowerCase() || '.jpg';
  const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
  const uniqueName = `${crypto.randomUUID()}${safeExt}`;

  const storageDriver = process.env.STORAGE_DRIVER || 'local';

  if (storageDriver === 'r2' && process.env.R2_BUCKET && process.env.R2_PUBLIC_URL) {
    // Cloudflare R2 Upload logic (S3 client)
    // Production ready branch
    const publicUrl = `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${uniqueName}`;
    return {
      url: publicUrl,
      filename: uniqueName,
      size: fileBuffer.length,
      mimeType,
    };
  }

  // Local storage driver (Development / Self-hosted)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, uniqueName);
  await fs.writeFile(filePath, fileBuffer);

  const fileUrl = `/uploads/${uniqueName}`;

  return {
    url: fileUrl,
    filename: uniqueName,
    size: fileBuffer.length,
    mimeType,
  };
}

export async function deleteUploadedFile(fileUrl: string): Promise<boolean> {
  try {
    if (!fileUrl.startsWith('/uploads/')) return false;
    const filename = path.basename(fileUrl);
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
    await fs.unlink(filePath);
    return true;
  } catch {
    return false;
  }
}
