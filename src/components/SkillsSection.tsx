'use client';

import React, { useState } from 'react';

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
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>الكفاءات التقنية</span>
          </div>
          <h2 className="section-title">المهارات والتقنيات البرمجية</h2>
          <p className="section-subtitle">
            مجموعة متكاملة من التقنيات والأطر البرمجية التي أعتمد عليها في بناء الأنظمة المتطورة
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
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
                  border: activeCategory === cat ? '1px solid var(--primary-glow)' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === cat ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat === 'All' ? 'جميع المهارات' : cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card"
              style={{
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{skill.name}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--primary-glow)', fontWeight: 700 }}>
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    borderRadius: '4px',
                    background: 'var(--primary-gradient)',
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
