'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location?: string | null;
  description: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent: boolean;
}

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return '';
    const d = new Date(dateInput);
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>المسيرة المهنية</span>
          </div>
          <h2 className="section-title">الخبرات والمحطات العملية</h2>
          <p className="section-subtitle">
            سجل حافل في قيادة وتنفيذ المشاريع البرمجية الحساسة وإدارة فرق التطوير
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              bottom: '15px',
              right: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, #38bdf8, #818cf8, transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  display: 'flex',
                  gap: '24px',
                  position: 'relative',
                }}
              >
                {/* Timeline Icon Node */}
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'var(--bg-dark)',
                    border: '2px solid var(--primary-glow)',
                    boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-glow)',
                    flexShrink: 0,
                    zIndex: 2,
                  }}
                >
                  <Briefcase size={20} />
                </div>

                {/* Card Info */}
                <div className="glass-card" style={{ flex: 1, padding: '26px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{exp.title}</h3>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        color: 'var(--primary-glow)',
                        background: 'rgba(56, 189, 248, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      <Calendar size={13} />
                      <span>
                        {formatDate(exp.startDate)} — {exp.isCurrent ? 'حتى الآن' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      marginBottom: '14px',
                    }}
                  >
                    <span>{exp.organization}</span>
                    {exp.location && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
