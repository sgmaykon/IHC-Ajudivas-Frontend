import React from 'react';
import { Icon } from '../Icon';
import type { RouteKind } from '../../context/AppContext';

export interface RouteSheetProps {
  destination: string;
  selected: RouteKind;
  onSelect: (kind: RouteKind) => void;
  onStart: (kind: RouteKind) => void;
  onClose: () => void;
  className?: string;
}

/**
 * Componente Figma: "Painel inferior de rotas" (node 1037:513)
 * Variantes: Property 1 = Rota Segura (1037:512) | Rota Insegura (1037:514)
 */
export const RouteSheet: React.FC<RouteSheetProps> = ({
  destination,
  selected,
  onSelect,
  onStart,
  onClose,
  className = '',
}) => {
  return (
    <section
      aria-label="Opções de rota"
      className={`w-full rounded-t-[24px] bg-[var(--ajd-color-surface-raised)] px-3.5 pb-3.5 pt-2 shadow-[0_-4px_16px_rgba(33,29,41,0.14)] ${className}`.trim()}
    >
      {/* Alça */}
      <div className="mb-1.5 flex justify-center">
        <div className="h-1 w-8 rounded-full bg-[#d8d1df]" />
      </div>

      {/* Cabeçalho compacto */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="truncate text-[16px] font-bold text-[var(--ajd-color-text-primary)]">
          Rotas para {destination}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar opções de rota"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-text-secondary)] hover:bg-[var(--ajd-color-surface)]"
        >
          <Icon name="lucide/circle-x" size={20} />
        </button>
      </div>

      {/* Grupo de opções (radiogroup) compacto */}
      <div role="radiogroup" aria-label="Escolha o trajeto" className="flex flex-col gap-1.5">
        {/* Opção 1: Rota Segura */}
        <button
          type="button"
          role="radio"
          aria-checked={selected === 'segura'}
          onClick={() => onSelect('segura')}
          className={`flex w-full cursor-pointer flex-col gap-0.5 rounded-[14px] border-2 px-3 py-2 text-left transition-all ${
            selected === 'segura'
              ? 'border-[var(--ajd-color-primary)] bg-white shadow-xs'
              : 'border-transparent bg-[var(--ajd-color-surface-sunken)]'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Icon
                name="lucide/shield-check"
                size={18}
                className="text-[var(--ajd-color-primary)]"
              />
              <span className="text-[14px] font-bold text-[var(--ajd-color-text-primary)]">
                Rota segura · 12 min
              </span>
            </div>
            <span className="rounded-full bg-[var(--ajd-color-highlight-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--ajd-color-highlight-text)]">
              ✓ Recomendada
            </span>
          </div>
          <p className="truncate text-[11.5px] text-[var(--ajd-color-text-secondary)]">
            850 m · Iluminação constante e movimento de pessoas
          </p>
        </button>

        {/* Opção 2: Rota Insegura */}
        <button
          type="button"
          role="radio"
          aria-checked={selected === 'insegura'}
          onClick={() => onSelect('insegura')}
          className={`flex w-full cursor-pointer flex-col gap-0.5 rounded-[14px] border-2 px-3 py-2 text-left transition-all ${
            selected === 'insegura'
              ? 'border-[var(--ajd-color-warning)] bg-[var(--ajd-color-warning-surface)] shadow-xs'
              : 'border-transparent bg-[var(--ajd-color-surface-sunken)]'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Icon
                name="lucide/triangle-alert"
                size={18}
                className="text-[var(--ajd-color-danger)]"
              />
              <span className="text-[14px] font-bold text-[var(--ajd-color-text-primary)]">
                Rota alternativa · 10 min
              </span>
            </div>
            <span className="rounded-full bg-[var(--ajd-color-warning-highlight-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--ajd-color-warning-strong)]">
              ⚠ Cuidado (-2 min)
            </span>
          </div>
          <p className="truncate text-[11.5px] font-medium text-[var(--ajd-color-warning-strong)]">
            720 m · Trecho com 14 relatos recentes de aglomeração
          </p>
        </button>
      </div>

      {/* CTA principal na metade inferior (RNF01) */}
      <button
        type="button"
        onClick={() => onStart(selected)}
        className="mt-2.5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[22px] bg-[var(--ajd-color-primary)] px-5 text-[14px] font-semibold text-white shadow-[var(--ajd-shadow-1)] transition-colors hover:bg-[var(--ajd-color-primary-hover)] active:scale-[0.99]"
      >
        <Icon name="material/navigation" size={18} />
        <span>Iniciar rota</span>
      </button>
    </section>
  );
};
