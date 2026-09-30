'use client';

import React from 'react';
import { ShieldCheck, Cpu, Database, Zap, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'أمان البيانات أولاً',
      desc: 'حماية كاملة من ثغرات الحقن (SQLi/XSS/CSRF) مع تشفير الجلسات والمصادقة المتقدمة.',
    },
    {
      icon: Cpu,
      title: 'بنية برمجية نظيفة (Clean Architecture)',
      desc: 'كود منظم وقابل للتوسع والصيانة بسهولة تامة مع الالتزام بأفضل الممارسات العالمية.',
    },
    {
      icon: Database,
      title: 'قواعد بيانات محسنة وسريعة',
      desc: 'تصميم فهارس ذكية وعلاقات متينة مع استعلامات فورية في أجزاء من الثانية.',
    },
    {
      icon: Zap,
      title: 'واجهات فائقة السرعة والتفاعل',
      desc: 'تجربة مستخدم حديثة وتوافق تام مع كافة أحجام الشاشات والهواتف الذكية.',
    },
  ];

  return (
    <section id="about" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>منهجية العمل الهندسية</span>
          </div>
          <h2 className="section-title">نبذة عن خبراتي ومبادئ التطوير</h2>
          <p className="section-subtitle">
            أركز على بناء حلول برمجية واقعية تجمع بين الأداء الخارق وتجربة المستخدم الأنيقة والأمان المشدد
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-glow)',
                  }}
                >
                  <Icon size={26} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
