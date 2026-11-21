import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

export type NavBarTab = 'inicio' | 'feed' | 'percurso';

export interface NavBarProps {
  active: NavBarTab;
  /** Na tela de Percurso Ativo / Chegada, o 4º item vira "Percurso" (Figma 1032:1198) */
  showPercursoTab?: boolean;
  className?: string;
}

/**
 * Componente Figma: "NavBar" (node 1029:2603 / 1018:1982 / 1029:2604 / 1032:1198)
 */
export const NavBar: React.FC<NavBarProps> = ({
  active,
  showPercursoTab = false,
  className = '',
}) => {
  const navigate = useNavigate();
  const { setPanicOpen, showToast } = useApp();

  return (
    <nav
      aria-label="Navegação principal"
      className={`relative z-30 mx-auto flex h-[116px] w-[366px] shrink-0 flex-col items-center ${className}`.trim()}
    >
      <div className="relative flex h-[92px] w-full items-start justify-between rounded-[32px] bg-[var(--ajd-color-surface)] p-2 shadow-[0_4px_8px_rgba(33,29,41,0.15)]">
        {/* Início */}
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-current={active === 'inicio' ? 'page' : undefined}
          className="relative flex h-[76px] w-[70px] cursor-pointer flex-col items-center pt-2 text-[var(--ajd-color-primary)]"
        >
          <span
            className={`flex h-8 w-14 items-center justify-center rounded-2xl transition-colors ${
              active === 'inicio' ? 'bg-[var(--ajd-color-highlight-bg)]' : ''
            }`}
          >
            <Icon name="lucide/house" size={24} />
          </span>
          <span
            className={`mt-2 text-[11px] leading-[13px] ${
              active === 'inicio' ? 'font-bold' : 'font-medium'
            }`}
          >
            Início
          </span>
        </button>

        {/* Feed */}
        <button
          type="button"
          onClick={() => navigate('/feed')}
          aria-current={active === 'feed' ? 'page' : undefined}
          className="relative flex h-[76px] w-[70px] cursor-pointer flex-col items-center pt-2 text-[var(--ajd-color-primary)]"
        >
          <span
            className={`flex h-8 w-14 items-center justify-center rounded-2xl transition-colors ${
              active === 'feed' ? 'bg-[var(--ajd-color-highlight-bg)]' : ''
            }`}
          >
            <Icon name="lucide/message-square" size={24} />
          </span>
          <span
            className={`mt-2 text-[11px] leading-[13px] ${
              active === 'feed' ? 'font-bold' : 'font-medium'
            }`}
          >
            Feed
          </span>
        </button>

        {/* Pânico (botão central elevado de 56px, RNF01/RNF04) */}
        <button
          type="button"
          onClick={() => setPanicOpen(true)}
          aria-label="Acionar pânico"
          className="relative flex h-[76px] w-[70px] cursor-pointer flex-col items-center justify-end pb-1"
        >
          <span className="absolute -top-[26px] left-[7px] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[var(--ajd-color-danger)] text-white shadow-[var(--ajd-shadow-1)] transition-transform active:scale-95">
            <Icon name="lucide/triangle-alert" size={28} />
          </span>
          <span className="text-[11px] font-bold leading-[13px] text-[var(--ajd-color-danger-highlight-text)]">
            Pânico
          </span>
        </button>

        {/* 4º item: Percurso (no modo navegação) ou Contatos úteis */}
        {showPercursoTab ? (
          <button
            type="button"
            onClick={() => navigate('/percurso')}
            aria-current={active === 'percurso' ? 'page' : undefined}
            className={`relative flex h-[76px] w-[70px] cursor-pointer flex-col items-center rounded-2xl pt-2 text-[var(--ajd-color-primary)] ${
              active === 'percurso' ? 'bg-[var(--ajd-color-highlight-bg)]' : ''
            }`}
          >
            <span className="flex h-8 w-14 items-center justify-center">
              <Icon name="material/route" size={24} />
            </span>
            <span className="mt-2 text-[11px] font-bold leading-[13px]">Percurso</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              showToast('Contatos úteis: tela não incluída no Fluxo Principal do protótipo.')
            }
            className="relative flex h-[76px] w-[70px] cursor-pointer flex-col items-center pt-2 text-[var(--ajd-color-primary)]"
          >
            <span className="flex h-8 w-14 items-center justify-center rounded-2xl">
              <Icon name="material/call" size={24} />
            </span>
            <span className="mt-1.5 text-center text-[11px] font-medium leading-[12px]">
              Contatos
              <br />
              úteis
            </span>
          </button>
        )}

        {/* Ajustes */}
        <button
          type="button"
          onClick={() =>
            showToast('Ajustes: tela não incluída no Fluxo Principal do protótipo.')
          }
          className="relative flex h-[76px] w-[70px] cursor-pointer flex-col items-center pt-2 text-[var(--ajd-color-primary)]"
        >
          <span className="flex h-8 w-14 items-center justify-center rounded-2xl">
            <Icon name="lucide/settings" size={24} />
          </span>
          <span className="mt-2 text-[11px] font-medium leading-[13px]">Ajustes</span>
        </button>
      </div>

      {/* Indicador de gestos do Android */}
      <div
        aria-hidden="true"
        className="mt-[13px] h-1 w-[120px] rounded-full bg-[var(--ajd-color-text-primary)]"
      />
    </nav>
  );
};
