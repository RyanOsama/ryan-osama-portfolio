'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, ShieldAlert, ArrowRight, ArrowLeft, Loader2, Delete, CornerDownLeft, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { dir } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeInput, setActiveInput] = useState<'username' | 'password'>('username');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Synthesize a crisp mechanical switch click sound with Web Audio API
  const playKeyClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio failure if restricted
    }
  };

  const handleKeyPress = (char: string) => {
    playKeyClickSound();
    setPressedKey(char);
    setTimeout(() => setPressedKey(null), 150);

    if (char === 'ENTER') {
      submitLoginForm();
      return;
    }

    if (char === 'BACKSPACE') {
      if (activeInput === 'username') {
        setUsername((prev) => prev.slice(0, -1));
      } else {
        setPassword((prev) => prev.slice(0, -1));
      }
      return;
    }

    if (char === 'SPACE') {
      if (activeInput === 'username') {
        setUsername((prev) => prev + ' ');
      } else {
        setPassword((prev) => prev + ' ');
      }
      return;
    }

    if (char === 'TAB') {
      setActiveInput((prev) => (prev === 'username' ? 'password' : 'username'));
      return;
    }

    // Append character
    if (activeInput === 'username') {
      setUsername((prev) => prev + char);
    } else {
      setPassword((prev) => prev + char);
    }
  };

  const submitLoginForm = async () => {
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password');
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
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 600);
      } else {
        setErrorMsg(data.message || 'Invalid username or password');
        showToast(data.message || 'Login failed', 'error');
      }
    } catch (err) {
      setErrorMsg('Connection error');
      showToast('Connection error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLoginForm();
  };

  // Keyboard layout matrix mirroring the user's reference photo (charcoal black & slate gray keycaps)
  const keyboardRows = [
    [
      { label: '1', val: '1', type: 'dark' },
      { label: '2', val: '2', type: 'dark' },
      { label: '3', val: '3', type: 'dark' },
      { label: '4', val: '4', type: 'dark' },
      { label: '5', val: '5', type: 'dark' },
      { label: '6', val: '6', type: 'dark' },
      { label: '7', val: '7', type: 'dark' },
      { label: '8', val: '8', type: 'dark' },
      { label: '9', val: '9', type: 'dark' },
      { label: '0', val: '0', type: 'dark' },
      { label: '⌫', val: 'BACKSPACE', type: 'gray', wide: true },
    ],
    [
      { label: 'Q', val: 'Q', type: 'dark' },
      { label: 'W', val: 'W', type: 'dark' },
      { label: 'E', val: 'E', type: 'gray' },
      { label: 'R', val: 'R', type: 'dark' },
      { label: 'T', val: 'T', type: 'dark' },
      { label: 'Y', val: 'Y', type: 'dark' },
      { label: 'U', val: 'U', type: 'dark' },
      { label: 'I', val: 'I', type: 'gray' },
      { label: 'O', val: 'O', type: 'gray' },
      { label: 'P', val: 'P', type: 'dark' },
      { label: '_', val: '_', type: 'gray' },
    ],
    [
      { label: 'A', val: 'A', type: 'gray' },
      { label: 'S', val: 'S', type: 'dark' },
      { label: 'D', val: 'D', type: 'gray' },
      { label: 'F', val: 'F', type: 'gray' },
      { label: 'G', val: 'G', type: 'dark' },
      { label: 'H', val: 'H', type: 'dark' },
      { label: 'J', val: 'J', type: 'dark' },
      { label: 'K', val: 'K', type: 'dark' },
      { label: 'L', val: 'L', type: 'gray' },
      { label: '*', val: '*', type: 'gray' },
      { label: '@', val: '@', type: 'dark' },
    ],
    [
      { label: 'Z', val: 'Z', type: 'gray' },
      { label: 'X', val: 'X', type: 'gray' },
      { label: 'C', val: 'C', type: 'gray' },
      { label: 'V', val: 'V', type: 'gray' },
      { label: 'B', val: 'B', type: 'dark' },
      { label: 'N', val: 'N', type: 'dark' },
      { label: 'M', val: 'M', type: 'dark' },
      { label: '-', val: '-', type: 'dark' },
      { label: '.', val: '.', type: 'dark' },
      { label: '↵ Enter', val: 'ENTER', type: 'accent', wide: true },
    ],
    [
      { label: 'TAB ⇄', val: 'TAB', type: 'gray', wide: true },
      { label: 'Space Bar', val: 'SPACE', type: 'dark', extraWide: true },
      { label: '!', val: '!', type: 'gray' },
      { label: '#', val: '#', type: 'gray' },
    ],
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        backgroundColor: '#191d24',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(45, 52, 65, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(26, 31, 40, 0.6) 0%, transparent 60%)
        `,
        color: '#ffffff',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1220px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '36px',
          alignItems: 'center',
        }}
      >
        {/* LEFT COLUMN: Login Card */}
        <div
          className="white-card animate-fade-in"
          style={{
            background: '#232833',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#191d24',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                marginBottom: '16px',
              }}
            >
              <Lock size={24} color="#e2e8f0" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
              Admin Portal
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
              Sign in with your keyboard or interactive keycaps
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
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

          <form onSubmit={handleFormSubmit}>
            {/* Username field */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" style={{ color: activeInput === 'username' ? '#ffffff' : '#cbd5e1' }}>
                  Username
                </label>
                {activeInput === 'username' && (
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>Active for keycaps ⌨</span>
                )}
              </div>
              <input
                ref={usernameInputRef}
                type="text"
                required
                autoComplete="username"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onFocus={() => setActiveInput('username')}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  background: '#191d24',
                  borderColor: activeInput === 'username' ? '#cbd5e1' : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: activeInput === 'username' ? '0 0 0 2px rgba(203, 213, 225, 0.2)' : 'none',
                }}
              />
            </div>

            {/* Password field */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" style={{ color: activeInput === 'password' ? '#ffffff' : '#cbd5e1' }}>
                  Password
                </label>
                {activeInput === 'password' && (
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>Active for keycaps ⌨</span>
                )}
              </div>
              <input
                ref={passwordInputRef}
                type="password"
                required
                autoComplete="current-password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onFocus={() => setActiveInput('password')}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: '#191d24',
                  borderColor: activeInput === 'password' ? '#cbd5e1' : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: activeInput === 'password' ? '0 0 0 2px rgba(203, 213, 225, 0.2)' : 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '13px',
                fontSize: '1rem',
                borderRadius: '10px',
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Secure Sign In</span>
                  <ArrowIcon size={16} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              href="/"
              style={{
                color: '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              ← Back to Website
            </Link>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
              }}
              title="Toggle mechanical sound"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>{soundEnabled ? 'Clicks On' : 'Clicks Off'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Mechanical Keyboard */}
        <div
          style={{
            background: '#1c212b',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '28px 24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.04em' }}>
                TACTILE MECHANICAL KEYBOARD
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setActiveInput('username')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: activeInput === 'username' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  color: activeInput === 'username' ? '#1a1d24' : '#94a3b8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Target: Username
              </button>
              <button
                type="button"
                onClick={() => setActiveInput('password')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: activeInput === 'password' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  color: activeInput === 'password' ? '#1a1d24' : '#94a3b8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Target: Password
              </button>
            </div>
          </div>

          {/* Keycaps Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {keyboardRows.map((row, rIdx) => (
              <div
                key={rIdx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  flexWrap: 'nowrap',
                }}
              >
                {row.map((k, kIdx) => {
                  const isPressed = pressedKey === k.val;

                  // Aesthetic styles matching the black & slate gray keycaps from the photo
                  let bgGradient = 'linear-gradient(180deg, #242933 0%, #171a21 100%)';
                  let textColor = '#e2e8f0';
                  let shadowColor = '#0d0f14';
                  let borderTopColor = 'rgba(255, 255, 255, 0.15)';

                  if (k.type === 'gray') {
                    bgGradient = 'linear-gradient(180deg, #64748b 0%, #475569 100%)';
                    textColor = '#ffffff';
                    shadowColor = '#1e293b';
                    borderTopColor = 'rgba(255, 255, 255, 0.3)';
                  } else if (k.type === 'accent') {
                    bgGradient = 'linear-gradient(180deg, #94a3b8 0%, #64748b 100%)';
                    textColor = '#ffffff';
                    shadowColor = '#334155';
                    borderTopColor = 'rgba(255, 255, 255, 0.4)';
                  }

                  return (
                    <button
                      key={kIdx}
                      type="button"
                      onClick={() => handleKeyPress(k.val)}
                      style={{
                        flex: k.extraWide ? '3' : k.wide ? '1.8' : '1',
                        minWidth: k.extraWide ? '160px' : k.wide ? '75px' : '38px',
                        height: '46px',
                        background: isPressed ? shadowColor : bgGradient,
                        border: '1px solid rgba(0,0,0,0.6)',
                        borderTop: `1.5px solid ${borderTopColor}`,
                        borderRadius: '8px',
                        color: textColor,
                        fontWeight: 700,
                        fontSize: k.wide ? '0.78rem' : '0.92rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isPressed
                          ? `0 1px 2px ${shadowColor}`
                          : `0 4px 0 ${shadowColor}, 0 6px 10px rgba(0,0,0,0.4)`,
                        transform: isPressed ? 'translateY(3px)' : 'translateY(0)',
                        transition: 'all 0.08s ease',
                        userSelect: 'none',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {k.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Quick Helper Notes */}
          <div
            style={{
              fontSize: '0.78rem',
              color: '#94a3b8',
              textAlign: 'center',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            Click any key to type directly into the focused field • Press ↵ Enter to authenticate
          </div>
        </div>
      </div>
    </div>
  );
}
