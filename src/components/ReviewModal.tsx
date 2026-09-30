'use client';

import React, { useState } from 'react';
import { Star, X, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from './Toast';
import { useLanguage } from '@/context/LanguageContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string | null;
  projectTitle?: string | null;
  onSuccess?: () => void;
}

export function ReviewModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  onSuccess,
}: ReviewModalProps) {
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      showToast('Please enter your name and comment', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projectId || null,
          name: name.trim(),
          email: email.trim() || null,
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(t.reviewModal.successMessage, 'success');
        setName('');
        setEmail('');
        setComment('');
        setRating(5);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        showToast(data.message || 'Error submitting review', 'error');
      }
    } catch (err) {
      showToast('Connection error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="white-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#ffffff',
          padding: '32px',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div className="badge badge-blue" style={{ marginBottom: '10px' }}>
            <ShieldCheck size={14} />
            <span>{t.reviewModal.badge}</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {projectTitle ? `${t.reviewModal.modalTitleWithProject} ${projectTitle}` : t.reviewModal.modalTitle}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
            {t.reviewModal.modalSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  transition: 'transform 0.15s ease',
                  transform: (hoverRating || rating) >= star ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                <Star
                  size={30}
                  fill={(hoverRating || rating) >= star ? '#d97706' : 'none'}
                  color={(hoverRating || rating) >= star ? '#d97706' : '#cbd5e1'}
                />
              </button>
            ))}
          </div>

          <div className="form-group">
            <label className="form-label">{t.reviewModal.nameLabel}</label>
            <input
              type="text"
              required
              maxLength={60}
              placeholder={t.reviewModal.namePlaceholder}
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.reviewModal.emailLabel}</label>
            <input
              type="email"
              maxLength={100}
              placeholder={t.reviewModal.emailPlaceholder}
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.reviewModal.commentLabel}</label>
            <textarea
              required
              rows={4}
              maxLength={1000}
              placeholder={t.reviewModal.commentPlaceholder}
              className="form-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{t.reviewModal.submitting}</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>{t.reviewModal.submitBtn}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
