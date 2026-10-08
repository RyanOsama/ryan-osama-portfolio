import path from 'path';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

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

  const storageDriver = process.env.STORAGE_DRIVER || 'db';

  if (storageDriver === 'r2' && process.env.R2_BUCKET && process.env.R2_PUBLIC_URL) {
    const publicUrl = `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${uniqueName}`;
    return {
      url: publicUrl,
      filename: uniqueName,
      size: fileBuffer.length,
      mimeType,
    };
  }

  // Database-backed cloud storage (Works on Vercel Serverless & Localhost without read-only filesystem issues)
  const uploaded = await prisma.uploadedFile.create({
    data: {
      filename: uniqueName,
      mimeType,
      size: fileBuffer.length,
      data: fileBuffer,
    },
  });

  const fileUrl = `/api/uploads/${uploaded.id}`;

  return {
    url: fileUrl,
    filename: uniqueName,
    size: fileBuffer.length,
    mimeType,
  };
}

export async function deleteFile(fileUrl: string): Promise<boolean> {
  try {
    if (fileUrl.startsWith('/api/uploads/')) {
      const id = fileUrl.replace('/api/uploads/', '');
      await prisma.uploadedFile.deleteMany({
        where: { id },
      });
      return true;
    }
    return true;
  } catch (error) {
    console.error('Failed to delete file:', error);
    return false;
  }
}
