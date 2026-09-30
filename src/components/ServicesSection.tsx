'use client';

import React from 'react';
import { Layers, ShieldCheck, Database, Cpu, Globe, Server, CheckCircle2 } from 'lucide-react';

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
  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'shield-check':
        return <ShieldCheck size={28} />;
      case 'database':
        return <Database size={28} />;
      case 'cpu':
        return <Cpu size={28} />;
      case 'server':
        return <Server size={28} />;
      default:
        return <Layers size={28} />;
    }
  };

  return (
    <section id="services" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>الخدمات الاحترافية</span>
          </div>
          <h2 className="section-title">ما الذي يمكنني تقديمه لمشروعك؟</h2>
          <p className="section-subtitle">
            خدمات متكاملة تغطي كافة مراحل تطوير البرمجيات من الفكرة والتصميم وحتى النشر والحماية
          </p>
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
              className="glass-card"
              style={{
                padding: '32px 26px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'var(--primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    marginBottom: '20px',
                    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  {getIcon(srv.icon)}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                  {srv.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                  {srv.description}
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href="#contact"
                  style={{
                    color: 'var(--primary-glow)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>طلب هذه الخدمة</span>
                  <span>←</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
