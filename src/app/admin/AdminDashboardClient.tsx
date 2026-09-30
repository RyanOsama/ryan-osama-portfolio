'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderGit2,
  MessageSquareCheck,
  Wrench,
  Cpu,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Star,
  UploadCloud,
  Loader2,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface AdminUser {
  id: string;
  username: string;
}

export function AdminDashboardClient({ adminUser }: { adminUser: AdminUser }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'reviews' | 'services' | 'skills' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);

  // Data states
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [services, setServices] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  // Modals & Forms
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    problem: '',
    solution: '',
    categoryId: '',
    coverImage: '/images/default.webp',
    liveUrl: '',
    githubUrl: '',
    status: 'COMPLETED',
    isFeatured: false,
    sortOrder: 0,
    technologyIds: [] as string[],
    features: [{ title: '', description: '', sortOrder: 0 }],
  });

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: 'layers', sortOrder: 0, isActive: true });

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', level: 90, sortOrder: 0, isActive: true });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch all dashboard data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [dashRes, projRes, catRes, techRes, revRes, srvRes, sklRes, setRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/projects'),
        fetch('/api/categories'),
        fetch('/api/technologies'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/services'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/settings'),
      ]);

      const [dash, proj, cat, tech, rev, srv, skl, sett] = await Promise.all([
        dashRes.json(),
        projRes.json(),
        catRes.json(),
        techRes.json(),
        revRes.json(),
        srvRes.json(),
        sklRes.json(),
        setRes.json(),
      ]);

      if (dash.success) setDashboardData(dash.data);
      if (proj.success) setProjects(proj.data);
      if (cat.success) setCategories(cat.data);
      if (tech.success) setTechnologies(tech.data);
      if (rev.success) setReviews(rev.data);
      if (srv.success) setServices(srv.data);
      if (skl.success) setSkills(skl.data);
      if (sett.success) setSiteSettings(sett.data);
    } catch (err) {
      showToast('حدث خطأ أثناء تحميل البيانات', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast('تم تسجيل الخروج بنجاح', 'success');
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // Image Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploadingImage(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProjectForm((prev) => ({ ...prev, coverImage: data.data.url }));
        showToast('تم رفع الصورة بنجاح!', 'success');
      } else {
        showToast(data.message || 'فشل رفع الصورة', 'error');
      }
    } catch {
      showToast('حدث خطأ أثناء رفع الصورة', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Project Actions
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      problem: '',
      solution: '',
      categoryId: categories[0]?.id || '',
      coverImage: '/images/default.webp',
      liveUrl: '',
      githubUrl: '',
      status: 'COMPLETED',
      isFeatured: false,
      sortOrder: 0,
      technologyIds: [],
      features: [{ title: '', description: '', sortOrder: 0 }],
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: any) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      slug: proj.slug,
      shortDescription: proj.shortDescription,
      description: proj.description,
      problem: proj.problem || '',
      solution: proj.solution || '',
      categoryId: proj.categoryId || '',
      coverImage: proj.coverImage,
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      status: proj.status || 'COMPLETED',
      isFeatured: proj.isFeatured || false,
      sortOrder: proj.sortOrder || 0,
      technologyIds: proj.technologies ? proj.technologies.map((t: any) => t.id) : [],
      features: proj.features?.length > 0 ? proj.features : [{ title: '', description: '', sortOrder: 0 }],
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanFeatures = projectForm.features.filter((f) => f.title.trim() !== '');
      const payload = { ...projectForm, features: cleanFeatures };

      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToast(editingProject ? 'تم تحديث المشروع بنجاح' : 'تم إضافة المشروع بنجاح', 'success');
        setProjectModalOpen(false);
        loadAllData();
      } else {
        showToast(data.message || 'حدث خطأ أثناء حفظ المشروع', 'error');
      }
    } catch {
      showToast('حدث خطأ في الاتصال بالخادم', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف المشروع "${title}" نهائياً؟`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('تم حذف المشروع بنجاح', 'success');
        loadAllData();
      } else {
        showToast(data.message || 'فشل حذف المشروع', 'error');
      }
    } catch {
      showToast('تعذر حذف المشروع', 'error');
    }
  };

  // Review Actions
  const handleUpdateReviewStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(status === 'approved' ? 'تمت الموافقة على التعليق ونشره' : 'تم رفض التعليق', 'success');
        loadAllData();
      } else {
        showToast(data.message || 'فشل تحديث حالة التعليق', 'error');
      }
    } catch {
      showToast('تعذر تحديث التعليق', 'error');
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التعليق نهائياً؟')) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('تم حذف التعليق نهائياً', 'success');
        loadAllData();
      }
    } catch {
      showToast('تعذر حذف التعليق', 'error');
    }
  };

  // Service Actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast('تم حفظ الخدمة بنجاح', 'success');
        setServiceModalOpen(false);
        loadAllData();
      }
    } catch {
      showToast('تعذر حفظ الخدمة', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      showToast('تم حذف الخدمة', 'success');
      loadAllData();
    } catch {
      showToast('تعذر حذف الخدمة', 'error');
    }
  };

  // Skill Actions
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSkill ? `/api/admin/skills/${editingSkill.id}` : '/api/admin/skills';
      const method = editingSkill ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast('تم حفظ المهارة بنجاح', 'success');
        setSkillModalOpen(false);
        loadAllData();
      }
    } catch {
      showToast('تعذر حفظ المهارة', 'error');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المهارة؟')) return;
    try {
      await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      showToast('تم حذف المهارة', 'success');
      loadAllData();
    } catch {
      showToast('تعذر حذف المهارة', 'error');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings),
      });
      const data = await res.json();
      if (data.success) {
        showToast('تم حفظ إعدادات الموقع بنجاح', 'success');
      } else {
        showToast(data.message || 'فشل حفظ الإعدادات', 'error');
      }
    } catch {
      showToast('تعذر حفظ الإعدادات', 'error');
    }
  };

  const filteredReviews =
    reviewFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.status === reviewFilter);

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#090d16' }}>
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '260px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderLeft: '1px solid var(--border-glass)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <div>
          {/* Dashboard Header */}
          <div style={{ padding: '0 12px 24px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>لوحة التحكم المركزية</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-glow)', marginTop: '4px' }}>
              المسؤول: {adminUser.username}
            </div>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '20px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'overview' ? 'var(--primary-gradient)' : 'transparent',
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <LayoutDashboard size={18} />
              <span>نظرة عامة وإحصائيات</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'projects' ? 'var(--primary-gradient)' : 'transparent',
                color: activeTab === 'projects' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <FolderGit2 size={18} />
              <span>إدارة المشاريع ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'reviews' ? 'var(--primary-gradient)' : 'transparent',
                color: activeTab === 'reviews' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquareCheck size={18} />
                <span>مراجعة التقييمات</span>
              </div>
              {pendingCount > 0 && (
                <span
                  style={{
                    background: '#f43f5e',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'services' ? 'var(--primary-gradient)' : 'transparent',
                color: activeTab === 'services' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <Wrench size={18} />
              <span>الخدمات ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'skills' ? 'var(--primary-gradient)' : 'transparent',
                color: activeTab === 'skills' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <Cpu size={18} />
              <span>المهارات والتقنيات ({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'settings' ? 'var(--primary-gradient)' : 'transparent',
                color: activeTab === 'settings' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <Settings size={18} />
              <span>إعدادات الموقع وSEO</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href="/"
            target="_blank"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            <Eye size={16} />
            <span>معاينة الموقع للعامة</span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            <LogOut size={16} />
            <span>تسجيل الخروج الآمن</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <Loader2 size={36} className="animate-spin" color="var(--primary-glow)" />
          </div>
        ) : (
          <>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  {activeTab === 'overview' && 'لوحة المعلومات والإحصائيات'}
                  {activeTab === 'projects' && 'إدارة سابقة الأعمال والمشاريع'}
                  {activeTab === 'reviews' && 'مركز مراجعة واعتماد التقييمات'}
                  {activeTab === 'services' && 'إدارة الخدمات والحلول'}
                  {activeTab === 'skills' && 'إدارة المهارات والنسب'}
                  {activeTab === 'settings' && 'إعدادات الموقع والبيانات التعريفية'}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
                  تحكم كامل وشامل في جميع عناصر المنصة وقواعد البيانات
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={loadAllData} className="btn btn-secondary btn-sm" title="تحديث البيانات">
                  <RefreshCw size={16} />
                  <span>تحديث</span>
                </button>
                {activeTab === 'projects' && (
                  <button onClick={openNewProjectModal} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>إضافة مشروع جديد</span>
                  </button>
                )}
                {activeTab === 'services' && (
                  <button
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm({ title: '', description: '', icon: 'layers', sortOrder: 0, isActive: true });
                      setServiceModalOpen(true);
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus size={16} />
                    <span>إضافة خدمة جديدة</span>
                  </button>
                )}
                {activeTab === 'skills' && (
                  <button
                    onClick={() => {
                      setEditingSkill(null);
                      setSkillForm({ name: '', category: 'Frontend', level: 90, sortOrder: 0, isActive: true });
                      setSkillModalOpen(true);
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus size={16} />
                    <span>إضافة مهارة جديدة</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    marginBottom: '35px',
                  }}
                >
                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>إجمالي المشاريع</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary-glow)', marginTop: '6px' }}>
                      {dashboardData?.stats?.totalProjects ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '4px' }}>
                      {dashboardData?.stats?.featuredProjects ?? 0} مشاريع مميزة
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>التقييمات المعلقة</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: pendingCount > 0 ? '#f43f5e' : '#10b981', marginTop: '6px' }}>
                      {dashboardData?.stats?.pendingReviews ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      بانتظار موافقتك للنشر
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>متوسط التقييم العام</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#f59e0b', marginTop: '6px' }}>
                      {dashboardData?.stats?.averageRating ?? 5.0} / 5
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      من {dashboardData?.stats?.approvedReviews ?? 0} تقييم معتمد
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600 }}>الخدمات والمهارات</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#a855f7', marginTop: '6px' }}>
                      {dashboardData?.stats?.totalServices ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      و {dashboardData?.stats?.totalSkills ?? 0} مهارة معروضة
                    </div>
                  </div>
                </div>

                {/* Quick Moderation Box */}
                {pendingCount > 0 && (
                  <div
                    className="glass-card"
                    style={{
                      padding: '24px',
                      background: 'rgba(244, 63, 94, 0.08)',
                      borderColor: 'rgba(244, 63, 94, 0.25)',
                      marginBottom: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <ShieldAlert size={26} color="#f43f5e" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fda4af' }}>
                          يوجد {pendingCount} تقييمات جديدة تحتاج إلى المراجعة والاعتماد
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          لن تظهر هذه التقييمات للعامة حتى توافق عليها لضمان الموثوقية
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('reviews')} className="btn btn-danger btn-sm">
                      مراجعة الآن
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      <th style={{ padding: '14px' }}>المشروع</th>
                      <th style={{ padding: '14px' }}>التصنيف</th>
                      <th style={{ padding: '14px' }}>الحالة</th>
                      <th style={{ padding: '14px' }}>التقييمات</th>
                      <th style={{ padding: '14px' }}>الروابط</th>
                      <th style={{ padding: '14px', textAlign: 'center' }}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr key={proj.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.96rem' }}>{proj.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/projects/{proj.slug}</div>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                          {proj.category?.name || 'غير محدد'}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span className={proj.status === 'COMPLETED' ? 'badge badge-success' : 'badge badge-warning'}>
                            {proj.status}
                          </span>
                          {proj.isFeatured && (
                            <span className="badge badge-warning" style={{ marginRight: '6px' }}>
                              مميز
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '16px', fontSize: '0.88rem' }}>
                          {proj._count?.reviews || 0} تقييم
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <Link href={`/projects/${proj.slug}`} target="_blank" className="btn btn-secondary btn-sm" title="عرض الصفحة">
                              <ExternalLink size={14} />
                            </Link>
                          </div>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button onClick={() => openEditProjectModal(proj)} className="btn btn-secondary btn-sm" title="تعديل">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => handleDeleteProject(proj.id, proj.title)} className="btn btn-danger btn-sm" title="حذف">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB: REVIEWS MODERATION */}
            {activeTab === 'reviews' && (
              <div>
                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setReviewFilter(st)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: reviewFilter === st ? '1px solid var(--primary-glow)' : '1px solid rgba(255,255,255,0.1)',
                        background: reviewFilter === st ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                        color: reviewFilter === st ? '#ffffff' : 'var(--text-secondary)',
                        fontFamily: 'inherit',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {st === 'all' && `جميع التقييمات (${reviews.length})`}
                      {st === 'pending' && `المعلقة (${reviews.filter((r) => r.status === 'pending').length})`}
                      {st === 'approved' && `المعتمدة (${reviews.filter((r) => r.status === 'approved').length})`}
                      {st === 'rejected' && `المرفوضة (${reviews.filter((r) => r.status === 'rejected').length})`}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {filteredReviews.map((rev) => (
                    <div key={rev.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ fontWeight: 700, fontSize: '1rem' }}>{rev.name}</div>
                          <span
                            className={
                              rev.status === 'approved'
                                ? 'badge badge-success'
                                : rev.status === 'pending'
                                ? 'badge badge-warning'
                                : 'badge badge-danger'
                            }
                          >
                            {rev.status === 'approved' && 'معتمد ومنشور'}
                            {rev.status === 'pending' && 'معلق (بانتظار المراجعة)'}
                            {rev.status === 'rejected' && 'مرفوض'}
                          </span>
                        </div>

                        {rev.project && (
                          <div style={{ fontSize: '0.82rem', color: 'var(--primary-glow)', marginBottom: '8px' }}>
                            مشروع: {rev.project.title}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={15}
                              fill={s <= rev.rating ? '#f59e0b' : 'none'}
                              color={s <= rev.rating ? '#f59e0b' : '#475569'}
                            />
                          ))}
                        </div>

                        <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '16px' }}>
                          "{rev.comment}"
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                            className="btn btn-success btn-sm"
                            style={{ flex: 1 }}
                          >
                            <CheckCircle2 size={15} />
                            <span>موافقة ونشر</span>
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                            className="btn btn-secondary btn-sm"
                            style={{ flex: 1 }}
                          >
                            <XCircle size={15} />
                            <span>رفض</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="btn btn-danger btn-sm"
                          title="حذف نهائي"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {services.map((srv) => (
                  <div key={srv.id} className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{srv.title}</h3>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setServiceForm({
                              title: srv.title,
                              description: srv.description,
                              icon: srv.icon || 'layers',
                              sortOrder: srv.sortOrder,
                              isActive: srv.isActive,
                            });
                            setServiceModalOpen(true);
                          }}
                          className="btn btn-secondary btn-sm"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDeleteService(srv.id)} className="btn btn-danger btn-sm">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {srv.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === 'skills' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {skills.map((skl) => (
                  <div key={skl.id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{skl.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{skl.category}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--primary-glow)', fontSize: '0.9rem' }}>{skl.level}%</span>
                        <button
                          onClick={() => {
                            setEditingSkill(skl);
                            setSkillForm({
                              name: skl.name,
                              category: skl.category,
                              level: skl.level,
                              sortOrder: skl.sortOrder,
                              isActive: skl.isActive,
                            });
                            setSkillModalOpen(true);
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skl.id)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="glass-card" style={{ padding: '36px', maxWidth: '850px' }}>
                <form onSubmit={handleSaveSettings}>
                  <div className="form-group">
                    <label className="form-label">اسم صاحب الموقع (Owner Name)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={siteSettings['owner_name'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, owner_name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">العنوان الرئيسي التعريفي (Headline)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={siteSettings['headline'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, headline: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">نبذة عن المطور (Bio)</label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      value={siteSettings['bio'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, bio: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">البريد الإلكتروني</label>
                      <input
                        type="email"
                        className="form-input"
                        value={siteSettings['email'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">رقم الهاتف / الواتساب</label>
                      <input
                        type="text"
                        className="form-input"
                        value={siteSettings['phone'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">رابط GitHub</label>
                      <input
                        type="text"
                        className="form-input"
                        value={siteSettings['github_url'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, github_url: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">رابط LinkedIn</label>
                      <input
                        type="text"
                        className="form-input"
                        value={siteSettings['linkedin_url'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, linkedin_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>
                    <span>حفظ التعديلات</span>
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </main>

      {/* PROJECT ADD / EDIT MODAL */}
      {projectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setProjectModalOpen(false)}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(15, 23, 42, 0.98)',
              padding: '30px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>
              {editingProject ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
            </h2>

            <form onSubmit={handleSaveProject}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">عنوان المشروع *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">الـ Slug *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">الوصف المختصر (Short Description) *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">الوصف الكامل والمفصل *</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">المشكلة والتحدي (The Problem)</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={projectForm.problem}
                    onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">الحل الهندسي (The Solution)</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                  />
                </div>
              </div>

              {/* Cover Image & Upload */}
              <div className="form-group">
                <label className="form-label">صورة الغلاف (Cover Image URL أو رفع مباشر)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.coverImage}
                    onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                  />
                  <label
                    className="btn btn-secondary btn-sm"
                    style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
                  >
                    <UploadCloud size={16} />
                    <span>{uploadingImage ? 'جاري الرفع...' : 'رفع صورة'}</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              {/* Links and Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">رابط Live Demo</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://example.com"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">رابط GitHub</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">التصنيف</label>
                  <select
                    className="form-select"
                    value={projectForm.categoryId}
                    onChange={(e) => setProjectForm({ ...projectForm, categoryId: e.target.value })}
                  >
                    <option value="">بدون تصنيف</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Technologies Selection */}
              <div className="form-group">
                <label className="form-label">التقنيات المستخدمة في المشروع</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {technologies.map((t) => {
                    const isSelected = projectForm.technologyIds.includes(t.id);
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => {
                          setProjectForm((prev) => ({
                            ...prev,
                            technologyIds: isSelected
                              ? prev.technologyIds.filter((id) => id !== t.id)
                              : [...prev.technologyIds, t.id],
                          }));
                        }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: isSelected ? '1px solid var(--primary-glow)' : '1px solid rgba(255,255,255,0.1)',
                          background: isSelected ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                          color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem' }}>
                  <input
                    type="checkbox"
                    checked={projectForm.isFeatured}
                    onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                  />
                  <span>تمييز المشروع في الواجهة (Featured)</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setProjectModalOpen(false)} className="btn btn-secondary">
                  إلغاء
                </button>
                <button type="submit" className="btn btn-primary">
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE MODAL */}
      {serviceModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setServiceModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '500px', background: 'rgba(15, 23, 42, 0.98)', padding: '30px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>
              {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
            </h2>
            <form onSubmit={handleSaveService}>
              <div className="form-group">
                <label className="form-label">عنوان الخدمة</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">وصف الخدمة</label>
                <textarea
                  rows={3}
                  required
                  className="form-textarea"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={() => setServiceModalOpen(false)} className="btn btn-secondary">
                  إلغاء
                </button>
                <button type="submit" className="btn btn-primary">
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SKILL MODAL */}
      {skillModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSkillModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '460px', background: 'rgba(15, 23, 42, 0.98)', padding: '30px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>
              {editingSkill ? 'تعديل المهارة' : 'إضافة مهارة جديدة'}
            </h2>
            <form onSubmit={handleSaveSkill}>
              <div className="form-group">
                <label className="form-label">اسم المهارة أو التقنية</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">القسم (Category)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Frontend, Backend, Database..."
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">نسبة الإتقان ({skillForm.level}%)</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="form-input"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={() => setSkillModalOpen(false)} className="btn btn-secondary">
                  إلغاء
                </button>
                <button type="submit" className="btn btn-primary">
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
