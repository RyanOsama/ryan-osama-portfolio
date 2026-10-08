'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, ShieldAlert, ArrowRight, ArrowLeft, Loader2, Eye, EyeOff, Globe, Sparkles } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, toggleLanguage, dir } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى إدخال اسم المستخدم وكلمة المرور' : 'Please enter both username and password');
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
        showToast(lang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful! Redirecting...', 'success');
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 600);
      } else {
        const msg = data.message || (lang === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid username or password');
        setErrorMsg(msg);
        showToast(msg, 'error');
      }
    } catch (err) {
      const connErr = lang === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Connection error';
      setErrorMsg(connErr);
      showToast(connErr, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#ffffff',
        fontFamily: 'inherit',
      }}
    >
      {/* Dynamic Background Image Layer (Positioned so the robot is opposite the login form) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/login-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: dir === 'rtl' ? '25% center' : '75% center',
          backgroundRepeat: 'no-repeat',
          transform: dir === 'rtl' ? 'scaleX(-1)' : 'none',
          zIndex: 1,
          transition: 'all 0.5s ease',
        }}
      />

      {/* Dark Studio Gradient Overlay (Darker behind the login card side for optimal readability) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            dir === 'rtl'
              ? 'linear-gradient(to left, rgba(26, 31, 40, 0.96) 0%, rgba(26, 31, 40, 0.88) 42%, rgba(26, 31, 40, 0.3) 100%)'
              : 'linear-gradient(to right, rgba(26, 31, 40, 0.96) 0%, rgba(26, 31, 40, 0.88) 42%, rgba(26, 31, 40, 0.3) 100%)',
          zIndex: 2,
          transition: 'background 0.5s ease',
        }}
      />

      {/* Top Floating Bar: Navigation & Language Toggle */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            color: '#e2e8f0',
            fontSize: '0.88rem',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'rgba(30, 36, 48, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          {dir === 'rtl' ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
          <span>{lang === 'ar' ? 'الرجوع للصفحة الرئيسية' : 'Back to Home'}</span>
        </Link>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          style={{
            color: '#e2e8f0',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(30, 36, 48, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <Globe size={15} />
          <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
        </button>
      </div>

      {/* Main Content Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '80px 32px 40px 32px',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          justifyContent: dir === 'rtl' ? 'flex-start' : 'flex-start',
        }}
      >
        <div
          className="animate-fade-in"
          style={{
            width: '100%',
            maxWidth: '430px',
            marginRight: dir === 'rtl' ? '0' : 'auto',
            marginLeft: dir === 'rtl' ? 'auto' : '0',
            padding: '10px 0',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            textAlign: dir === 'rtl' ? 'right' : 'left',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: dir === 'rtl' ? 'right' : 'left', marginBottom: '28px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                marginBottom: '16px',
              }}
            >
              <Lock size={22} color="#ffffff" />
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff', letterSpacing: '-0.01em' }}>
              {lang === 'ar' ? 'بوابة لوحة التحكم' : 'Admin Portal'}
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {lang === 'ar'
                ? 'تسجيل الدخول الآمن لإدارة المشاريع والتقييمات'
                : 'Secure access for projects and systems management'}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '10px',
                padding: '12px 14px',
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

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                {lang === 'ar' ? 'اسم المستخدم' : 'Username'}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  className="form-input"
                  placeholder={lang === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    padding: '13px 16px',
                    color: '#ffffff',
                    borderRadius: '10px',
                    textAlign: dir === 'rtl' ? 'right' : 'left',
                    direction: dir,
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.4rem' }}>
              <label className="form-label" style={{ color: '#e2e8f0', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    padding: '13px 16px',
                    paddingRight: dir === 'rtl' ? '16px' : '46px',
                    paddingLeft: dir === 'rtl' ? '46px' : '16px',
                    color: '#ffffff',
                    borderRadius: '10px',
                    textAlign: dir === 'rtl' ? 'right' : 'left',
                    direction: dir,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    ...(dir === 'rtl' ? { left: '14px' } : { right: '14px' }),
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.98rem',
                borderRadius: '10px',
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{lang === 'ar' ? 'جاري التحقق...' : 'Verifying...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'ar' ? 'تسجيل الدخول الآمن' : 'Secure Sign In'}</span>
                  <ArrowIcon size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
