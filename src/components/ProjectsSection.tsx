'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Star, Layers, MessageSquare } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ReviewModal } from './ReviewModal';

interface Technology {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  isFeatured: boolean;
  category?: Category | null;
  technologies: Technology[];
  approvedReviewsCount?: number;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
  categories: Category[];
}

export function ProjectsSection({ projects, categories }: ProjectsSectionProps) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeReviewProject, setActiveReviewProject] = useState<{ id: string; title: string } | null>(null);

  const filteredProjects =
    selectedCat === 'all'
      ? projects
      : projects.filter((p) => p.category?.slug === selectedCat);

  return (
    <section id="projects" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>معرض الأعمال الحية</span>
          </div>
          <h2 className="section-title">المشاريع والأنظمة المنجزة</h2>
          <p className="section-subtitle">
            استعراض نماذج واقعية من الأنظمة المؤسسية وتطبيقات الويب التي قمت بتطويرها
          </p>

          {/* Category Filter */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: selectedCat === 'all' ? '1px solid var(--primary-glow)' : '1px solid rgba(255,255,255,0.1)',
                background: selectedCat === 'all' ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                color: selectedCat === 'all' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              جميع المشاريع ({projects.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.slug)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: selectedCat === cat.slug ? '1px solid var(--primary-glow)' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedCat === cat.slug ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                  color: selectedCat === cat.slug ? '#ffffff' : 'var(--text-secondary)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              {/* Project Image Preview */}
              <div
                style={{
                  position: 'relative',
                  height: '210px',
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
                  }}
                />

                <Layers size={48} color="#38bdf8" style={{ opacity: 0.6 }} />

                {/* Badges Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  {project.category && (
                    <span className="badge badge-glow" style={{ backdropFilter: 'blur(8px)' }}>
                      {project.category.name}
                    </span>
                  )}
                  {project.isFeatured && (
                    <span className="badge badge-warning" style={{ backdropFilter: 'blur(8px)' }}>
                      <Star size={12} fill="#f59e0b" /> مميز
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      marginBottom: '10px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                    }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                    {project.technologies.map((t) => (
                      <span
                        key={t.id}
                        style={{
                          fontSize: '0.78rem',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.05)',
                          color: '#cbd5e1',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '8px 16px' }}
                  >
                    <span>تفاصيل المشروع</span>
                    <ArrowLeft size={16} />
                  </Link>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setActiveReviewProject({ id: project.id, title: project.title })}
                      className="btn btn-secondary btn-sm"
                      title="أضف تقييمك للمشروع"
                      style={{ padding: '8px 12px' }}
                    >
                      <MessageSquare size={16} color="var(--primary-glow)" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        title="GitHub Repo"
                        style={{ padding: '8px 12px' }}
                      >
                        <GithubIcon size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        title="Live Demo"
                        style={{ padding: '8px 12px' }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal */}
        <ReviewModal
          isOpen={!!activeReviewProject}
          projectId={activeReviewProject?.id}
          projectTitle={activeReviewProject?.title}
          onClose={() => setActiveReviewProject(null)}
        />
      </div>
    </section>
  );
}
