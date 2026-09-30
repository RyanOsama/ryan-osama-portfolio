import { z } from 'zod';

export function getZodErrorMessage(error: any): string {
  return error?.issues?.[0]?.message || error?.errors?.[0]?.message || 'بيانات غير صالحة';
}

export const loginSchema = z.object({
  username: z.string().min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل').max(50),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').max(100),
});

export const projectSchema = z.object({
  title: z.string().min(3, 'عنوان المشروع مطلوب').max(200),
  slug: z.string().min(2, 'الـ Slug مطلوب').max(200),
  shortDescription: z.string().min(5, 'الوصف المختصر مطلوب').max(500),
  description: z.string().min(10, 'الوصف الكامل مطلوب'),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  coverImage: z.string().min(1, 'الصورة الرئيسية مطلوبة'),
  liveUrl: z.string().url('رابط غير صالح').optional().nullable().or(z.literal('')),
  githubUrl: z.string().url('رابط غير صالح').optional().nullable().or(z.literal('')),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'ARCHIVED']).default('COMPLETED'),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  technologyIds: z.array(z.string()).optional().default([]),
  features: z
    .array(
      z.object({
        title: z.string().min(1, 'عنوان الميزة مطلوب'),
        description: z.string().optional().nullable(),
        sortOrder: z.number().int().default(0),
      })
    )
    .optional()
    .default([]),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'اسم التصنيف مطلوب').max(100),
  slug: z.string().min(2, 'الـ Slug مطلوب').max(100),
  description: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const technologySchema = z.object({
  name: z.string().min(1, 'اسم التقنية مطلوب').max(100),
  slug: z.string().min(1, 'الـ Slug مطلوب').max(100),
  icon: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const serviceSchema = z.object({
  title: z.string().min(3, 'عنوان الخدمة مطلوب').max(200),
  description: z.string().min(10, 'وصف الخدمة مطلوب'),
  icon: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const skillSchema = z.object({
  name: z.string().min(2, 'اسم المهارة مطلوب').max(100),
  category: z.string().min(2, 'قسم المهارة مطلوب').max(100),
  icon: z.string().optional().nullable(),
  level: z.number().min(1).max(100).default(90),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const experienceSchema = z.object({
  title: z.string().min(3, 'المسمى الوظيفي مطلوب').max(200),
  organization: z.string().min(2, 'جهة العمل مطلوبة').max(200),
  location: z.string().optional().nullable(),
  description: z.string().min(5, 'وصف التجربة مطلوب'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  isCurrent: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const reviewSubmitSchema = z.object({
  projectId: z.string().optional().nullable(),
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(60, 'الاسم طويل جداً'),
  email: z.string().email('البريد الإلكتروني غير صالح').optional().nullable().or(z.literal('')),
  rating: z.number().int().min(1, 'التقييم من 1 إلى 5').max(5, 'التقييم من 1 إلى 5'),
  comment: z.string().min(5, 'التعليق يجب أن يكون 5 أحرف على الأقل').max(1000, 'التعليق طويل جداً (الحد 1000 حرف)'),
});

export const reviewStatusSchema = z.object({
  status: z.enum(['approved', 'rejected', 'pending']),
});

export const siteSettingsSchema = z.record(z.string(), z.string());
