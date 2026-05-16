'use client';

import { useCVStore } from '@/store/useCVStore';
import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Dynamically import templates to avoid heavy initial bundle
const NeoMinimal = dynamic(() => import('@/templates/NeoMinimal'));
const CyberBlue = dynamic(() => import('@/templates/CyberBlue'));
const TokyoMinimal = dynamic(() => import('@/templates/TokyoMinimal'));
const CreativeGradient = dynamic(() => import('@/templates/CreativeGradient'));
const ExecutiveDark = dynamic(() => import('@/templates/ExecutiveDark'));
const ModernAvatar = dynamic(() => import('@/templates/ModernAvatar'));

// A4 dimensions in px at 96 dpi
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1122;

export default function CVPreview() {
  const { data } = useCVStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(1);
  const [manualZoom, setManualZoom] = useState<number | null>(null);

  const currentScale = manualZoom !== null ? manualZoom : autoScale;

  // Auto-scaling: fit A4 width inside the parent container with 40px total padding
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 40;
        const newScale = Math.min(availableWidth / A4_WIDTH_PX, 1);
        setAutoScale(Math.max(newScale, 0.3));
      }
    };

    // Run immediately on mount then track resizes
    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleZoomIn = () => {
    setManualZoom(prev => Math.min((prev !== null ? prev : autoScale) + 0.1, 2));
  };

  const handleZoomOut = () => {
    setManualZoom(prev => Math.max((prev !== null ? prev : autoScale) - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setManualZoom(null);
  };

  const renderTemplate = () => {
    switch (data.templateId) {
      case 'neo-minimal':
        return <NeoMinimal data={data} />;
      case 'cyber-blue':
        return <CyberBlue data={data} />;
      case 'tokyo-minimal':
        return <TokyoMinimal data={data} />;
      case 'creative-gradient':
        return <CreativeGradient data={data} />;
      case 'executive-dark':
        return <ExecutiveDark data={data} />;
      case 'modern-avatar':
        return <ModernAvatar data={data} />;
      default:
        return <NeoMinimal data={data} />;
    }
  };

  // The scaled height + 96px vertical padding so the scrollable area is always correct
  const scaledContentHeight = A4_HEIGHT_PX * currentScale + 96;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto bg-slate-200 custom-scrollbar"
    >
      {/* Zoom Controls Floating Bar */}
      <div className="sticky top-4 left-1/2 -translate-x-1/2 z-30 flex items-center bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 shadow-lg space-x-2 transition-all hover:bg-white w-fit mx-auto">
        <Tooltip>
          <TooltipTrigger
            className="h-8 w-8 rounded-full inline-flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>

        <div className="text-xs font-mono font-medium text-slate-500 min-w-[3rem] text-center">
          {Math.round(currentScale * 100)}%
        </div>

        <Tooltip>
          <TooltipTrigger
            className="h-8 w-8 rounded-full inline-flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        <Tooltip>
          <TooltipTrigger
            className={`h-8 w-8 rounded-full inline-flex items-center justify-center transition-colors cursor-pointer ${
              manualZoom === null ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100 text-slate-700'
            }`}
            onClick={handleResetZoom}
          >
            <Maximize className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>Auto Fit</TooltipContent>
        </Tooltip>
      </div>

      {/*
        Outer div height is set to the scaled A4 height + padding.
        This ensures the scrollable area correctly expands/contracts when zoom changes
        instead of using a negative marginBottom hack.
      */}
      <div
        className="flex justify-center pt-6 pb-12"
        style={{ minHeight: `${scaledContentHeight}px` }}
      >
        <div
          style={{
            transform: `scale(${currentScale})`,
            transformOrigin: 'top center',
            width: `${A4_WIDTH_PX}px`,
            height: `${A4_HEIGHT_PX}px`,
            flexShrink: 0,
          }}
          className="shadow-2xl transition-transform duration-200 bg-white"
          id="cv-preview-container"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
