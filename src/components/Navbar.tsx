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
      if (window.scrollY > 20) {
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
        transition: 'all 0.25s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
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
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)',
            }}
          >
            <Code2 size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', lineHeight: 1.2, color: 'var(--text-main)' }}>
              {lang === 'ar' ? 'ريان أسامة' : 'Ryan Osama'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
              Full-Stack Software Engineer
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 600,
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--primary-blue)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="btn btn-secondary btn-sm"
            style={{
              fontWeight: 700,
              padding: '6px 12px',
              gap: '6px',
            }}
            title={lang === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
          >
            <Globe size={15} color="var(--primary-blue)" />
            <span>{t.nav.language}</span>
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="btn btn-primary btn-sm"
            style={{ display: 'none' }}
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
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
            }}
          >
            <UserCheck size={17} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
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
            style={{ width: '100%', marginTop: '6px' }}
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
