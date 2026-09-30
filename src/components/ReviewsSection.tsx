'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, Quote, ShieldCheck } from 'lucide-react';
import { ReviewModal } from './ReviewModal';

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
  project?: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="reviews" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <span>آراء العملاء والشركاء</span>
          </div>
          <h2 className="section-title">تقييمات وتجارب حقيقية</h2>
          <p className="section-subtitle">
            انطباعات العملاء والمؤسسات التي تشرفت بالعمل معهم على بناء أنظمتهم البرمجية
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '10px 22px' }}
          >
            <MessageSquarePlus size={18} />
            <span>أضف تقييمك وانطباعك</span>
          </button>
        </div>

        {reviews.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '40px',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              كن أول من يشاركنا رأيه في جودة الأعمال والخدمات المقدمة!
            </p>
            <button onClick={() => setModalOpen(true)} className="btn btn-secondary btn-sm">
              كتابة أول تقييم
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={16}
                          fill={s <= rev.rating ? '#f59e0b' : 'none'}
                          color={s <= rev.rating ? '#f59e0b' : '#475569'}
                        />
                      ))}
                    </div>
                    <Quote size={24} color="var(--primary-glow)" style={{ opacity: 0.4 }} />
                  </div>

                  {/* Comment */}
                  <p
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      lineHeight: 1.75,
                      marginBottom: '20px',
                      fontStyle: 'italic',
                    }}
                  >
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--primary-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: '#ffffff',
                        fontSize: '0.95rem',
                      }}
                    >
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{rev.name}</div>
                      {rev.project && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--primary-glow)' }}>
                          مشروع: {rev.project.title}
                        </div>
                      )}
                    </div>
                  </div>

                  <span title="تقييم معتمد" style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                    <ShieldCheck size={18} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <ReviewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
}
