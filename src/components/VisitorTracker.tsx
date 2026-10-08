'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Do not track admin dashboard visits
    if (pathname.startsWith('/admin')) {
      return;
    }

    // Get or initialize session ID in sessionStorage
    let sId = '';
    try {
      sId = sessionStorage.getItem('visitor_session_id') || '';
      if (!sId) {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          sId = crypto.randomUUID();
        } else {
          sId = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        }
        sessionStorage.setItem('visitor_session_id', sId);
      }
    } catch {
      sId = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    sessionIdRef.current = sId;

    // Detect device
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const device = isMobile ? 'Mobile' : 'Desktop';

    // Detect basic browser name
    let browser = 'Browser';
    if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';

    // Initial visit track
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sId,
          page: pathname,
          device,
          browser,
        }),
      }).catch(() => {});
    } catch {}

    // Send heartbeats every 15 seconds to measure actual time spent
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible' && sessionIdRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        fetch('/api/analytics/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            durationSeconds: duration,
            page: pathname,
          }),
        }).catch(() => {});
      }
    }, 15000);

    const handleBeforeUnload = () => {
      if (sessionIdRef.current && navigator.sendBeacon) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        const blob = new Blob(
          [JSON.stringify({ sessionId: sessionIdRef.current, durationSeconds: duration, page: pathname })],
          { type: 'application/json' }
        );
        navigator.sendBeacon('/api/analytics/ping', blob);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
