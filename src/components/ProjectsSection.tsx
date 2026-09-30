'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, ArrowLeft, Star, Layers, MessageSquare } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ReviewModal } from './ReviewModal';
import { useLanguage } from '@/context/LanguageContext';
import { projectTranslations, categoryTranslations } from '@/lib/i18nContent';

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
  const { t, lang, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [selectedCat, setSelectedCat] = useState('all');
  const [activeReviewProject, setActiveReviewProject] = useState<{ id: string; title: string } | null>(null);

  const getLocalizedProject = (p: ProjectItem) => {
    const tr = projectTranslations[p.slug];
    if (tr) {
      return {
        title: lang === 'en' ? tr.en.title : tr.ar.title,
        shortDescription: lang === 'en' ? tr.en.shortDescription : tr.ar.shortDescription,
      };
    }
    return {
      title: p.title,
      shortDescription: p.shortDescription,
    };
  };

  const getLocalizedCategoryName = (cat: Category) => {
    const tr = categoryTranslations[cat.slug];
    if (tr) {
      return lang === 'en' ? tr.en : tr.ar;
    }
    return cat.name;
  };

  const filteredProjects =
    selectedCat === 'all'
      ? projects
      : projects.filter((p) => p.category?.slug === selectedCat);

  return (
    <section id="projects" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>

          {/* Category Filter */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: selectedCat === 'all' ? '1px solid #ffffff' : '1px solid var(--border-color)',
                background: selectedCat === 'all' ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCat === 'all' ? '#090d16' : 'var(--text-secondary)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease',
              }}
            >
              {t.projects.allProjects} ({projects.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.slug)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: selectedCat === cat.slug ? '1px solid #ffffff' : '1px solid var(--border-color)',
                  background: selectedCat === cat.slug ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCat === cat.slug ? '#090d16' : 'var(--text-secondary)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.15s ease',
                }}
              >
                {getLocalizedCategoryName(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProjects.map((project) => {
            const locProj = getLocalizedProject(project);
            return (
              <div
                key={project.id}
                className="white-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                {/* Project Image Preview Header */}
                <div
                  style={{
                    position: 'relative',
                    height: '200px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  <Layers size={48} color="#94a3b8" style={{ opacity: 0.7 }} />

                  {/* Badges Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      ...(dir === 'rtl' ? { right: '14px' } : { left: '14px' }),
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    {project.category && (
                      <span className="badge badge-glow">
                        {getLocalizedCategoryName(project.category)}
                      </span>
                    )}
                    {project.isFeatured && (
                      <span className="badge badge-glow">
                        <Star size={12} color="#f8fafc" /> {t.projects.featured}
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
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginBottom: '10px',
                        color: 'var(--text-main)',
                      }}
                    >
                      {locProj.title}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.7,
                        marginBottom: '20px',
                      }}
                    >
                      {locProj.shortDescription}
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
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#cbd5e1',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            fontWeight: 600,
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
                      borderTop: '1px solid var(--border-color)',
                    }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn btn-primary btn-sm"
                      style={{ padding: '8px 16px' }}
                    >
                      <span>{t.projects.viewDetails}</span>
                      <ArrowIcon size={14} />
                    </Link>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setActiveReviewProject({ id: project.id, title: locProj.title })}
                        className="btn btn-secondary btn-sm"
                        title={t.projects.addReview}
                        style={{ padding: '8px 12px' }}
                      >
                        <MessageSquare size={16} color="var(--text-secondary)" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          title={t.projects.githubRepo}
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
                          title={t.projects.liveDemo}
                          style={{ padding: '8px 12px' }}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Review Submission Modal */}
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
