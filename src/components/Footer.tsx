'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Heart, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-glass)',
        background: 'rgba(9, 13, 22, 0.95)',
        padding: '50px 0 30px 0',
        marginTop: '80px',
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
            <div style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '6px' }}>
              ريان أسامة <span className="gradient-text">| Ryan Osama</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '420px' }}>
              مهندس برمجيات متخصص في بناء وتطوير الأنظمة السحابية المتقدمة وحلول الويب عالية الأمان والكفاءة.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <a
              href="https://github.com/ryan-osama"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px' }}
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/ryan-osama"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px' }}
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:ryan.osama.dev@gmail.com"
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px' }}
            >
              <Mail size={18} />
              <span>البريد</span>
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
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
            جميع الحقوق محفوظة © {new Date().getFullYear()} — تم التطوير بعناية وهندسة أمان مشددة
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Shield size={15} color="#10b981" /> نظام مؤمن ومحمي بالكامل
            </span>
            <Link href="/admin" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              بوابة الإدارة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
