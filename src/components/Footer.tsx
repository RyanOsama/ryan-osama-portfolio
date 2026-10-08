'use client';

import React from 'react';
import { Mail, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  settings?: Record<string, string>;
}

export function Footer({ settings }: FooterProps) {
  const { t, lang } = useLanguage();
  const githubUrl = settings?.github_url || 'https://github.com/ryan-osama';
  const linkedinUrl = settings?.linkedin_url || 'https://linkedin.com/in/ryan-osama';
  const email = settings?.email || 'ryan.osama.dev@gmail.com';

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        padding: '50px 0 30px 0',
        marginTop: '60px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '6px', color: 'var(--text-main)' }}>
              {lang === 'ar' ? 'ريان أسامة' : 'Ryan Osama'}{' '}
              <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.95rem' }}>
                | Full-Stack Engineer
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '420px' }}>
              {t.footer.bio}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px' }}
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px' }}
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px' }}
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '25px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            {t.footer.rights} {new Date().getFullYear()} — Ryan Osama
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Shield size={14} color="#059669" /> {t.footer.securedSystem}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
