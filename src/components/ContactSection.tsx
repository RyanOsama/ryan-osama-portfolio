'use client';

import React from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useLanguage } from '@/context/LanguageContext';

interface ContactSectionProps {
  settings?: Record<string, string>;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const { t } = useLanguage();

  const email = settings?.email || 'r6y6ony98@gmail.com';
  const phone = settings?.phone || '+967770000000';
  const location = settings?.location || 'Yemen - Hadramout (Available Remotely Worldwide)';
  const githubUrl = settings?.github_url || 'https://github.com/ryan-osama';
  const linkedinUrl = settings?.linkedin_url || 'https://linkedin.com/in/ryan-osama';

  const whatsappClean = phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {/* WhatsApp Card */}
          <div
            className="white-card"
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
              }}
            >
              <MessageCircle size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{t.contact.whatsappTitle}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {t.contact.whatsappDesc}
            </p>
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <span>{t.contact.whatsappAction}</span>
            </a>
          </div>

          {/* Email Card */}
          <div
            className="white-card"
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f8fafc',
              }}
            >
              <Mail size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{t.contact.emailTitle}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {email}
            </p>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <span>{t.contact.emailAction}</span>
            </a>
          </div>

          {/* Location & Profiles */}
          <div
            className="white-card"
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
              }}
            >
              <MapPin size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{t.contact.locationTitle}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {location}
            </p>
            <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '6px' }}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
