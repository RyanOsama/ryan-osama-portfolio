'use client';

import React from 'react';
import { ShieldCheck, Cpu, Database, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: ShieldCheck,
      title: t.about.securityTitle,
      desc: t.about.securityDesc,
    },
    {
      icon: Cpu,
      title: t.about.archTitle,
      desc: t.about.archDesc,
    },
    {
      icon: Database,
      title: t.about.dbTitle,
      desc: t.about.dbDesc,
    },
    {
      icon: Zap,
      title: t.about.performanceTitle,
      desc: t.about.performanceDesc,
    },
  ];

  return (
    <section id="about" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>{t.about.badge}</span>
          </div>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px',
          }}
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="white-card"
                style={{
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
