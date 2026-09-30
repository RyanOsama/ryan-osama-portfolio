'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
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

interface ProjectDetailsProps {
  project: any;
}

export function ProjectDetailsClient({ project }: ProjectDetailsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const totalRating = project.reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0);
  const averageRating =
    project.reviews.length > 0 ? (totalRating / project.reviews.length).toFixed(1) : null;

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
          }}
        >
          <ArrowRight size={18} />
          <span>العودة إلى كافة المشاريع</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div
        className="glass-card"
        style={{
          padding: '40px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(16,24,40,0.9) 0%, rgba(15,23,42,0.7) 100%)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          {project.category && (
            <span className="badge badge-glow">{project.category.name}</span>
          )}
          {project.isFeatured && (
            <span className="badge badge-warning">
              <Star size={12} fill="#f59e0b" /> مشروع مميز
            </span>
          )}
          <span className="badge badge-success">
            <CheckCircle2 size={12} /> {project.status === 'COMPLETED' ? 'مكتمل بنجاح' : project.status}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800,
            marginBottom: '16px',
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '850px',
            marginBottom: '30px',
          }}
        >
          {project.shortDescription}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>مشاهدة النظام الحي (Live Demo)</span>
              <ExternalLink size={18} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon size={18} />
              <span>مستودع الكود (GitHub)</span>
            </a>
          )}

          <button onClick={() => setModalOpen(true)} className="btn btn-secondary">
            <MessageSquare size={18} color="var(--primary-glow)" />
            <span>إضافة تقييم حول المشروع</span>
          </button>
        </div>
      </div>

      {/* Main Breakdown: Problem vs Solution */}
      {(project.problem || project.solution) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {project.problem && (
            <div
              className="glass-card"
              style={{
                padding: '30px',
                borderLeft: '4px solid #f43f5e',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  color: '#fda4af',
                }}
              >
                <AlertTriangle size={22} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>التحدي والمشكلة (The Problem)</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.8 }}>
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div
              className="glass-card"
              style={{
                padding: '30px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  color: '#6ee7b7',
                }}
              >
                <Lightbulb size={22} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>الحل الهندسي (The Solution)</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.8 }}>
                {project.solution}
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
          marginBottom: '50px',
        }}
      >
        {/* Features list */}
        {project.features && project.features.length > 0 && (
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
              أبرز مزايا ووظائف النظام
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.features.map((feat: any) => (
                <div key={feat.id} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: 'var(--primary-glow)', flexShrink: 0, marginTop: '3px' }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px' }}>
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
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
            التقنيات والأدوات المستخدمة
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.technologies.map((tech: any) => (
              <div
                key={tech.id}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={14} color="var(--primary-glow)" />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Detailed Overview */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>
              الوصف التفصيلي
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8 }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Project Reviews Section */}
      <div className="glass-card" style={{ padding: '36px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
              تقييمات وآراء المستخدمين حول هذا المشروع
            </h3>
            {averageRating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      fill={s <= Math.round(Number(averageRating)) ? '#f59e0b' : 'none'}
                      color={s <= Math.round(Number(averageRating)) ? '#f59e0b' : '#475569'}
                    />
                  ))}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{averageRating} من 5</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  ({project.reviews.length} تقييم معتمد)
                </span>
              </div>
            )}
          </div>

          <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
            <MessageSquare size={16} />
            <span>كتابة تقييم</span>
          </button>
        </div>

        {project.reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)' }}>
            لا توجد تقييمات منشورة لهذا المشروع بعد. كن أول من يضيف انطباعه!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {project.reviews.map((rev: any) => (
              <div
                key={rev.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontWeight: 700 }}>{rev.name}</div>
                    <ShieldCheck size={16} color="#10b981" />
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= rev.rating ? '#f59e0b' : 'none'}
                        color={s <= rev.rating ? '#f59e0b' : '#475569'}
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
        projectTitle={project.title}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
