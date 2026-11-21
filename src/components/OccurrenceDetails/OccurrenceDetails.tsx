import React from 'react';
import { Icon } from '../Icon';
import type { MapOccurrence } from '../../data/mockData';

export interface OccurrenceDetailsProps {
  occurrence: MapOccurrence;
  onClose: () => void;
  className?: string;
}

/**
 * Componente Figma: "Detalhes da ocorrência" (node 1016:759)
 * Variantes: Property 1 = Grave (1016:758) | Médio (1016:760)
 */
export const OccurrenceDetails: React.FC<OccurrenceDetailsProps> = ({
  occurrence,
  onClose,
  className = '',
}) => {
  const isMedia = occurrence.severity === 'media';

  return (
    <section
      role="dialog"
      aria-label={`Detalhes da ocorrência: ${occurrence.title}`}
      className={`w-[358px] max-w-[calc(100%-32px)] overflow-hidden rounded-[20px] border bg-[var(--ajd-color-surface-raised)] p-4 shadow-[var(--ajd-shadow-2)] ${
        isMedia
          ? 'border-[var(--ajd-color-warning-outline)]'
          : 'border-[var(--ajd-color-danger-highlight-bg)]'
      } ${className}`.trim()}
    >
      {/* Cabeçalho */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${
              isMedia ? 'bg-[var(--ajd-color-warning)]' : 'bg-[var(--ajd-color-danger)]'
            }`}
          >
            <Icon name="lucide/triangle-alert" size={18} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <h2 className="text-[16px] font-bold leading-tight text-[var(--ajd-color-text-primary)]">
                {occurrence.title}
              </h2>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  isMedia
                    ? 'bg-[var(--ajd-color-warning-highlight-bg)] text-[var(--ajd-color-warning-strong)]'
                    : 'bg-[var(--ajd-color-danger-highlight-bg)] text-[var(--ajd-color-danger-highlight-text)]'
                }`}
              >
                {isMedia ? 'Atenção · Médio' : 'Perigo · Grave'}
              </span>
            </div>
            <p className="mt-0.5 text-[12px] text-[var(--ajd-color-text-secondary)]">
              {occurrence.location}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes da ocorrência"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-text-secondary)] hover:bg-[var(--ajd-color-surface)]"
        >
          <Icon name="lucide/x" size={20} />
        </button>
      </div>

      {/* Corpo: foto + informações */}
      <div className="mt-3 flex gap-3">
        <div className="relative h-[108px] w-[112px] shrink-0 overflow-hidden rounded-[12px]">
          <img
            src={occurrence.photoUrl}
            alt={occurrence.photoAlt}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-1.5 left-1.5 rounded-md bg-[var(--ajd-color-overlay-photo)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--ajd-color-text-primary)] backdrop-blur-xs">
            {occurrence.reportedAgo}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[15px] tracking-[1px] ${
                  isMedia
                    ? 'text-[var(--ajd-color-warning-strong)]'
                    : 'text-[var(--ajd-color-danger-strong)]'
                }`}
                aria-label={`Avaliação ${occurrence.rating} de 5`}
              >
                {'★'.repeat(occurrence.rating)}
                {'☆'.repeat(5 - occurrence.rating)}
              </span>
              <span className="text-[11px] font-medium text-[var(--ajd-color-text-secondary)]">
                {occurrence.rating}/5
              </span>
            </div>

            <p className="mt-1 text-[12px] font-semibold text-[var(--ajd-color-text-primary)]">
              {occurrence.reportsCount} relatos da comunidade
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {occurrence.factors.map((f) => (
              <span
                key={f}
                className="rounded-md bg-[var(--ajd-color-surface)] px-2 py-0.5 text-[11px] font-medium text-[var(--ajd-color-text-primary)]"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
