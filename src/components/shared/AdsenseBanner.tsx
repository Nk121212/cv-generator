'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const PUBLISHER_ID = 'ca-pub-2579251919353845';

interface AdsenseBannerProps {
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
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const pushedRef = useRef(false);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Avoid synchronous state update in effect to satisfy lint
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset push status on pathname change to allow new ads on new pages
    pushedRef.current = false;
  }, [pathname, slotId]);

  useEffect(() => {
    if (!isMounted || pushedRef.current) return;

    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        pushedRef.current = true;
      } catch (err) {
        console.error('[AdsenseBanner] Push error:', err);
      }
    };

    // Small timeout to ensure DOM is ready and script is loaded
    const timer = setTimeout(() => {
      // Check if element exists in DOM via Ref
      if (insRef.current && !insRef.current.hasAttribute('data-adsbygoogle-status')) {
        pushAd();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isMounted, pathname, slotId]);

  // Placeholder during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div 
        className={`w-full min-h-[100px] bg-slate-50/50 rounded-xl my-6 animate-pulse border border-slate-100 flex items-center justify-center ${className}`} 
        aria-hidden="true"
      >
        <div className="text-[10px] text-slate-300 font-medium tracking-widest uppercase">Advertisement</div>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden flex flex-col justify-center items-center min-h-[100px] bg-slate-50/50 rounded-xl my-6 py-4 border border-slate-100 transition-all hover:bg-slate-50 ${className}`}
    >
      <div className="text-[9px] text-slate-300 font-bold tracking-[0.2em] uppercase mb-2">Advertisement</div>
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
