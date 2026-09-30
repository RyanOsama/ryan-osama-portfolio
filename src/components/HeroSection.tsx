'use client';

import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const { t, dir, lang } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.72) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.15) 100%), url('/images/hero-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        paddingTop: '100px',
        paddingBottom: '60px',
        color: '#ffffff',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            maxWidth: '760px',
            textAlign: dir === 'rtl' ? 'right' : 'left',
            marginRight: dir === 'rtl' ? '0' : 'auto',
            marginLeft: dir === 'rtl' ? 'auto' : '0',
          }}
        >
          {/* Availability Glass Badge */}
          <div
            className="animate-fade-in"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '9999px',
              background: 'rgba(30, 58, 138, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#ffffff',
              fontSize: '0.88rem',
              fontWeight: 600,
              marginBottom: '26px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            <Sparkles size={16} color="#93c5fd" />
            <span>{t.hero.availabilityBadge}</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.22,
              marginBottom: '22px',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textShadow: '0 3px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {t.hero.headline} <br />
            <span
              style={{
                color: '#93c5fd',
                textShadow: '0 2px 10px rgba(30, 58, 138, 0.8)',
              }}
            >
              {t.hero.headlineHighlight}
            </span>
          </h1>

          {/* Subheadline description */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#f1f5f9',
              lineHeight: 1.85,
              marginBottom: '40px',
              maxWidth: '680px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              fontWeight: 400,
            }}
          >
            {t.hero.subheadline}
          </p>

          {/* Action CTAs: Deep Navy & Crisp White buttons matching the reference image */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: dir === 'rtl' ? 'flex-start' : 'flex-start',
              marginBottom: '50px',
            }}
          >
            <a
              href="#projects"
              className="btn"
              style={{
                background: '#1e3a8a',
                color: '#ffffff',
                padding: '14px 32px',
                fontSize: '1.02rem',
                fontWeight: 700,
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span>{t.hero.exploreProjects}</span>
              <ArrowIcon size={18} />
            </a>

            <a
              href="#contact"
              className="btn"
              style={{
                background: '#ffffff',
                color: '#1e3a8a',
                padding: '14px 30px',
                fontSize: '1.02rem',
                fontWeight: 700,
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
              }}
            >
              <span>{t.hero.contactMe}</span>
            </a>
          </div>

          {/* Floating Key Metrics Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '14px',
              maxWidth: '680px',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px 18px',
                color: '#0f172a',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e3a8a' }}>{t.hero.statYears}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>{t.hero.statYearsLabel}</div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px 18px',
                color: '#0f172a',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7' }}>{t.hero.statProjects}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>{t.hero.statProjectsLabel}</div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px 18px',
                color: '#0f172a',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669' }}>{t.hero.statQuality}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>{t.hero.statQualityLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
