import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { ToastProvider } from '@/components/Toast';
import { AdminDashboardClient } from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <ToastProvider>
      <AdminDashboardClient adminUser={session} />
    </ToastProvider>
  );
}
