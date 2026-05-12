'use client';

import { useEffect, useRef } from 'react';

interface AdsenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdsenseBanner({
  slotId = '1234567890', // Default placeholder slot
  format = 'auto',
  responsive = true,
  className = '',
  style,
}: AdsenseBannerProps) {
  const insRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Ensure we run only once on the client to prevent duplicate push errors
    if (typeof window !== 'undefined' && !initialized.current && insRef.current) {
      initialized.current = true;
      try {
        const win = window as unknown as { adsbygoogle?: Array<Record<string, unknown>> };
        const adsbygoogle = win.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (error) {
        console.error('Google AdSense initialization error:', error);
      }
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex justify-center items-center min-h-[100px] bg-slate-50/50 border border-slate-100/50 rounded-xl my-6 py-2 ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle w-full block"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
