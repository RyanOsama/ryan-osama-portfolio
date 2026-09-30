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
    } catch {
      showToast('Error loading dashboard data', 'error');
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
      showToast('Logged out successfully', 'success');
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
        showToast('Image uploaded successfully!', 'success');
      } else {
        showToast(data.message || 'Upload failed', 'error');
      }
    } catch {
      showToast('Error uploading image', 'error');
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
        showToast(editingProject ? 'Project updated' : 'Project added', 'success');
        setProjectModalOpen(false);
        loadAllData();
      } else {
        showToast(data.message || 'Error saving project', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Delete project "${title}" permanently?`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Project deleted successfully', 'success');
        loadAllData();
      } else {
        showToast(data.message || 'Delete failed', 'error');
      }
    } catch {
      showToast('Error deleting project', 'error');
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
        showToast(status === 'approved' ? 'Review approved & published' : 'Review rejected', 'success');
        loadAllData();
      }
    } catch {
      showToast('Error updating review', 'error');
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Delete review permanently?')) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Review deleted', 'success');
        loadAllData();
      }
    } catch {
      showToast('Error deleting review', 'error');
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
        showToast('Service saved', 'success');
        setServiceModalOpen(false);
        loadAllData();
      }
    } catch {
      showToast('Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete service?')) return;
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      showToast('Service deleted', 'success');
      loadAllData();
    } catch {
      showToast('Error deleting service', 'error');
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
        showToast('Skill saved', 'success');
        setSkillModalOpen(false);
        loadAllData();
      }
    } catch {
      showToast('Error saving skill', 'error');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete skill?')) return;
    try {
      await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      showToast('Skill deleted', 'success');
      loadAllData();
    } catch {
      showToast('Error deleting skill', 'error');
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
        showToast('Site settings updated', 'success');
      }
    } catch {
      showToast('Error updating settings', 'error');
    }
  };

  const filteredReviews =
    reviewFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.status === reviewFilter);

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: '#ffffff',
          borderRight: '1px solid var(--border-color)',
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
          <div style={{ padding: '0 12px 20px 12px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>Admin Dashboard</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, marginTop: '2px' }}>
              User: {adminUser.username}
            </div>
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '16px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'overview' ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <LayoutDashboard size={17} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'projects' ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === 'projects' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <FolderGit2 size={17} />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'reviews' ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === 'reviews' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquareCheck size={17} />
                <span>Reviews</span>
              </div>
              {pendingCount > 0 && (
                <span
                  style={{
                    background: '#e11d48',
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
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'services' ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === 'services' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <Wrench size={17} />
              <span>Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'skills' ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === 'skills' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <Cpu size={17} />
              <span>Skills ({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'settings' ? 'var(--primary-blue)' : 'transparent',
                color: activeTab === 'settings' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <Link
            href="/"
            target="_blank"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '9px 12px' }}
          >
            <Eye size={15} />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '9px 12px' }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <Loader2 size={32} className="animate-spin" color="var(--primary-blue)" />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {activeTab === 'overview' && 'System Overview & Metrics'}
                  {activeTab === 'projects' && 'Projects Management'}
                  {activeTab === 'reviews' && 'Reviews Moderation Center'}
                  {activeTab === 'services' && 'Services Management'}
                  {activeTab === 'skills' && 'Skills Management'}
                  {activeTab === 'settings' && 'Site & Profile Settings'}
                </h1>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={loadAllData} className="btn btn-secondary btn-sm" title="Refresh">
                  <RefreshCw size={14} />
                  <span>Refresh</span>
                </button>
                {activeTab === 'projects' && (
                  <button onClick={openNewProjectModal} className="btn btn-primary btn-sm">
                    <Plus size={15} />
                    <span>New Project</span>
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
                    <Plus size={15} />
                    <span>New Service</span>
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
                    <Plus size={15} />
                    <span>New Skill</span>
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px',
                  }}
                >
                  <div className="white-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 600 }}>Total Projects</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary-blue)', marginTop: '4px' }}>
                      {dashboardData?.stats?.totalProjects ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
                      {dashboardData?.stats?.featuredProjects ?? 0} Featured
                    </div>
                  </div>

                  <div className="white-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 600 }}>Pending Reviews</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: pendingCount > 0 ? '#e11d48' : '#059669', marginTop: '4px' }}>
                      {dashboardData?.stats?.pendingReviews ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Awaiting moderation
                    </div>
                  </div>

                  <div className="white-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 600 }}>Average Rating</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#d97706', marginTop: '4px' }}>
                      {dashboardData?.stats?.averageRating ?? 5.0} / 5
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      From {dashboardData?.stats?.approvedReviews ?? 0} approved reviews
                    </div>
                  </div>

                  <div className="white-card" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 600 }}>Services & Skills</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent-sky)', marginTop: '4px' }}>
                      {dashboardData?.stats?.totalServices ?? 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      & {dashboardData?.stats?.totalSkills ?? 0} skills configured
                    </div>
                  </div>
                </div>

                {pendingCount > 0 && (
                  <div
                    className="white-card"
                    style={{
                      padding: '20px 24px',
                      background: '#fff1f2',
                      borderColor: '#fecdd3',
                      marginBottom: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <ShieldAlert size={24} color="#e11d48" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#9f1239' }}>
                          You have {pendingCount} new review(s) waiting for approval
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#be123c' }}>
                          Reviews will not appear publicly until approved.
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('reviews')} className="btn btn-danger btn-sm">
                      Moderate Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="white-card" style={{ padding: '20px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <th style={{ padding: '12px' }}>Project</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Reviews</th>
                      <th style={{ padding: '12px' }}>Links</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr key={proj.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 12px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{proj.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/projects/{proj.slug}</div>
                        </td>
                        <td style={{ padding: '14px 12px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                          {proj.category?.name || 'Uncategorized'}
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className={proj.status === 'COMPLETED' ? 'badge badge-success' : 'badge badge-warning'}>
                            {proj.status}
                          </span>
                          {proj.isFeatured && (
                            <span className="badge badge-warning" style={{ marginLeft: '4px' }}>
                              Featured
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '0.88rem' }}>
                          {proj._count?.reviews || 0} reviews
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          <Link href={`/projects/${proj.slug}`} target="_blank" className="btn btn-secondary btn-sm" title="View Page">
                            <ExternalLink size={13} />
                          </Link>
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button onClick={() => openEditProjectModal(proj)} className="btn btn-secondary btn-sm" title="Edit">
                              <Edit2 size={13} />
                            </button>
                            <button onClick={() => handleDeleteProject(proj.id, proj.title)} className="btn btn-danger btn-sm" title="Delete">
                              <Trash2 size={13} />
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
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setReviewFilter(st)}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '9999px',
                        border: reviewFilter === st ? '1px solid var(--primary-blue)' : '1px solid var(--border-color)',
                        background: reviewFilter === st ? 'var(--primary-blue)' : '#ffffff',
                        color: reviewFilter === st ? '#ffffff' : 'var(--text-secondary)',
                        fontFamily: 'inherit',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {st === 'all' && `All Reviews (${reviews.length})`}
                      {st === 'pending' && `Pending (${reviews.filter((r) => r.status === 'pending').length})`}
                      {st === 'approved' && `Approved (${reviews.filter((r) => r.status === 'approved').length})`}
                      {st === 'rejected' && `Rejected (${reviews.filter((r) => r.status === 'rejected').length})`}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {filteredReviews.map((rev) => (
                    <div key={rev.id} className="white-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>{rev.name}</div>
                          <span
                            className={
                              rev.status === 'approved'
                                ? 'badge badge-success'
                                : rev.status === 'pending'
                                ? 'badge badge-warning'
                                : 'badge badge-danger'
                            }
                          >
                            {rev.status}
                          </span>
                        </div>

                        {rev.project && (
                          <div style={{ fontSize: '0.82rem', color: 'var(--primary-blue)', marginBottom: '8px', fontWeight: 600 }}>
                            Project: {rev.project.title}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              fill={s <= rev.rating ? '#d97706' : 'none'}
                              color={s <= rev.rating ? '#d97706' : '#cbd5e1'}
                            />
                          ))}
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '16px' }}>
                          "{rev.comment}"
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                            className="btn btn-success btn-sm"
                            style={{ flex: 1 }}
                          >
                            <CheckCircle2 size={14} />
                            <span>Approve</span>
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                            className="btn btn-secondary btn-sm"
                            style={{ flex: 1 }}
                          >
                            <XCircle size={14} />
                            <span>Reject</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="btn btn-danger btn-sm"
                          title="Delete"
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {services.map((srv) => (
                  <div key={srv.id} className="white-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{srv.title}</h3>
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
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => handleDeleteService(srv.id)} className="btn btn-danger btn-sm">
                          <Trash2 size={13} />
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
                  <div key={skl.id} className="white-card" style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{skl.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{skl.category}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--primary-blue)', fontSize: '0.9rem' }}>{skl.level}%</span>
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
              <div className="white-card" style={{ padding: '36px', maxWidth: '850px' }}>
                <form onSubmit={handleSaveSettings}>
                  <div className="form-group">
                    <label className="form-label">Owner Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={siteSettings['owner_name'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, owner_name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Headline</label>
                    <input
                      type="text"
                      className="form-input"
                      value={siteSettings['headline'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, headline: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      value={siteSettings['bio'] || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, bio: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={siteSettings['email'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp</label>
                      <input
                        type="text"
                        className="form-input"
                        value={siteSettings['phone'] || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>
                    <span>Save Settings</span>
                  </button>
                </form>
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
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setProjectModalOpen(false)}
        >
          <div
            className="white-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#ffffff',
              padding: '30px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSaveProject}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Project Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug *</label>
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
                <label className="form-label">Short Description *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Description *</label>
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
                  <label className="form-label">The Problem / Challenge</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={projectForm.problem}
                    onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">The Solution</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="form-group">
                <label className="form-label">Cover Image URL / Upload</label>
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
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
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

              {/* Links & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={projectForm.categoryId}
                    onChange={(e) => setProjectForm({ ...projectForm, categoryId: e.target.value })}
                  >
                    <option value="">None</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tech stack buttons */}
              <div className="form-group">
                <label className="form-label">Technologies</label>
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
                          border: isSelected ? '1px solid var(--primary-blue)' : '1px solid var(--border-color)',
                          background: isSelected ? 'var(--primary-blue)' : '#ffffff',
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

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem' }}>
                  <input
                    type="checkbox"
                    checked={projectForm.isFeatured}
                    onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                  />
                  <span>Feature on homepage</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setProjectModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Project
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
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setServiceModalOpen(false)}
        >
          <div
            className="white-card"
            style={{ width: '100%', maxWidth: '500px', background: '#ffffff', padding: '30px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
              {editingService ? 'Edit Service' : 'New Service'}
            </h2>
            <form onSubmit={handleSaveService}>
              <div className="form-group">
                <label className="form-label">Service Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
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
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
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
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSkillModalOpen(false)}
        >
          <div
            className="white-card"
            style={{ width: '100%', maxWidth: '460px', background: '#ffffff', padding: '30px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
              {editingSkill ? 'Edit Skill' : 'New Skill'}
            </h2>
            <form onSubmit={handleSaveSkill}>
              <div className="form-group">
                <label className="form-label">Skill / Technology Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
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
                <label className="form-label">Proficiency ({skillForm.level}%)</label>
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
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
