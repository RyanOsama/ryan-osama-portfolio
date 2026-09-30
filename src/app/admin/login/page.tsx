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
      {/* Background Keyboard Image Layer (Mirrored for RTL Arabic so keyboard details stay on the open side) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/login-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: dir === 'rtl' ? 'scaleX(-1)' : 'none',
          zIndex: 1,
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Dark Slate Gradient Overlay (Darker behind the login card side for optimal readability) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            dir === 'rtl'
              ? 'linear-gradient(to left, rgba(26, 31, 40, 0.95) 0%, rgba(26, 31, 40, 0.82) 48%, rgba(26, 31, 40, 0.35) 100%)'
              : 'linear-gradient(to right, rgba(26, 31, 40, 0.95) 0%, rgba(26, 31, 40, 0.82) 48%, rgba(26, 31, 40, 0.35) 100%)',
          zIndex: 2,
        }}
      />

      {/* Top Floating Bar: Language Switcher & Home Link */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          }}
        >
          {dir === 'rtl' ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
          <span>{lang === 'ar' ? 'العودة للموقع الرئيسي' : 'Back to Website'}</span>
        </Link>

        {/* Instant Language Toggle */}
        <button
          onClick={toggleLanguage}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'rgba(30, 36, 48, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          }}
        >
          <Globe size={15} />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          paddingTop: '60px',
          paddingBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          {/* Login Card (Left on EN, Right on AR) */}
          <div
            className="white-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '42px 36px',
              background: 'rgba(33, 38, 49, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
              textAlign: dir === 'rtl' ? 'right' : 'left',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  marginBottom: '16px',
                }}
              >
                <Lock size={26} color="#ffffff" />
              </div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
                {lang === 'ar' ? 'بوابة لوحة التحكم' : 'Admin Portal'}
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
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
              <div className="form-group">
                <label className="form-label" style={{ color: '#e2e8f0' }}>
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
                      background: 'rgba(20, 24, 32, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      padding: '12px 14px',
                      color: '#ffffff',
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#e2e8f0' }}>
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
                      background: 'rgba(20, 24, 32, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      padding: '12px 14px',
                      paddingRight: dir === 'rtl' ? '14px' : '42px',
                      paddingLeft: dir === 'rtl' ? '42px' : '14px',
                      color: '#ffffff',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      ...(dir === 'rtl' ? { left: '12px' } : { right: '12px' }),
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
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
                  marginTop: '12px',
                  padding: '13px',
                  fontSize: '0.98rem',
                  borderRadius: '10px',
                  fontWeight: 700,
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
    </div>
  );
}
