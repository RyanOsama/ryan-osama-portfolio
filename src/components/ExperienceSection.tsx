'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { experienceTranslations } from '@/lib/i18nContent';

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
  const { t, lang, dir } = useLanguage();

  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return '';
    const d = new Date(dateInput);
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short' });
  };

  const getLocalizedExperience = (exp: ExperienceItem, idx: number) => {
    const key = idx === 0 ? 'exp-1' : 'exp-2';
    const tr = experienceTranslations[key];
    if (tr) {
      return {
        title: lang === 'en' ? tr.en.title : tr.ar.title,
        organization: lang === 'en' ? tr.en.organization : tr.ar.organization,
        location: lang === 'en' ? tr.en.location : tr.ar.location,
        description: lang === 'en' ? tr.en.description : tr.ar.description,
      };
    }
    return exp;
  };

  return (
    <section id="experience" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              bottom: '15px',
              ...(dir === 'rtl' ? { right: '24px' } : { left: '24px' }),
              width: '2px',
              background: 'linear-gradient(to bottom, #94a3b8, #475569, rgba(255, 255, 255, 0.05))',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {experiences.map((exp, idx) => {
              const locExp = getLocalizedExperience(exp, idx);
              return (
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
                      background: '#182235',
                      border: '2px solid #94a3b8',
                      boxShadow: '0 0 14px rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f8fafc',
                      flexShrink: 0,
                      zIndex: 2,
                    }}
                  >
                    <Briefcase size={20} />
                  </div>

                  {/* Card Info */}
                  <div className="white-card" style={{ flex: 1, padding: '26px' }}>
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
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{locExp.title}</h3>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.82rem',
                          color: '#cbd5e1',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontWeight: 600,
                        }}
                      >
                        <Calendar size={13} />
                        <span>
                          {formatDate(exp.startDate)} — {exp.isCurrent ? t.experience.present : formatDate(exp.endDate)}
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
                      <span>{locExp.organization}</span>
                      {locExp.location && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={13} />
                          <span>{locExp.location}</span>
                        </span>
                      )}
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                      {locExp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
