'use client';

import React from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface ContactSectionProps {
  settings?: Record<string, string>;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const email = settings?.email || 'ryan.osama.dev@gmail.com';
  const phone = settings?.phone || '+967770000000';
  const location = settings?.location || 'اليمن - حضرموت (ومتاح للعمل عن بعد عالمياً)';
  const githubUrl = settings?.github_url || 'https://github.com/ryan-osama';
  const linkedinUrl = settings?.linkedin_url || 'https://linkedin.com/in/ryan-osama';

  const whatsappClean = phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>بدء التعاون البرمجي</span>
          </div>
          <h2 className="section-title">دعنا نحول فكرتك إلى نظام واقعي</h2>
          <p className="section-subtitle">
            هل لديك فكرة مشروع جديد، أو تحتاج إلى تطوير منصة سحابية آمنة؟ تواصل معي مباشرة عبر القنوات التالية
          </p>
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
            className="glass-card"
            style={{
              padding: '30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <MessageCircle size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>واتساب (WhatsApp)</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              محادثة مباشرة وسريعة لمناقشة المتطلبات الفنية
            </p>
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-sm"
              style={{ width: '100%', marginTop: '8px' }}
            >
              <span>محادثة فورية على واتساب</span>
            </a>
          </div>

          {/* Email Card */}
          <div
            className="glass-card"
            style={{
              padding: '30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-glow)',
              }}
            >
              <Mail size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>البريد الإلكتروني</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {email}
            </p>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: '8px' }}
            >
              <span>إرسال بريد إلكتروني</span>
            </a>
          </div>

          {/* Location & Profiles */}
          <div
            className="glass-card"
            style={{
              padding: '30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c084fc',
              }}
            >
              <MapPin size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>الموقع والعمل</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {location}
            </p>
            <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
