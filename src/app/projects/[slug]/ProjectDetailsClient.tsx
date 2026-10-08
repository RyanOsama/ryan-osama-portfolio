'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Star,
  CheckCircle2,
  Layers,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { ReviewModal } from '@/components/ReviewModal';
import { useLanguage } from '@/context/LanguageContext';
import { projectTranslations, categoryTranslations } from '@/lib/i18nContent';

interface ProjectDetailsProps {
  project: any;
}

export function ProjectDetailsClient({ project }: ProjectDetailsProps) {
  const { t, lang, dir } = useLanguage();
  const ArrowBackIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [modalOpen, setModalOpen] = useState(false);

  const totalRating = project.reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0);
  const averageRating =
    project.reviews.length > 0 ? (totalRating / project.reviews.length).toFixed(1) : null;

  const tr = projectTranslations[project.slug];
  const title = lang === 'en' && tr?.en?.title ? tr.en.title : project.title;
  const shortDescription =
    lang === 'en' && tr?.en?.shortDescription ? tr.en.shortDescription : project.shortDescription;
  const description = lang === 'en' && tr?.en?.description ? tr.en.description : project.description;
  const problem = lang === 'en' && tr?.en?.problem ? tr.en.problem : project.problem;
  const solution = lang === 'en' && tr?.en?.solution ? tr.en.solution : project.solution;

  const features =
    project.features && project.features.length > 0
      ? project.features
      : tr && tr[lang]?.features
      ? tr[lang].features
      : [];

  const categoryName = project.category
    ? categoryTranslations[project.category.slug]
      ? lang === 'en'
        ? categoryTranslations[project.category.slug].en
        : categoryTranslations[project.category.slug].ar
      : project.category.name
    : null;

  return (
    <div className="container" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 700,
          }}
        >
          <ArrowBackIcon size={16} />
          <span>{t.projectDetails.backToProjects}</span>
        </Link>
      </div>

      {/* Cover Image Banner */}
      {project.coverImage && (
        <div
          className="white-card"
          style={{
            padding: 0,
            marginBottom: '28px',
            overflow: 'hidden',
            maxHeight: '380px',
            position: 'relative',
          }}
        >
          <img
            src={project.coverImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '380px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* Hero Header Card */}
      <div
        className="white-card"
        style={{
          padding: '40px',
          marginBottom: '35px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {categoryName && <span className="badge badge-glow">{categoryName}</span>}
          {project.isFeatured && (
            <span className="badge badge-glow">
              <Star size={12} color="#f8fafc" /> {t.projects.featured}
            </span>
          )}
          <span className="badge badge-glow">
            <CheckCircle2 size={12} /> {project.status === 'COMPLETED' ? t.projects.completed : project.status}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: '16px',
            lineHeight: 1.3,
            color: 'var(--text-main)',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '1.08rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '850px',
            marginBottom: '30px',
          }}
        >
          {shortDescription}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>{t.projects.liveDemo}</span>
              <ExternalLink size={16} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon size={16} />
              <span>{t.projects.githubRepo}</span>
            </a>
          )}

          <button onClick={() => setModalOpen(true)} className="btn btn-secondary">
            <MessageSquare size={16} color="var(--text-secondary)" />
            <span>{t.projectDetails.writeReview}</span>
          </button>
        </div>
      </div>

      {/* Main Breakdown: Problem vs Solution */}
      {(problem || solution) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '35px',
          }}
        >
          {problem && (
            <div
              className="white-card"
              style={{
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  color: '#f8fafc',
                }}
              >
                <AlertTriangle size={22} color="#94a3b8" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t.projectDetails.problemTitle}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.8 }}>
                {problem}
              </p>
            </div>
          )}

          {solution && (
            <div
              className="white-card"
              style={{
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  color: '#f8fafc',
                }}
              >
                <Lightbulb size={22} color="#94a3b8" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t.projectDetails.solutionTitle}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.8 }}>
                {solution}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Features & Technologies Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {/* Features list */}
        {features && features.length > 0 && (
          <div className="white-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
              {t.projectDetails.featuresTitle}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {features.map((feat: any, idx: number) => (
                <div key={feat.id || idx} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: '#cbd5e1', flexShrink: 0, marginTop: '2px' }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: 'var(--text-main)' }}>
                      {feat.title}
                    </div>
                    {feat.description && (
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                        {feat.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="white-card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
            {t.projectDetails.techStackTitle}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech: any) => (
              <div
                key={tech.id}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={14} color="#94a3b8" />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Detailed Overview */}
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
              {t.projectDetails.detailedOverview}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8 }}>
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Project Reviews Section */}
      <div className="white-card" style={{ padding: '36px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '26px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {t.projectDetails.reviewsTitle}
            </h3>
            {averageRating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={15}
                      fill={s <= Math.round(Number(averageRating)) ? '#f8fafc' : 'none'}
                      color={s <= Math.round(Number(averageRating)) ? '#f8fafc' : '#475569'}
                    />
                  ))}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {averageRating} {t.projectDetails.outOf5}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  ({project.reviews.length} {t.projectDetails.approvedReviews})
                </span>
              </div>
            )}
          </div>

          <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
            <MessageSquare size={15} />
            <span>{t.projectDetails.writeReview}</span>
          </button>
        </div>

        {project.reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)' }}>
            {t.projectDetails.noReviews}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {project.reviews.map((rev: any) => (
              <div
                key={rev.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{rev.name}</div>
                    <ShieldCheck size={15} color="#94a3b8" />
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= rev.rating ? '#f8fafc' : 'none'}
                        color={s <= rev.rating ? '#f8fafc' : '#475569'}
                      />
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewModal
        isOpen={modalOpen}
        projectId={project.id}
        projectTitle={title}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
