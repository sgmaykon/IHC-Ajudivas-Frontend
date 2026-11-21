import React from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

export interface AccessibilityToolbarProps {
  onClose?: () => void;
  className?: string;
}

/**
 * Componente Figma: "AccessibilityToolbar" (node 1104:841 / 1214:1139)
 */
export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  onClose,
  className = '',
}) => {
  const {
    accessibility,
    setHighContrast,
    setTextScale,
    setVoiceGuidance,
    setSimplifiedMap,
    showToast,
  } = useApp();

  const cycleTextScale = () => {
    const next =
      accessibility.textScale === 'default'
        ? 'large'
        : accessibility.textScale === 'large'
          ? 'compact'
          : 'default';
    setTextScale(next);
    const label = next === 'large' ? '115%' : next === 'compact' ? '90%' : '100%';
    showToast(`Tamanho do texto: ${label}`);
  };

  return (
    <div
      role="toolbar"
      aria-label="Barra de acessibilidade"
      className={`flex items-center gap-1.5 rounded-[20px] border border-[var(--ajd-color-outline-strong)] bg-[var(--ajd-color-surface-raised)] p-2 shadow-[var(--ajd-shadow-2)] ${className}`.trim()}
    >
      {/* Contraste */}
      <button
        type="button"
        aria-pressed={accessibility.highContrast}
        onClick={() => {
          const next = !accessibility.highContrast;
          setHighContrast(next);
          showToast(next ? 'Alto contraste ativado (WCAG AAA)' : 'Contraste padrão restaurado');
        }}
        className={`flex h-12 min-w-[68px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[14px] px-2 text-[11px] font-semibold transition-colors ${
          accessibility.highContrast
            ? 'bg-[var(--ajd-color-primary)] text-white'
            : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)] hover:bg-[var(--ajd-color-highlight-bg)]'
        }`}
      >
        <Icon name="material/contrast" size={20} />
        <span>Contraste</span>
      </button>

      {/* Voz */}
      <button
        type="button"
        aria-pressed={accessibility.voiceGuidance}
        onClick={() => {
          const next = !accessibility.voiceGuidance;
          setVoiceGuidance(next);
          showToast(next ? 'Orientação por voz ativada' : 'Orientação por voz desativada');
        }}
        className={`flex h-12 min-w-[58px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[14px] px-2 text-[11px] font-semibold transition-colors ${
          accessibility.voiceGuidance
            ? 'bg-[var(--ajd-color-primary)] text-white'
            : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)] hover:bg-[var(--ajd-color-highlight-bg)]'
        }`}
      >
        <Icon name="material/volume-up" size={20} />
        <span>Voz</span>
      </button>

      {/* Mapa simplificado */}
      <button
        type="button"
        aria-pressed={accessibility.simplifiedMap}
        onClick={() => {
          const next = !accessibility.simplifiedMap;
          setSimplifiedMap(next);
          showToast(next ? 'Mapa simplificado ativado' : 'Mapa detalhado restaurado');
        }}
        className={`flex h-12 min-w-[58px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[14px] px-2 text-[11px] font-semibold transition-colors ${
          accessibility.simplifiedMap
            ? 'bg-[var(--ajd-color-primary)] text-white'
            : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)] hover:bg-[var(--ajd-color-highlight-bg)]'
        }`}
      >
        <Icon name="material/map" size={20} />
        <span>Mapa</span>
      </button>

      {/* Texto */}
      <button
        type="button"
        onClick={cycleTextScale}
        className={`flex h-12 min-w-[58px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[14px] px-2 text-[11px] font-semibold transition-colors ${
          accessibility.textScale !== 'default'
            ? 'bg-[var(--ajd-color-primary)] text-white'
            : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)] hover:bg-[var(--ajd-color-highlight-bg)]'
        }`}
      >
        <Icon name="material/text-increase" size={20} />
        <span>
          {accessibility.textScale === 'large'
            ? 'Texto +'
            : accessibility.textScale === 'compact'
              ? 'Texto −'
              : 'Texto'}
        </span>
      </button>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar barra de acessibilidade"
          className="flex h-10 w-8 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-text-secondary)] hover:bg-[var(--ajd-color-surface)]"
        >
          <Icon name="lucide/x" size={18} />
        </button>
      )}
    </div>
  );
};
