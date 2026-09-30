'use client';

import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '110px',
        paddingBottom: '60px',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          {/* Availability Badge */}
          <div
            className="badge badge-blue animate-fade-in"
            style={{
              marginBottom: '24px',
              padding: '6px 18px',
              fontSize: '0.88rem',
              display: 'inline-flex',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#059669',
              }}
            />
            <span>{t.hero.availabilityBadge}</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: '20px',
              letterSpacing: '-0.025em',
              color: 'var(--text-main)',
            }}
          >
            {t.hero.headline} <br />
            <span className="gradient-text">{t.hero.headlineHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '36px',
              maxWidth: '740px',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            {t.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
              marginBottom: '55px',
            }}
          >
            <a href="#projects" className="btn btn-primary" style={{ padding: '14px 30px', fontSize: '1.02rem' }}>
              <span>{t.hero.exploreProjects}</span>
              <ArrowIcon size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.02rem' }}>
              <Sparkles size={18} color="var(--primary-blue)" />
              <span>{t.hero.contactMe}</span>
            </a>
          </div>

          {/* Clean White Stats Bar */}
          <div
            className="white-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '20px',
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-blue)', marginBottom: '4px' }}>
                {t.hero.statYears}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t.hero.statYearsLabel}
              </div>
            </div>

            <div style={{ borderRight: dir === 'rtl' ? '1px solid var(--border-color)' : 'none', borderLeft: dir === 'ltr' ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-sky)', marginBottom: '4px' }}>
                {t.hero.statProjects}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t.hero.statProjectsLabel}
              </div>
            </div>

            <div style={{ borderRight: dir === 'rtl' ? '1px solid var(--border-color)' : 'none', borderLeft: dir === 'ltr' ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#059669', marginBottom: '4px' }}>
                {t.hero.statQuality}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t.hero.statQualityLabel}
              </div>
            </div>

            <div style={{ borderRight: dir === 'rtl' ? '1px solid var(--border-color)' : 'none', borderLeft: dir === 'ltr' ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#475569', marginBottom: '4px' }}>
                {t.hero.statSupport}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t.hero.statSupportLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
