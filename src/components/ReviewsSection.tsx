'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, Quote, ShieldCheck } from 'lucide-react';
import { ReviewModal } from './ReviewModal';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="reviews" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="badge badge-blue" style={{ marginBottom: '12px' }}>
            <span>{t.reviews.badge}</span>
          </div>
          <h2 className="section-title">{t.reviews.title}</h2>
          <p className="section-subtitle">{t.reviews.subtitle}</p>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '10px 22px' }}
          >
            <MessageSquarePlus size={18} />
            <span>{t.reviews.addReviewBtn}</span>
          </button>
        </div>

        {reviews.length === 0 ? (
          <div
            className="white-card"
            style={{
              padding: '40px',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              {t.reviews.firstToReview}
            </p>
            <button onClick={() => setModalOpen(true)} className="btn btn-secondary btn-sm">
              {t.reviews.beTheFirst}
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
                className="white-card"
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
                          fill={s <= rev.rating ? '#d97706' : 'none'}
                          color={s <= rev.rating ? '#d97706' : '#cbd5e1'}
                        />
                      ))}
                    </div>
                    <Quote size={24} color="#64748b" style={{ opacity: 0.5 }} />
                  </div>

                  {/* Comment */}
                  <p
                    style={{
                      color: 'var(--text-main)',
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
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: '#f8fafc',
                        fontSize: '0.95rem',
                      }}
                    >
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>{rev.name}</div>
                      {rev.project && (
                        <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                          {t.reviews.projectLabel}: {rev.project.title}
                        </div>
                      )}
                    </div>
                  </div>

                  <span title={t.reviews.verifiedReview} style={{ color: '#059669', display: 'flex', alignItems: 'center' }}>
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
