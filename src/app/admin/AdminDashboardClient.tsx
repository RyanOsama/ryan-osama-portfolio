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
  Globe,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Check,
  X,
  Users,
  Clock,
  Monitor,
  Smartphone,
  Activity,
  Calendar,
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';

interface AdminUser {
  id: string;
  username: string;
}

export function AdminDashboardClient({ adminUser }: { adminUser: AdminUser }) {
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, toggleLanguage, dir } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'projects' | 'reviews' | 'services' | 'skills' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);

  // Data states
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [visitorFilter, setVisitorFilter] = useState<'all' | 'today'>('today');
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
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('ALL');
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    problem: '',
    solution: '',
    categoryId: '',
    coverImage: '/images/hero-bg.png',
    liveUrl: '',
    githubUrl: '',
    status: 'COMPLETED',
    isFeatured: false,
    sortOrder: 0,
    technologyIds: [] as string[],
    features: [] as { title: string; description?: string; sortOrder?: number }[],
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
      const [dashRes, projRes, catRes, techRes, revRes, srvRes, sklRes, setRes, anaRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/projects'),
        fetch('/api/categories'),
        fetch('/api/technologies'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/services'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/settings'),
        fetch('/api/admin/analytics'),
      ]);

      const [dash, proj, cat, tech, rev, srv, skl, sett, ana] = await Promise.all([
        dashRes.json(),
        projRes.json(),
        catRes.json(),
        techRes.json(),
        revRes.json(),
        srvRes.json(),
        sklRes.json(),
        setRes.json(),
        anaRes.json(),
      ]);

      if (dash.success) setDashboardData(dash.data);
      if (ana.success) setAnalyticsData(ana.data);
      if (proj.success) setProjects(proj.data);
      if (cat.success) setCategories(cat.data);
      if (tech.success) setTechnologies(tech.data);
      if (rev.success) setReviews(rev.data);
      if (srv.success) setServices(srv.data);
      if (skl.success) setSkills(skl.data);
      if (sett.success) setSiteSettings(sett.data);
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في تحميل البيانات' : 'Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast(lang === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Signed out successfully', 'info');
      router.push('/admin/login');
      router.refresh();
    } catch {
      showToast(lang === 'ar' ? 'فشل تسجيل الخروج' : 'Logout failed', 'error');
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
        showToast(
          status === 'approved'
            ? (lang === 'ar' ? 'تمت الموافقة على التقييم' : 'Review approved')
            : (lang === 'ar' ? 'تم رفض التقييم' : 'Review rejected'),
          'success'
        );
        loadAllData();
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في تحديث التقييم' : 'Error updating review', 'error');
    }
  };

  const handleDeleteReview = async (id: string) => {
    const confirmMsg = lang === 'ar' ? 'هل أنت متأكد من حذف هذا التقييم نهائياً؟' : 'Are you sure you want to delete this review?';
    if (!confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'ar' ? 'تم حذف التقييم' : 'Review deleted', 'info');
        loadAllData();
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting review', 'error');
    }
  };

  // Project Modals & CRUD
  const openNewProjectModal = () => {
    setEditingProject(null);
    setSelectedTechCategory('ALL');
    setProjectForm({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      problem: '',
      solution: '',
      categoryId: categories[0]?.id || '',
      coverImage: '/images/hero-bg.png',
      liveUrl: '',
      githubUrl: '',
      status: 'COMPLETED',
      isFeatured: false,
      sortOrder: 0,
      technologyIds: [],
      features: [],
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (p: any) => {
    setEditingProject(p);
    setSelectedTechCategory('ALL');
    setProjectForm({
      title: p.title || '',
      slug: p.slug || '',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      problem: p.problem || '',
      solution: p.solution || '',
      categoryId: p.categoryId || '',
      coverImage: p.coverImage || '/images/hero-bg.png',
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      status: p.status || 'COMPLETED',
      isFeatured: !!p.isFeatured,
      sortOrder: p.sortOrder || 0,
      technologyIds: p.technologies ? p.technologies.map((t: any) => t.id) : [],
      features: p.features && p.features.length > 0
        ? p.features.map((f: any) => ({ title: f.title || '', description: f.description || '', sortOrder: f.sortOrder || 0 }))
        : [],
    });
    setProjectModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const uploadedUrl = data.data?.url || data.url;
        if (uploadedUrl) {
          setProjectForm((prev) => ({ ...prev, coverImage: uploadedUrl }));
          showToast(lang === 'ar' ? 'تم رفع الصورة بنجاح' : 'Image uploaded successfully', 'success');
        }
      } else {
        showToast(data.message || (lang === 'ar' ? 'فشل رفع الصورة' : 'Upload failed'), 'error');
      }
    } catch {
      showToast(lang === 'ar' ? 'خطأ في الاتصال أثناء الرفع' : 'Error uploading image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const validFeatures = (projectForm.features || [])
        .filter((f: any) => f && typeof f.title === 'string' && f.title.trim().length > 0)
        .map((f: any, idx: number) => ({
          title: f.title.trim(),
          description: f.description ? f.description.trim() : null,
          sortOrder: f.sortOrder ?? idx,
        }));

      const payload = {
        ...projectForm,
        categoryId: projectForm.categoryId || null,
        liveUrl: projectForm.liveUrl || null,
        githubUrl: projectForm.githubUrl || null,
        problem: projectForm.problem || null,
        solution: projectForm.solution || null,
        features: validFeatures,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          editingProject
            ? (lang === 'ar' ? 'تم تحديث المشروع بنجاح' : 'Project updated')
            : (lang === 'ar' ? 'تم إنشاء المشروع بنجاح' : 'Project created'),
          'success'
        );
        setProjectModalOpen(false);
        loadAllData();
      } else {
        showToast(data.message || (lang === 'ar' ? 'فشل حفظ المشروع' : 'Save failed'), 'error');
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في حفظ المشروع' : 'Error saving project', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    const confirmMsg = lang === 'ar' ? `هل أنت متأكد من حذف المشروع "${title}"؟` : `Delete project "${title}"?`;
    if (!confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'ar' ? 'تم حذف المشروع' : 'Project deleted', 'info');
        loadAllData();
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في حذف المشروع' : 'Error deleting project', 'error');
    }
  };

  // Service CRUD
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
        showToast(
          editingService
            ? (lang === 'ar' ? 'تم تحديث الخدمة' : 'Service updated')
            : (lang === 'ar' ? 'تمت إضافة الخدمة' : 'Service created'),
          'success'
        );
        setServiceModalOpen(false);
        loadAllData();
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في حفظ الخدمة' : 'Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    const confirmMsg = lang === 'ar' ? 'هل أنت متأكد من حذف هذه الخدمة؟' : 'Delete this service?';
    if (!confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'ar' ? 'تم حذف الخدمة' : 'Service deleted', 'info');
        loadAllData();
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting service', 'error');
    }
  };

  // Skill CRUD
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
        showToast(
          editingSkill
            ? (lang === 'ar' ? 'تم تحديث المهارة' : 'Skill updated')
            : (lang === 'ar' ? 'تمت إضافة المهارة' : 'Skill created'),
          'success'
        );
        setSkillModalOpen(false);
        loadAllData();
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في حفظ المهارة' : 'Error saving skill', 'error');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const confirmMsg = lang === 'ar' ? 'هل أنت متأكد من حذف هذه المهارة؟' : 'Delete this skill?';
    if (!confirm(confirmMsg)) return;
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(lang === 'ar' ? 'تم حذف المهارة' : 'Skill deleted', 'info');
      } else {
        showToast(data.message || (lang === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting skill'), 'error');
      }
      loadAllData();
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting skill', 'error');
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
        showToast(lang === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Site settings updated', 'success');
      }
    } catch {
      showToast(lang === 'ar' ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error updating settings', 'error');
    }
  };

  const filteredReviews =
    reviewFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.status === reviewFilter);

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div
      dir={dir}
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#1a1e27',
        color: '#ffffff',
        fontFamily: 'inherit',
        flexDirection: 'row',
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '280px',
          background: '#212631',
          borderRight: dir === 'ltr' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          borderLeft: dir === 'rtl' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 20,
        }}
      >
        <div>
          {/* Dashboard Header Profile */}
          <div
            style={{
              padding: '0 12px 20px 12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              textAlign: dir === 'rtl' ? 'right' : 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
                  {lang === 'ar' ? 'لوحة التحكم الذكية' : 'Admin Portal'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                  {adminUser.username}
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'overview' ? '#343c4d' : 'transparent',
                color: activeTab === 'overview' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'overview' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutDashboard size={18} color={activeTab === 'overview' ? '#ffffff' : '#94a3b8'} />
              <span>{lang === 'ar' ? 'نظرة عامة وإحصائيات' : 'Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('visitors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                border: activeTab === 'visitors' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'visitors' ? '#343c4d' : 'transparent',
                color: activeTab === 'visitors' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'visitors' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={18} color={activeTab === 'visitors' ? '#38bdf8' : '#94a3b8'} />
                <span>{lang === 'ar' ? 'الزوار وحركة الموقع' : 'Visitors & Traffic'}</span>
              </div>
              {analyticsData?.activeNow > 0 && (
                <span
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  title={lang === 'ar' ? 'متواجدون الآن' : 'Active Now'}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', display: 'inline-block' }} />
                  {analyticsData.activeNow}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: activeTab === 'projects' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'projects' ? '#343c4d' : 'transparent',
                color: activeTab === 'projects' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'projects' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <FolderGit2 size={18} color={activeTab === 'projects' ? '#ffffff' : '#94a3b8'} />
              <span>{lang === 'ar' ? `المشاريع (${projects.length})` : `Projects (${projects.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                border: activeTab === 'reviews' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'reviews' ? '#343c4d' : 'transparent',
                color: activeTab === 'reviews' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'reviews' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquareCheck size={18} color={activeTab === 'reviews' ? '#ffffff' : '#94a3b8'} />
                <span>{lang === 'ar' ? 'التقييمات والتعليقات' : 'Reviews'}</span>
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
                border: activeTab === 'services' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'services' ? '#343c4d' : 'transparent',
                color: activeTab === 'services' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'services' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <Wrench size={18} color={activeTab === 'services' ? '#ffffff' : '#94a3b8'} />
              <span>{lang === 'ar' ? `الخدمات (${services.length})` : `Services (${services.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: activeTab === 'skills' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'skills' ? '#343c4d' : 'transparent',
                color: activeTab === 'skills' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'skills' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <Cpu size={18} color={activeTab === 'skills' ? '#ffffff' : '#94a3b8'} />
              <span>{lang === 'ar' ? `المهارات (${skills.length})` : `Skills (${skills.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: activeTab === 'settings' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: activeTab === 'settings' ? '#343c4d' : 'transparent',
                color: activeTab === 'settings' ? '#ffffff' : '#cbd5e1',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'settings' ? 700 : 500,
                cursor: 'pointer',
                textAlign: dir === 'rtl' ? 'right' : 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <Settings size={18} color={activeTab === 'settings' ? '#ffffff' : '#94a3b8'} />
              <span>{lang === 'ar' ? 'إعدادات الموقع' : 'Settings'}</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* Language Switcher in Sidebar */}
          <button
            onClick={toggleLanguage}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Globe size={16} />
            <span>{lang === 'ar' ? 'English Language' : 'اللغة العربية'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#e2e8f0',
              fontSize: '0.88rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Eye size={16} />
            <span>{lang === 'ar' ? 'عرض الموقع للزوار' : 'View Public Site'}</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#fda4af',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <LogOut size={16} />
            <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          padding: '36px 40px',
          overflowY: 'auto',
          background: '#1a1e27',
          textAlign: dir === 'rtl' ? 'right' : 'left',
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <Loader2 size={36} className="animate-spin" color="#ffffff" />
          </div>
        ) : (
          <>
            {/* Top Bar with Title and Quick Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                flexDirection: 'row',
              }}
            >
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {activeTab === 'overview' && (lang === 'ar' ? 'نظرة عامة وإحصائيات النظام' : 'System Overview & Metrics')}
                  {activeTab === 'projects' && (lang === 'ar' ? 'إدارة المشاريع' : 'Projects Management')}
                  {activeTab === 'reviews' && (lang === 'ar' ? 'مركز إدارة التقييمات والآراء' : 'Reviews Moderation Center')}
                  {activeTab === 'services' && (lang === 'ar' ? 'إدارة الخدمات البرمجية' : 'Services Management')}
                  {activeTab === 'skills' && (lang === 'ar' ? 'إدارة المهارات والتقنيات' : 'Skills Management')}
                  {activeTab === 'settings' && (lang === 'ar' ? 'إعدادات الملف والموقع' : 'Site & Profile Settings')}
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
                  {lang === 'ar' ? 'لوحة تحكم ريان أسامة - تحكم شامل بجميع البيانات' : 'Control center for Ryan Osama portfolio system'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={loadAllData}
                  className="btn btn-secondary btn-sm"
                  style={{
                    background: '#2b3240',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                  title={lang === 'ar' ? 'تحديث البيانات' : 'Refresh'}
                >
                  <RefreshCw size={15} />
                  <span>{lang === 'ar' ? 'تحديث' : 'Refresh'}</span>
                </button>

                {activeTab === 'projects' && (
                  <button
                    onClick={openNewProjectModal}
                    className="btn btn-primary btn-sm"
                    style={{
                      background: '#ffffff',
                      color: '#000000',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={16} />
                    <span>{lang === 'ar' ? 'مشروع جديد' : 'New Project'}</span>
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
                    style={{
                      background: '#ffffff',
                      color: '#000000',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={16} />
                    <span>{lang === 'ar' ? 'خدمة جديدة' : 'New Service'}</span>
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
                    style={{
                      background: '#ffffff',
                      color: '#000000',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={16} />
                    <span>{lang === 'ar' ? 'مهارة جديدة' : 'New Skill'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px',
                    marginBottom: '32px',
                  }}
                >
                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}>
                      {lang === 'ar' ? 'إجمالي المشاريع' : 'Total Projects'}
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
                      {dashboardData?.stats?.totalProjects ?? 0}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px', fontWeight: 600 }}>
                      {dashboardData?.stats?.featuredProjects ?? 0} {lang === 'ar' ? 'مميز على الرئيسية' : 'Featured'}
                    </div>
                  </div>

                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}>
                      {lang === 'ar' ? 'التقييمات المعتمدة' : 'Approved Reviews'}
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
                      {dashboardData?.stats?.approvedReviews ?? 0}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar' ? 'منشورة وتظهر للزوار' : 'Live and visible'}
                    </div>
                  </div>

                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}>
                      {lang === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
                      {dashboardData?.stats?.averageRating ?? 5.0} / 5
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar' ? 'تقييم ممتاز 100%' : '5-star quality rating'}
                    </div>
                  </div>

                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}>
                      {lang === 'ar' ? 'الخدمات والمهارات' : 'Services & Skills'}
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
                      {dashboardData?.stats?.totalServices ?? 0}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar'
                        ? `مع ${dashboardData?.stats?.totalSkills ?? 0} مهارة تقنية`
                        : `& ${dashboardData?.stats?.totalSkills ?? 0} configured skills`}
                    </div>
                  </div>

                  {/* Visitors Live Card */}
                  <div
                    onClick={() => setActiveTab('visitors')}
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600 }}>
                        {lang === 'ar' ? 'حركة وزوار اليوم' : "Today's Visitors"}
                      </span>
                      <Users size={18} color="#38bdf8" />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8', marginTop: '6px' }}>
                      {analyticsData?.todayVisits ?? 0}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
                      {analyticsData?.activeNow > 0
                        ? (lang === 'ar' ? `🟢 ${analyticsData.activeNow} متواجدون الآن` : `🟢 ${analyticsData.activeNow} active now`)
                        : (lang === 'ar' ? 'اضغط لعرض مدة البقاء والتفاصيل' : 'Click to view details')}
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div
                  style={{
                    background: '#2b3240',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                    {lang === 'ar' ? 'إجراءات سريعة' : 'Quick Management Actions'}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    >
                      <FolderGit2 size={16} />
                      <span>{lang === 'ar' ? 'تعديل أو إضافة مشاريع' : 'Manage Projects'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    >
                      <MessageSquareCheck size={16} />
                      <span>{lang === 'ar' ? 'مراجعة التقييمات' : 'Moderate Reviews'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    >
                      <Wrench size={16} />
                      <span>{lang === 'ar' ? 'تحديث الخدمات' : 'Manage Services'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="btn btn-secondary btn-sm"
                      style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    >
                      <Settings size={16} />
                      <span>{lang === 'ar' ? 'تعديل بيانات التواصل' : 'Edit Contact Info'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div
                style={{
                  background: '#2b3240',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  overflowX: 'auto',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#cbd5e1',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                      }}
                    >
                      <th style={{ padding: '14px 12px' }}>{lang === 'ar' ? 'المشروع' : 'Project'}</th>
                      <th style={{ padding: '14px 12px' }}>{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                      <th style={{ padding: '14px 12px' }}>{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                      <th style={{ padding: '14px 12px' }}>{lang === 'ar' ? 'التقييمات' : 'Reviews'}</th>
                      <th style={{ padding: '14px 12px' }}>{lang === 'ar' ? 'الرابط' : 'Links'}</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center' }}>{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr
                        key={proj.id}
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                          transition: 'background 0.2s ease',
                        }}
                      >
                        <td style={{ padding: '16px 12px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#ffffff' }}>{proj.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/projects/{proj.slug}</div>
                        </td>
                        <td style={{ padding: '16px 12px', color: '#cbd5e1', fontSize: '0.9rem' }}>
                          {proj.category?.name || (lang === 'ar' ? 'عام' : 'Uncategorized')}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              color: '#ffffff',
                            }}
                          >
                            {proj.status === 'COMPLETED' ? (lang === 'ar' ? 'مكتمل' : 'COMPLETED') : proj.status}
                          </span>
                          {proj.isFeatured && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '3px 10px',
                                borderRadius: '9999px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                background: '#3b4558',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                color: '#ffffff',
                                marginInlineStart: '6px',
                              }}
                            >
                              {lang === 'ar' ? 'مميز' : 'Featured'}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '16px 12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                          {proj._count?.reviews || 0} {lang === 'ar' ? 'تقييم' : 'reviews'}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <Link
                            href={`/projects/${proj.slug}`}
                            target="_blank"
                            className="btn btn-secondary btn-sm"
                            style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                            title={lang === 'ar' ? 'عرض الصفحة' : 'View Page'}
                          >
                            <ExternalLink size={14} />
                          </Link>
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button
                              onClick={() => openEditProjectModal(proj)}
                              className="btn btn-secondary btn-sm"
                              style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                              title={lang === 'ar' ? 'تعديل' : 'Edit'}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="btn btn-danger btn-sm"
                              style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fda4af' }}
                              title={lang === 'ar' ? 'حذف' : 'Delete'}
                            >
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

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <div>
                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {(['all', 'approved', 'pending', 'rejected'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setReviewFilter(st)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: reviewFilter === st ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                        background: reviewFilter === st ? '#ffffff' : '#2b3240',
                        color: reviewFilter === st ? '#000000' : '#e2e8f0',
                        fontFamily: 'inherit',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {st === 'all' && (lang === 'ar' ? `جميع التقييمات (${reviews.length})` : `All Reviews (${reviews.length})`)}
                      {st === 'approved' && (lang === 'ar' ? `المقبولة (${reviews.filter((r) => r.status === 'approved').length})` : `Approved (${reviews.filter((r) => r.status === 'approved').length})`)}
                      {st === 'pending' && (lang === 'ar' ? `المعلقة (${reviews.filter((r) => r.status === 'pending').length})` : `Pending (${reviews.filter((r) => r.status === 'pending').length})`)}
                      {st === 'rejected' && (lang === 'ar' ? `المرفوضة (${reviews.filter((r) => r.status === 'rejected').length})` : `Rejected (${reviews.filter((r) => r.status === 'rejected').length})`)}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        background: '#2b3240',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '16px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>{rev.name}</div>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              background: rev.status === 'approved' ? 'rgba(16, 185, 129, 0.15)' : rev.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                              border: rev.status === 'approved' ? '1px solid rgba(16, 185, 129, 0.3)' : rev.status === 'pending' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
                              color: rev.status === 'approved' ? '#6ee7b7' : rev.status === 'pending' ? '#fde047' : '#fda4af',
                            }}
                          >
                            {rev.status === 'approved' ? (lang === 'ar' ? 'مقبول' : 'Approved') : rev.status === 'pending' ? (lang === 'ar' ? 'قيد المراجعة' : 'Pending') : (lang === 'ar' ? 'مرفوض' : 'Rejected')}
                          </span>
                        </div>

                        {rev.project && (
                          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '10px', fontWeight: 600 }}>
                            {lang === 'ar' ? 'المشروع: ' : 'Project: '}
                            <span style={{ color: '#ffffff' }}>{rev.project.title}</span>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={15}
                              fill={s <= rev.rating ? '#ffffff' : 'none'}
                              color={s <= rev.rating ? '#ffffff' : '#64748b'}
                            />
                          ))}
                        </div>

                        <p style={{ color: '#e2e8f0', fontSize: '0.94rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '18px' }}>
                          "{rev.comment}"
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                            className="btn btn-sm"
                            style={{ flex: 1, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7' }}
                          >
                            <CheckCircle2 size={14} />
                            <span>{lang === 'ar' ? 'قبول' : 'Approve'}</span>
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                            className="btn btn-sm"
                            style={{ flex: 1, background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                          >
                            <XCircle size={14} />
                            <span>{lang === 'ar' ? 'رفض' : 'Reject'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="btn btn-sm"
                          style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fda4af' }}
                          title={lang === 'ar' ? 'حذف' : 'Delete'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{srv.title}</h3>
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
                          style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="btn btn-danger btn-sm"
                          style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fda4af' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7 }}>
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
                  <div
                    key={skl.id}
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '18px 20px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem' }}>{skl.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>{skl.category}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>{skl.level}%</span>
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
                          style={{ padding: '6px 10px', background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skl.id)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '6px 10px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fda4af' }}
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
              <div
                style={{
                  background: '#2b3240',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '36px',
                  maxWidth: '850px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                }}
              >
                <form onSubmit={handleSaveSettings}>
                  <div className="form-group" style={{ marginBottom: '1.4rem' }}>
                    <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                      {lang === 'ar' ? 'الاسم الكامل للبروفايل' : 'Owner Full Name'}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={siteSettings['owner_name'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, owner_name: e.target.value })}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.4rem' }}>
                    <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                      {lang === 'ar' ? 'المسمى الوظيفي / العنوان الرئيسي' : 'Headline / Subtitle'}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={siteSettings['headline'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, headline: e.target.value })}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.4rem' }}>
                    <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                      {lang === 'ar' ? 'النبذة التعريفية (Bio)' : 'Biography'}
                    </label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      value={siteSettings['bio'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, bio: e.target.value })}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '1.4rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        value={siteSettings['email'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                        {lang === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={siteSettings['phone'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                      />
                    </div>
                  </div>

                  {/* Social Profile Links (GitHub & LinkedIn) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '1.4rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                        {lang === 'ar' ? 'رابط حساب GitHub' : 'GitHub Profile URL'}
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        className="form-input"
                        value={siteSettings['github_url'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, github_url: e.target.value })}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                        {lang === 'ar' ? 'رابط حساب LinkedIn' : 'LinkedIn Profile URL'}
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        className="form-input"
                        value={siteSettings['linkedin_url'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, linkedin_url: e.target.value })}
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.4rem' }}>
                    <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                      {lang === 'ar' ? 'الموقع الجغرافي / العنوان' : 'Location / Availability'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'اليمن - حضرموت (متاح للعمل عن بعد)' : 'Yemen - Hadramout (Available Remotely Worldwide)'}
                      className="form-input"
                      value={siteSettings['location'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, location: e.target.value })}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      background: '#ffffff',
                      color: '#000000',
                      fontWeight: 700,
                      padding: '12px 24px',
                      borderRadius: '10px',
                    }}
                  >
                    <span>{lang === 'ar' ? 'حفظ التغييرات' : 'Save Settings'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: VISITORS & TRAFFIC */}
            {activeTab === 'visitors' && (
              <div>
                {/* Privacy Banner */}
                <div
                  style={{
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '14px',
                    padding: '14px 20px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.88rem',
                    color: '#93c5fd',
                  }}
                >
                  <Activity size={20} color="#38bdf8" />
                  <div>
                    <strong style={{ color: '#ffffff' }}>
                      {lang === 'ar' ? 'إحصائيات حقيقية بالكامل ومحترمة للخصوصية:' : '100% Real, Privacy-Friendly Analytics:'}
                    </strong>{' '}
                    {lang === 'ar'
                      ? 'يتم احتساب عدد الزوار الفعليين ومدة بقائهم بدقة في الوقت الفعلي دون تسجيل أو حفظ أي عناوين IP أو بيانات سرية.'
                      : 'Accurate real-time tracking of visitor counts and dwell time without logging IP addresses or tracking sensitive data.'}
                  </div>
                </div>

                {/* Key Metrics Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                    gap: '18px',
                    marginBottom: '28px',
                  }}
                >
                  {/* Today's Visitors */}
                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '22px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.86rem', fontWeight: 600 }}>
                        {lang === 'ar' ? 'زوار اليوم' : "Today's Visitors"}
                      </span>
                      <Calendar size={18} color="#38bdf8" />
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', marginTop: '8px' }}>
                      {analyticsData?.todayVisits ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar' ? 'أشخاص دخلوا الموقع اليوم' : 'Unique visits today'}
                    </div>
                  </div>

                  {/* Active Now */}
                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '16px',
                      padding: '22px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.86rem', fontWeight: 600 }}>
                        {lang === 'ar' ? 'المتواجدون الآن بالموقع' : 'Active Right Now'}
                      </span>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#10b981',
                          boxShadow: '0 0 10px #10b981',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#34d399', marginTop: '8px' }}>
                      {analyticsData?.activeNow ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar' ? 'يتصفحون الموقع في هذه اللحظة' : 'Browsing the site live'}
                    </div>
                  </div>

                  {/* Avg Time Spent */}
                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '22px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.86rem', fontWeight: 600 }}>
                        {lang === 'ar' ? 'متوسط وقت البقاء' : 'Avg Time Spent'}
                      </span>
                      <Clock size={18} color="#f59e0b" />
                    </div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '8px' }}>
                      {(() => {
                        const sec = analyticsData?.avgDurationSeconds ?? 0;
                        if (sec < 60) return `${sec} ${lang === 'ar' ? 'ثانية' : 'sec'}`;
                        const min = Math.floor(sec / 60);
                        const remSec = sec % 60;
                        return `${min} ${lang === 'ar' ? 'د' : 'm'} ${remSec} ${lang === 'ar' ? 'ث' : 's'}`;
                      })()}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar' ? 'معدل المدة التي يقضيها الزائر' : 'Average session duration'}
                    </div>
                  </div>

                  {/* Total Visits */}
                  <div
                    style={{
                      background: '#2b3240',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '22px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.86rem', fontWeight: 600 }}>
                        {lang === 'ar' ? 'إجمالي الزيارات' : 'Total Visits'}
                      </span>
                      <Users size={18} color="#a855f7" />
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', marginTop: '8px' }}>
                      {analyticsData?.totalVisits ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                      {lang === 'ar' ? 'إجمالي كل الزيارات المسجلة' : 'All-time visit sessions'}
                    </div>
                  </div>
                </div>

                {/* Table Header & Controls */}
                <div
                  style={{
                    background: '#212631',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '14px',
                      marginBottom: '20px',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', color: '#ffffff' }}>
                        {lang === 'ar' ? 'سجل الزيارات والوقت المستغرق' : 'Visitor Activity & Time Spent'}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0 }}>
                        {lang === 'ar'
                          ? 'يعرض توقيت دخول كل زائر، الصفحة، وكم دقيقة/ثانية قضاها في الموقع'
                          : 'Shows visitor entry time, visited page, and duration spent on site'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => setVisitorFilter('today')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: visitorFilter === 'today' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                          background: visitorFilter === 'today' ? '#38bdf8' : '#2b3240',
                          color: visitorFilter === 'today' ? '#000000' : '#cbd5e1',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {lang === 'ar' ? 'زيارات اليوم' : "Today's Visits"}
                      </button>
                      <button
                        onClick={() => setVisitorFilter('all')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: visitorFilter === 'all' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                          background: visitorFilter === 'all' ? '#38bdf8' : '#2b3240',
                          color: visitorFilter === 'all' ? '#000000' : '#cbd5e1',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {lang === 'ar' ? 'كل الزيارات' : 'All Visits'}
                      </button>
                    </div>
                  </div>

                  {/* Real Visitors Table */}
                  {(() => {
                    const allVisits = analyticsData?.recentVisits || [];
                    const filteredVisits = visitorFilter === 'today'
                      ? allVisits.filter((v: any) => new Date(v.startedAt).toDateString() === new Date().toDateString())
                      : allVisits;

                    if (filteredVisits.length === 0) {
                      return (
                        <div
                          style={{
                            padding: '48px 20px',
                            textAlign: 'center',
                            color: '#94a3b8',
                            background: '#2b3240',
                            borderRadius: '12px',
                            border: '1px dashed rgba(255, 255, 255, 0.15)',
                          }}
                        >
                          <Users size={36} color="#94a3b8" style={{ marginBottom: '10px', opacity: 0.6 }} />
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                            {lang === 'ar' ? 'لا توجد زيارات مسجلة حتى الآن' : 'No visits recorded yet'}
                          </div>
                          <div style={{ fontSize: '0.84rem', marginTop: '4px' }}>
                            {lang === 'ar'
                              ? 'بمجرد أن يفتح أي شخص رابط موقعك ستظهر تفاصيله ومدة بقائه هنا مباشرة'
                              : 'As soon as anyone opens your site, their activity and duration will appear here live'}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: '0.82rem' }}>
                              <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                              <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'وقت الدخول (الساعة)' : 'Entry Time'}</th>
                              <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'كم قعد بالموقع (المدة)' : 'Time Spent'}</th>
                              <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'الصفحة' : 'Page'}</th>
                              <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'الجهاز' : 'Device'}</th>
                              <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'المتصفح' : 'Browser'}</th>
                              {allVisits.some((v: any) => v.country) && (
                                <th style={{ padding: '12px 14px' }}>{lang === 'ar' ? 'الدولة' : 'Country'}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredVisits.map((visit: any, index: number) => {
                              const startedDate = new Date(visit.startedAt);
                              const isLive = (Date.now() - new Date(visit.lastPingAt).getTime()) < 90000;
                              const dur = visit.durationSeconds || 0;

                              const formatDuration = (s: number) => {
                                if (s === 0) return lang === 'ar' ? 'أقل من 15 ثانية' : '< 15 sec';
                                if (s < 60) return `${s} ${lang === 'ar' ? 'ثانية' : 'sec'}`;
                                const m = Math.floor(s / 60);
                                const rem = s % 60;
                                return `${m} ${lang === 'ar' ? 'دقيقة' : 'min'} ${rem > 0 ? `و ${rem} ${lang === 'ar' ? 'ثانية' : 'sec'}` : ''}`;
                              };

                              return (
                                <tr
                                  key={visit.id || index}
                                  style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                    fontSize: '0.86rem',
                                    transition: 'background 0.15s ease',
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                  {/* Status */}
                                  <td style={{ padding: '14px' }}>
                                    {isLive ? (
                                      <span
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          background: 'rgba(16, 185, 129, 0.15)',
                                          color: '#34d399',
                                          border: '1px solid rgba(16, 185, 129, 0.3)',
                                          padding: '3px 9px',
                                          borderRadius: '20px',
                                          fontSize: '0.74rem',
                                          fontWeight: 700,
                                        }}
                                      >
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                                        {lang === 'ar' ? 'نشط الآن' : 'Active Now'}
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          background: 'rgba(148, 163, 184, 0.1)',
                                          color: '#94a3b8',
                                          padding: '3px 9px',
                                          borderRadius: '20px',
                                          fontSize: '0.74rem',
                                          fontWeight: 600,
                                        }}
                                      >
                                        {lang === 'ar' ? 'غادر' : 'Left'}
                                      </span>
                                    )}
                                  </td>

                                  {/* Entry Time */}
                                  <td style={{ padding: '14px', fontWeight: 700, color: '#ffffff' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <Clock size={14} color="#38bdf8" />
                                      <span>
                                        {startedDate.toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          hour12: true,
                                        })}
                                      </span>
                                    </div>
                                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px', fontWeight: 500 }}>
                                      {startedDate.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: startedDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                                      })}
                                    </div>
                                  </td>

                                  {/* Duration */}
                                  <td style={{ padding: '14px' }}>
                                    <span
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        background: dur >= 60 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                                        color: dur >= 60 ? '#38bdf8' : '#e2e8f0',
                                        fontWeight: 700,
                                        fontSize: '0.84rem',
                                      }}
                                    >
                                      {formatDuration(dur)}
                                    </span>
                                  </td>

                                  {/* Visited Page */}
                                  <td style={{ padding: '14px', color: '#cbd5e1' }}>
                                    <code
                                      style={{
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        color: '#f8fafc',
                                      }}
                                    >
                                      {visit.page || '/'}
                                    </code>
                                  </td>

                                  {/* Device */}
                                  <td style={{ padding: '14px', color: '#cbd5e1' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      {visit.device === 'Mobile' ? (
                                        <>
                                          <Smartphone size={15} color="#ec4899" />
                                          <span>{lang === 'ar' ? 'جوال' : 'Mobile'}</span>
                                        </>
                                      ) : (
                                        <>
                                          <Monitor size={15} color="#60a5fa" />
                                          <span>{lang === 'ar' ? 'كمبيوتر' : 'Desktop'}</span>
                                        </>
                                      )}
                                    </div>
                                  </td>

                                  {/* Browser */}
                                  <td style={{ padding: '14px', color: '#94a3b8' }}>
                                    {visit.browser || 'Browser'}
                                  </td>

                                  {/* Country */}
                                  {allVisits.some((v: any) => v.country) && (
                                    <td style={{ padding: '14px', color: '#e2e8f0', fontWeight: 600 }}>
                                      {visit.country || '-'}
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* PROJECT MODAL */}
      {projectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: dir === 'rtl' ? 'right' : 'left',
          }}
          onClick={() => setProjectModalOpen(false)}
        >
          <div
            className="animate-fade-in"
            style={{
              width: '95vw',
              maxWidth: '1080px',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: '#212631',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '36px 40px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                {editingProject
                  ? (lang === 'ar' ? 'تعديل بيانات المشروع' : 'Edit Project')
                  : (lang === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project')}
              </h2>
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  color: '#94a3b8',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title={lang === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'عنوان المشروع *' : 'Project Title *'}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'المعرف الرابط (Slug) *' : 'Slug *'}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'الوصف المختصر *' : 'Short Description *'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'الوصف الكامل والشامل *' : 'Full Description *'}</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'المشكلة / التحدي' : 'The Problem / Challenge'}</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={projectForm.problem}
                    onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'الحل البرمجي والابتكار' : 'The Solution'}</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'صورة الغلاف' : 'Cover Image'}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.coverImage}
                    onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                  <label
                    className="btn btn-secondary btn-sm"
                    style={{
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#343c4d',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                    }}
                  >
                    <UploadCloud size={16} />
                    <span>{uploadingImage ? (lang === 'ar' ? 'جاري الرفع...' : 'Uploading...') : (lang === 'ar' ? 'رفع صورة' : 'Upload')}</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {projectForm.coverImage && (
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '130px',
                        height: '70px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: '#0f172a',
                      }}
                    >
                      <img
                        src={projectForm.coverImage}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {lang === 'ar' ? 'معاينة الصورة المختارة الحالية' : 'Cover image preview'}
                    </span>
                  </div>
                )}
              </div>

              {/* Links & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'رابط المعاينة المباشرة' : 'Live Demo URL'}</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'رابط GitHub' : 'GitHub URL'}</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'التصنيف' : 'Category'}</label>
                  <select
                    className="form-select"
                    value={projectForm.categoryId}
                    onChange={(e) => setProjectForm({ ...projectForm, categoryId: e.target.value })}
                    style={{ background: '#2b3240', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                  >
                    <option value="">{lang === 'ar' ? 'بدون تصنيف' : 'None'}</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Technologies with Categorized Tabs */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ color: '#e2e8f0', marginBottom: 0 }}>
                    {lang === 'ar' ? 'التقنيات المستخدمة في المشروع' : 'Project Technologies'}
                  </label>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                    {lang === 'ar' ? `${projectForm.technologyIds.length} تقنية محددة` : `${projectForm.technologyIds.length} selected`}
                  </span>
                </div>

                {/* Selected Technologies Preview Chips */}
                {projectForm.technologyIds.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px dashed rgba(255, 255, 255, 0.25)',
                      borderRadius: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', marginRight: '4px' }}>
                      {lang === 'ar' ? 'المحدد حالياً:' : 'Selected:'}
                    </span>
                    {projectForm.technologyIds.map((techId) => {
                      const tech = technologies.find((t) => t.id === techId);
                      if (!tech) return null;
                      return (
                        <span
                          key={techId}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#ffffff',
                            color: '#000000',
                            padding: '3px 10px',
                            borderRadius: '20px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          }}
                        >
                          {tech.name}
                          <button
                            type="button"
                            onClick={() => {
                              setProjectForm((prev) => ({
                                ...prev,
                                technologyIds: prev.technologyIds.filter((id) => id !== techId),
                              }));
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#000000',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: 0,
                            }}
                            title={lang === 'ar' ? 'إزالة' : 'Remove'}
                          >
                            <X size={13} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Category Navigation Tabs */}
                {(() => {
                  const uniqueCategories = Array.from(
                    new Set([
                      'Frontend',
                      'Backend',
                      'Database',
                      'DevOps',
                      ...technologies.map((t) => t.category || 'General'),
                    ])
                  ).filter(Boolean);

                  const getCategoryLabel = (cat: string) => {
                    if (cat === 'ALL') return lang === 'ar' ? '🌟 الكل' : '🌟 All';
                    if (cat.toLowerCase() === 'frontend') return lang === 'ar' ? '🎨 فرونت إند (Frontend)' : '🎨 Frontend';
                    if (cat.toLowerCase() === 'backend') return lang === 'ar' ? '⚙️ باك إند (Backend)' : '⚙️ Backend';
                    if (cat.toLowerCase() === 'database') return lang === 'ar' ? '🗄️ قواعد بيانات (Database)' : '🗄️ Database';
                    if (cat.toLowerCase() === 'devops') return lang === 'ar' ? '🚀 ديف أوبس (DevOps)' : '🚀 DevOps';
                    if (cat.toLowerCase() === 'storage') return lang === 'ar' ? '☁️ التخزين السحابي (Storage)' : '☁️ Storage';
                    if (cat.toLowerCase() === 'language') return lang === 'ar' ? '💻 لغات البرمجة (Languages)' : '💻 Languages';
                    return cat;
                  };

                  const categoriesList = ['ALL', ...uniqueCategories];

                  const filteredTechs =
                    selectedTechCategory === 'ALL'
                      ? technologies
                      : technologies.filter(
                          (t) => (t.category || 'General').toLowerCase() === selectedTechCategory.toLowerCase()
                        );

                  return (
                    <div>
                      {/* Tabs Header */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '6px',
                          overflowX: 'auto',
                          paddingBottom: '8px',
                          marginBottom: '10px',
                        }}
                      >
                        {categoriesList.map((cat) => {
                          const isActive = selectedTechCategory.toLowerCase() === cat.toLowerCase();
                          const count =
                            cat === 'ALL'
                              ? technologies.length
                              : technologies.filter(
                                  (t) => (t.category || 'General').toLowerCase() === cat.toLowerCase()
                                ).length;

                          return (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => setSelectedTechCategory(cat)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: isActive ? 700 : 500,
                                whiteSpace: 'nowrap',
                                border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                                background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                color: isActive ? '#38bdf8' : '#cbd5e1',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              {getCategoryLabel(cat)} ({count})
                            </button>
                          );
                        })}
                      </div>

                      {/* Tech Options for Active Category */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          maxHeight: '220px',
                          overflowY: 'auto',
                          padding: '14px',
                          background: 'rgba(0, 0, 0, 0.25)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {filteredTechs.length === 0 ? (
                          <div style={{ color: '#64748b', fontSize: '0.82rem', padding: '6px' }}>
                            {lang === 'ar' ? 'لا توجد تقنيات مسجلة في هذا القسم بعد' : 'No technologies in this category yet'}
                          </div>
                        ) : (
                          filteredTechs.map((t) => {
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
                                  padding: '7px 14px',
                                  borderRadius: '8px',
                                  border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                                  background: isSelected ? '#38bdf8' : '#2b3240',
                                  color: isSelected ? '#000000' : '#cbd5e1',
                                  fontSize: '0.84rem',
                                  fontWeight: isSelected ? 800 : 600,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {isSelected && <Check size={13} />}
                                {t.name}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Project Features (Optional Section) */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ color: '#e2e8f0', marginBottom: 0 }}>
                    {lang === 'ar' ? 'أبرز مميزات ووظائف المشروع (اختياري)' : 'Key Project Features (Optional)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectForm((prev) => ({
                        ...prev,
                        features: [...prev.features, { title: '', description: '', sortOrder: prev.features.length }],
                      }));
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Plus size={13} />
                    {lang === 'ar' ? 'إضافة ميزة' : 'Add Feature'}
                  </button>
                </div>

                {projectForm.features.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {projectForm.features.map((feat, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, minWidth: '22px' }}>
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          placeholder={lang === 'ar' ? 'اكتب اسم أو ميزة المشروع هنا (مثال: نظام صلاحيات متقدم، بوابات دفع إلكترونية...)' : 'Enter feature name'}
                          className="form-input"
                          value={feat.title}
                          onChange={(e) => {
                            const newFeatures = [...projectForm.features];
                            newFeatures[idx].title = e.target.value;
                            setProjectForm({ ...projectForm, features: newFeatures });
                          }}
                          style={{
                            flex: 1,
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            fontSize: '0.86rem',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setProjectForm({
                              ...projectForm,
                              features: projectForm.features.filter((_, i) => i !== idx),
                            });
                          }}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            borderRadius: '8px',
                            padding: '8px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title={lang === 'ar' ? 'حذف الميزة' : 'Delete'}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    {lang === 'ar'
                      ? 'لا توجد مميزات مضافة حالياً. يمكنك تركها فارغة أو إضافة مميزات مخصصة للمشروع.'
                      : 'No custom features added. You can leave this empty or add specific highlights.'}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem', color: '#ffffff' }}>
                  <input
                    type="checkbox"
                    checked={projectForm.isFeatured}
                    onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                  />
                  <span>{lang === 'ar' ? 'إبراز المشروع على الصفحة الرئيسية' : 'Feature on homepage'}</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#ffffff', color: '#000000', fontWeight: 700 }}
                >
                  {lang === 'ar' ? 'حفظ المشروع' : 'Save Project'}
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
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: dir === 'rtl' ? 'right' : 'left',
          }}
          onClick={() => setServiceModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#212631',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', color: '#ffffff' }}>
              {editingService
                ? (lang === 'ar' ? 'تعديل الخدمة' : 'Edit Service')
                : (lang === 'ar' ? 'إضافة خدمة جديدة' : 'New Service')}
            </h2>
            <form onSubmit={handleSaveService}>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'عنوان الخدمة' : 'Service Title'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.4rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'وصف الخدمة' : 'Description'}</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#ffffff', color: '#000000', fontWeight: 700 }}
                >
                  {lang === 'ar' ? 'حفظ' : 'Save'}
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
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: dir === 'rtl' ? 'right' : 'left',
          }}
          onClick={() => setSkillModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              background: '#212631',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', color: '#ffffff' }}>
              {editingSkill
                ? (lang === 'ar' ? 'تعديل المهارة' : 'Edit Skill')
                : (lang === 'ar' ? 'إضافة مهارة جديدة' : 'New Skill')}
            </h2>
            <form onSubmit={handleSaveSkill}>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'اسم المهارة / التقنية' : 'Skill Name'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>{lang === 'ar' ? 'التصنيف' : 'Category'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Frontend, Backend, Database..."
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: '#ffffff' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.4rem' }}>
                <label className="form-label" style={{ color: '#e2e8f0' }}>
                  {lang === 'ar' ? `مستوى الإتقان (${skillForm.level}%)` : `Proficiency (${skillForm.level}%)`}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="form-input"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                  style={{ accentColor: '#ffffff' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ background: '#343c4d', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#ffffff', color: '#000000', fontWeight: 700 }}
                >
                  {lang === 'ar' ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
