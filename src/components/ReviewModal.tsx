'use client';

import React, { useState } from 'react';
import { Star, X, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from './Toast';

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
      showToast('يرجى كتابة اسمك والتعليق', 'error');
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
        showToast(data.message || 'تم إرسال تقييمك بنجاح! سيظهر بعد مراجعة الإدارة.', 'success');
        setName('');
        setEmail('');
        setComment('');
        setRating(5);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        showToast(data.message || 'تعذر إرسال التقييم', 'error');
      }
    } catch (err) {
      showToast('حدث خطأ في الاتصال بالخادم', 'error');
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
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(15, 23, 42, 0.95)',
          padding: '30px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '10px' }}>
            <ShieldCheck size={14} />
            <span>تقييم موثوق ومحمي</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            {projectTitle ? `إضافة رأي حول: ${projectTitle}` : 'شاركنا رأيك وتجربتك'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '5px' }}>
            رأيك يهمنا ويخضع للمراجعة للتأكد من الموثوقية
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
                  size={32}
                  fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                  color={(hoverRating || rating) >= star ? '#f59e0b' : '#64748b'}
                />
              </button>
            ))}
          </div>

          <div className="form-group">
            <label className="form-label">الاسم الكامل *</label>
            <input
              type="text"
              required
              maxLength={60}
              placeholder="مثال: المهندس أحمد السالم"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">البريد الإلكتروني (اختياري)</label>
            <input
              type="email"
              maxLength={100}
              placeholder="email@example.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">رأيك أو ملاحظتك حول العمل *</label>
            <textarea
              required
              rows={4}
              maxLength={1000}
              placeholder="اكتب انطباعك، جودة العمل، والتعامل..."
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
                <Loader2 size={18} className="animate-spin" />
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>إرسال التقييم للمراجعة</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
