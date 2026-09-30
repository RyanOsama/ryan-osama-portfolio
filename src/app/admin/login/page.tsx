'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldAlert, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { ToastProvider, useToast } from '@/components/Toast';

function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('تم تسجيل الدخول بنجاح! جاري التوجيه...', 'success');
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 800);
      } else {
        setErrorMsg(data.message || 'فشل تسجيل الدخول');
        showToast(data.message || 'فشل تسجيل الدخول', 'error');
      }
    } catch (err) {
      setErrorMsg('تعذر الاتصال بالخادم');
      showToast('تعذر الاتصال بالخادم', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 60%), #090d16',
      }}
    >
      <div
        className="glass-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'var(--primary-gradient)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(56, 189, 248, 0.35)',
              marginBottom: '16px',
            }}
          >
            <Lock size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
            بوابة الإدارة المركزية
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            منطقة مخصصة لإدارة المحتوى والأنظمة
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#fda4af',
              fontSize: '0.88rem',
            }}
          >
            <ShieldAlert size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">اسم المستخدم (Username)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                autoComplete="username"
                className="form-input"
                placeholder="Ryan_osama"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <User
                size={18}
                color="#64748b"
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">كلمة المرور (Password)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                autoComplete="current-password"
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <Lock
                size={18}
                color="#64748b"
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '12px', padding: '12px' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>جاري التحقق والمصادقة...</span>
              </>
            ) : (
              <>
                <span>تسجيل الدخول الآمن</span>
                <ArrowLeft size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <a
            href="/"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>العودة إلى الصفحة الرئيسية</span>
            <span>←</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <ToastProvider>
      <LoginForm />
    </ToastProvider>
  );
}
