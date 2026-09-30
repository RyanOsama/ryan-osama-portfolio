'use client';

import React from 'react';
import { ArrowLeft, Sparkles, Terminal, Shield, Award, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          {/* Availability Badge */}
          <div
            className="badge badge-glow animate-fade-in"
            style={{
              marginBottom: '24px',
              padding: '8px 18px',
              fontSize: '0.9rem',
              display: 'inline-flex',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
              }}
            />
            <span>متاح لاستقبال مشاريع الأنظمة والاستشارات البرمجية</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            بناء الأنظمة السحابية والحلول الرقمية <br />
            <span className="gradient-text">بأعلى معايير الأمان والأداء</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '36px',
              maxWidth: '720px',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            أنا <strong style={{ color: '#ffffff' }}>ريان أسامة</strong>، مهندس برمجيات متخصص في تطوير المنصات المؤسسية المتكاملة، وتصميم قواعد البيانات المتقدمة، وبناء الواجهات البرمجية الآمنة مع تجربة مستخدم سلسة وعصرية.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              marginBottom: '60px',
            }}
          >
            <a href="#projects" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
              <span>استكشف سابقة الأعمال</span>
              <ArrowLeft size={20} />
            </a>
            <a href="#contact" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
              <Sparkles size={20} color="var(--primary-glow)" />
              <span>تواصل لمناقشة مشروعك</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div
            className="glass-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '20px',
              padding: '28px 20px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-glow)', marginBottom: '4px' }}>
                5+
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                سنوات من الخبرة العملية
              </div>
            </div>

            <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10b981', marginBottom: '4px' }}>
                20+
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                أنظمة ومنصات منجزة
              </div>
            </div>

            <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f59e0b', marginBottom: '4px' }}>
                100%
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                أمان وموثوقية عالية
              </div>
            </div>

            <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#a855f7', marginBottom: '4px' }}>
                24/7
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                دعم وتطوير مستمر
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
