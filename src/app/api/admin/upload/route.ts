import { NextRequest } from 'next/server';
import { uploadFile } from '@/lib/storage';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return errorResponse('لم يتم تحديد أي ملف للرفع', 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadFile(buffer, file.name, file.type);

    return successResponse(result, 'تم رفع الملف بنجاح');
  } catch (error: any) {
    console.error('File upload error:', error);
    return errorResponse(error.message || 'حدث خطأ أثناء رفع الملف', 400);
  }
}
