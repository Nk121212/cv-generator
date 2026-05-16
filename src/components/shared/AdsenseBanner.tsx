'use client';

import { useEffect, useRef } from 'react';

// Publisher ID yang konsisten — dengan prefix ca-
// Hardcoded sebagai fallback jika env var tidak di-set di Vercel
const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  ? // env var bisa berupa "pub-xxx" atau "ca-pub-xxx"
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID.startsWith('ca-')
    ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
    : `ca-${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`
  : 'ca-pub-2579251919353845'; // fallback eksplisit

interface AdsenseBannerProps {
  /** Slot ID numerik dari Google AdSense dashboard, contoh: "1234567890" */
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export default function AdsenseBanner({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  style,
}: AdsenseBannerProps) {
  const insRef = useRef<HTMLElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Guard: hanya push sekali per instance
    if (pushed.current) return;
    // Guard: pastikan elemen ada di DOM
    if (!insRef.current) return;

    // Guard: jika sudah di-fill oleh AdSense (route change scenario)
    if (insRef.current.getAttribute('data-adsbygoogle-status')) return;

    pushed.current = true;

    try {
      /*
       * Pattern yang benar untuk Next.js App Router:
       * - Assign ke window.adsbygoogle (bukan variabel lokal)
       * - Jika script AdSense belum load, array ini akan diproses
       *   saat script selesai load (Google mengamati window.adsbygoogle)
       */
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (err) {
      // AdSense tidak tersedia (dev mode, adblock, dsb) — bukan error fatal
      if (process.env.NODE_ENV === 'development') {
        console.warn('[AdsenseBanner] AdSense push skipped:', err);
      }
    }
  }, []);

  return (
    <div
      className={`w-full overflow-hidden flex justify-center items-center min-h-[100px] bg-slate-50/50 rounded-xl my-6 py-2 ${className}`}
      aria-label="Advertisement"
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
