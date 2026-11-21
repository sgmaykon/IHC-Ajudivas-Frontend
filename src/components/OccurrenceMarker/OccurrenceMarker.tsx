import React from 'react';
import { Icon } from '../Icon';
import type { OccurrenceSeverity } from '../../data/mockData';

export interface OccurrenceMarkerProps {
  severity: OccurrenceSeverity;
  selected?: boolean;
  label?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Componente Figma: "Ocorrencia" (node 1016:798)
 * Variantes: Property 1 = Grave | Média
 */
export const OccurrenceMarker: React.FC<OccurrenceMarkerProps> = ({
  severity,
  selected = false,
  label = 'Ocorrência',
  onClick,
  className = '',
  style,
}) => {
  const isMedia = severity === 'media';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${label} (${isMedia ? 'gravidade média' : 'gravidade grave'})`}
      style={style}
      className={`group relative flex h-[116px] w-[116px] cursor-pointer items-center justify-center rounded-full border transition-transform active:scale-95 ${
        isMedia
          ? 'border-[#e46962] bg-[rgba(220,38,38,0.10)]'
          : 'border-[rgba(220,38,38,0.25)] bg-[rgba(220,38,38,0.10)]'
      } ${selected ? 'ring-4 ring-[var(--ajd-color-primary)]/40' : ''} ${className}`.trim()}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white text-white shadow-sm transition-transform group-hover:scale-110 ${
          isMedia ? 'bg-[var(--ajd-color-warning)]' : 'bg-[var(--ajd-color-danger)]'
        }`}
      >
        <Icon name="lucide/triangle-alert" size={20} />
      </span>
      <span
        className={`absolute bottom-[20px] text-[12px] font-bold leading-none ${
          isMedia
            ? 'text-[var(--ajd-color-warning-highlight-text)]'
            : 'text-[var(--ajd-color-danger-highlight-text)]'
        }`}
      >
        {label}
      </span>
    </button>
  );
};
