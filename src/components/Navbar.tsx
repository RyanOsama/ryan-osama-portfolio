'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code2, Globe, UserCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.95)'
          : 'linear-gradient(to bottom, rgba(15, 23, 42, 0.45) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#1e3a8a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
              border: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Code2 size={22} color="#ffffff" />
          </div>
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                lineHeight: 1.2,
                color: scrolled ? 'var(--text-main)' : '#ffffff',
                textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              {lang === 'ar' ? 'ريان أسامة' : 'Ryan Osama'}
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: scrolled ? '#1e3a8a' : '#93c5fd',
                fontWeight: 600,
                textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)',
              }}
            >
              Full-Stack Software Engineer
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '26px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: scrolled ? 'var(--text-secondary)' : '#ffffff',
                textShadow: scrolled ? 'none' : '0 1px 6px rgba(0,0,0,0.4)',
                textDecoration: 'none',
                fontSize: '0.94rem',
                fontWeight: 600,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = scrolled ? '#1e3a8a' : '#93c5fd')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = scrolled ? 'var(--text-secondary)' : '#ffffff')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="btn btn-sm"
            style={{
              fontWeight: 700,
              padding: '7px 14px',
              gap: '6px',
              background: scrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: scrolled ? 'none' : 'blur(8px)',
              border: scrolled ? '1px solid var(--border-color)' : '1px solid rgba(255, 255, 255, 0.35)',
              color: scrolled ? 'var(--text-main)' : '#ffffff',
              boxShadow: 'var(--shadow-sm)',
            }}
            title={lang === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
          >
            <Globe size={15} color={scrolled ? '#1e3a8a' : '#ffffff'} />
            <span>{t.nav.language}</span>
          </button>

          {/* Direct CTA */}
          <a
            href="#contact"
            className="btn btn-primary btn-sm"
            style={{
              display: 'none',
              background: '#1e3a8a',
              color: '#ffffff',
              padding: '8px 16px',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
            }}
            id="nav-cta-btn"
          >
            <span>{t.nav.requestProject}</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Admin link */}
          <Link
            href="/admin"
            title={t.nav.adminPortal}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: scrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: scrolled ? 'none' : 'blur(8px)',
              border: scrolled ? '1px solid var(--border-color)' : '1px solid rgba(255, 255, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: scrolled ? 'var(--text-secondary)' : '#ffffff',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <UserCheck size={18} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            style={{
              background: scrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              border: scrolled ? '1px solid var(--border-color)' : '1px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: scrolled ? 'var(--text-main)' : '#ffffff',
              cursor: 'pointer',
            }}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: '100%',
            left: '20px',
            right: '20px',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontSize: '0.98rem',
                fontWeight: 600,
                padding: '8px 12px',
                borderRadius: '8px',
                background: '#f8fafc',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '6px', background: '#1e3a8a' }}
          >
            <span>{t.nav.requestProject}</span>
          </a>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-cta-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
