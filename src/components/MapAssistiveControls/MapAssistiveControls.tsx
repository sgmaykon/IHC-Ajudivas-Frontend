import React from 'react';
import { Icon } from '../Icon';
import { AccessibilityFab } from '../AccessibilityFab';

export interface MapAssistiveControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  withContainerBg?: boolean;
  className?: string;
}

/**
 * Controles assistivos flutuantes do mapa no Figma (Acessibilidade + Zoom In + Zoom Out).
 */
export const MapAssistiveControls: React.FC<MapAssistiveControlsProps> = ({
  onZoomIn,
  onZoomOut,
  withContainerBg = false,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col gap-2 ${
        withContainerBg ? 'rounded-[20px] bg-[#e0f2fe] p-1' : ''
      } ${className}`.trim()}
    >
      <AccessibilityFab />
      <button
        type="button"
        onClick={onZoomIn}
        aria-label="Ampliar mapa"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[16px] bg-[#0284c7] text-white shadow-[var(--ajd-shadow-1)] transition-transform hover:bg-[#0369a1] active:scale-95"
      >
        <Icon name="material/add" size={24} />
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        aria-label="Reduzir mapa"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[16px] bg-[#0284c7] text-white shadow-[var(--ajd-shadow-1)] transition-transform hover:bg-[#0369a1] active:scale-95"
      >
        <Icon name="material/remove" size={24} />
      </button>
    </div>
  );
};
