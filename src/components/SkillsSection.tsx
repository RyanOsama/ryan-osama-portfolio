'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
}

interface SkillsSectionProps {
  skills: SkillItem[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-blue" style={{ marginBottom: '12px' }}>
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '35px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: activeCategory === cat ? '1px solid var(--primary-blue)' : '1px solid var(--border-color)',
                  background: activeCategory === cat ? 'var(--primary-blue)' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat === 'All' ? t.skills.all : cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="white-card"
              style={{
                padding: '18px 22px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-main)' }}>{skill.name}</span>
                <span style={{ fontSize: '0.84rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '7px',
                  borderRadius: '4px',
                  background: '#e2e8f0',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    borderRadius: '4px',
                    background: 'var(--primary-blue)',
                    transition: 'width 0.8s ease-in-out',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
