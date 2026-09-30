'use client';

import React from 'react';
import { Layers, ShieldCheck, Database, Cpu, Server, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'shield-check':
        return <ShieldCheck size={26} />;
      case 'database':
        return <Database size={26} />;
      case 'cpu':
        return <Cpu size={26} />;
      case 'server':
        return <Server size={26} />;
      default:
        return <Layers size={26} />;
    }
  };

  return (
    <section id="services" style={{ padding: '80px 0', background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>{t.services.badge}</span>
          </div>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((srv) => (
            <div
              key={srv.id}
              className="white-card"
              style={{
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: '#1e293b',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {getIcon(srv.icon)}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>
                  {srv.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                  {srv.description}
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href="#contact"
                  style={{
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{t.services.requestService}</span>
                  <ArrowIcon size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
