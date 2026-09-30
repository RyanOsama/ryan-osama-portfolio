'use client';

import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const { t, dir } = useLanguage();
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
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '60px',
        color: '#ffffff',
      }}
    >
      {/* Background Image Layer (Automatically flipped in RTL/Arabic so character is on the left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: dir === 'rtl' ? 'scaleX(-1)' : 'none',
          zIndex: 1,
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Dark Slate Gradient Overlay (Darker behind the text side) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            dir === 'rtl'
              ? 'linear-gradient(to left, rgba(9, 13, 22, 0.92) 0%, rgba(9, 13, 22, 0.65) 50%, rgba(9, 13, 22, 0.2) 100%)'
              : 'linear-gradient(to right, rgba(9, 13, 22, 0.92) 0%, rgba(9, 13, 22, 0.65) 50%, rgba(9, 13, 22, 0.2) 100%)',
          zIndex: 1,
        }}
      />

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
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#f8fafc',
              fontSize: '0.88rem',
              fontWeight: 600,
              marginBottom: '26px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <Sparkles size={16} color="#94a3b8" />
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
              textShadow: '0 3px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            {t.hero.headline} <br />
            <span
              style={{
                color: '#cbd5e1',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
              }}
            >
              {t.hero.headlineHighlight}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#cbd5e1',
              lineHeight: 1.85,
              marginBottom: '40px',
              maxWidth: '680px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
              fontWeight: 400,
            }}
          >
            {t.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'flex-start',
              marginBottom: '50px',
            }}
          >
            <a
              href="#projects"
              className="btn btn-primary"
              style={{
                padding: '14px 32px',
                fontSize: '1.02rem',
                borderRadius: '12px',
              }}
            >
              <span>{t.hero.exploreProjects}</span>
              <ArrowIcon size={18} />
            </a>

            <a
              href="#contact"
              className="btn btn-secondary"
              style={{
                padding: '14px 30px',
                fontSize: '1.02rem',
                borderRadius: '12px',
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
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px 18px',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>{t.hero.statYears}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{t.hero.statYearsLabel}</div>
            </div>

            <div
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px 18px',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#e2e8f0' }}>{t.hero.statProjects}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{t.hero.statProjectsLabel}</div>
            </div>

            <div
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px 18px',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#cbd5e1' }}>{t.hero.statQuality}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{t.hero.statQualityLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
