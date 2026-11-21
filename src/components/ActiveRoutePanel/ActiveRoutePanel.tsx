import React, { useState } from 'react';
import { Icon } from '../Icon';
import { TRUSTED_CONTACTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export interface ActiveRoutePanelProps {
  mode: 'active' | 'arrived';
  durationLabel?: string;
  onPauseOrDiscard: () => void;
  onConfirmArrival?: () => void;
  onSimulateArrival?: () => void;
}

/**
 * Painel inferior das telas "Mapa (Iniciar rota)" (1032:1157) e "Mapa (Chegada)" (1033:2816)
 */
export const ActiveRoutePanel: React.FC<ActiveRoutePanelProps> = ({
  mode,
  durationLabel = '11 min',
  onPauseOrDiscard,
  onConfirmArrival,
  onSimulateArrival,
}) => {
  const { showToast } = useApp();
  const [paused, setPaused] = useState(false);
  const [sharedWith, setSharedWith] = useState<string[]>([]);

  const toggleShareContact = (id: string, name: string) => {
    setSharedWith((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists
          ? `Compartilhamento com ${name} interrompido.`
          : `Rota em tempo real compartilhada com ${name}!`,
      );
      return next;
    });
  };

  return (
    <section
      aria-label="Painel de percurso ativo"
      className="flex w-full flex-col gap-2 rounded-t-[28px] bg-[var(--ajd-color-surface-raised)] px-4 pb-3 pt-2 shadow-[0_-3px_14px_rgba(33,29,41,0.08)]"
    >
      {/* Alça */}
      <div className="flex justify-center">
        <div className="h-1 w-8 rounded-full bg-[#d8d1df]" />
      </div>

      {/* Resumo do percurso */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-semibold leading-tight text-[var(--ajd-color-text-primary)]">
          Percurso Ativo
        </h2>
        <div className="flex items-center gap-2">
          {mode === 'active' && onSimulateArrival && (
            <button
              type="button"
              onClick={onSimulateArrival}
              className="cursor-pointer rounded-full bg-[var(--ajd-color-highlight-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ajd-color-highlight-text)] hover:opacity-90"
            >
              Simular chegada →
            </button>
          )}
          <span className="text-[12px] font-medium text-[var(--ajd-color-text-secondary)]">
            {mode === 'arrived' ? '0 min' : durationLabel}
          </span>
        </div>
      </div>

      {/* Status do ritmo */}
      <div className="flex min-h-[40px] items-center gap-2 rounded-[12px] bg-[var(--ajd-color-surface)] px-3 py-1.5">
        <Icon
          name="material/directions-walk"
          size={22}
          className="text-[var(--ajd-color-primary)]"
        />
        <p className="text-[13px] leading-[17px] text-[var(--ajd-color-text-secondary)]">
          {paused
            ? 'Registro pausado pela usuária • Dados protegidos (RNF10)'
            : 'Ritmo de caminhada monitorado • Sem alterações detectadas'}
        </p>
      </div>

      {/* Pausar ou Descartar Registro de Rota */}
      <button
        type="button"
        onClick={() => {
          if (!paused) {
            setPaused(true);
            showToast('Monitoramento pausado. Toque novamente para descartar e encerrar.');
          } else {
            onPauseOrDiscard();
          }
        }}
        className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-[20px] border border-[#d8d1df] bg-[var(--ajd-color-surface-raised)] px-4 text-left transition-colors hover:bg-[#fef2f2]"
      >
        <Icon
          name="lucide/circle-x"
          size={22}
          className="text-[var(--ajd-color-danger-highlight-text)]"
        />
        <span className="text-[13px] font-medium text-[var(--ajd-color-danger-highlight-text)]">
          {paused ? 'Descartar Registro e Voltar ao Mapa' : 'Pausar ou Descartar Registro de Rota'}
        </span>
      </button>

      {/* Rede de Confiança */}
      <h3 className="pt-0.5 text-[16px] font-semibold leading-5 text-[var(--ajd-color-text-primary)]">
        Rede de Confiança
      </h3>

      <button
        type="button"
        onClick={() =>
          showToast('Link da rota em tempo real copiado para envio no WhatsApp / Contatos!')
        }
        className="flex min-h-[52px] w-full cursor-pointer items-center gap-3 rounded-[20px] bg-[var(--ajd-color-highlight-bg)] px-4 py-2 text-left transition-opacity hover:opacity-90"
      >
        <Icon name="material/share" size={22} className="text-[#38275d]" />
        <span className="text-[14px] font-medium leading-[18px] text-[#38275d]">
          Compartilhar link da rota em tempo real (WhatsApp / Contatos)
        </span>
      </button>

      {/* Contatos de confiança */}
      <div className="flex flex-wrap items-center gap-2">
        {TRUSTED_CONTACTS.map((c) => {
          const isShared = sharedWith.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleShareContact(c.id, c.name)}
              className={`flex h-10 cursor-pointer items-center gap-1.5 rounded-[12px] border px-2.5 transition-colors ${
                isShared
                  ? 'border-[var(--ajd-color-primary)] bg-[var(--ajd-color-highlight-bg)]'
                  : 'border-[#d8d1df] bg-[var(--ajd-color-surface-raised)] hover:bg-[var(--ajd-color-surface)]'
              }`}
            >
              {c.isGroup ? (
                <Icon
                  name="material/groups"
                  size={20}
                  className="text-[var(--ajd-color-primary)]"
                />
              ) : (
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[var(--ajd-color-surface)] text-[11px] font-bold text-[var(--ajd-color-primary)]">
                  {c.initial}
                </span>
              )}
              <span className="text-[13px] font-medium text-[var(--ajd-color-text-primary)]">
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botão Confirmar Chegada Segura (presente na tela Mapa Chegada — 1033:2841) */}
      {mode === 'arrived' && onConfirmArrival && (
        <button
          type="button"
          onClick={onConfirmArrival}
          className="mt-1 flex h-14 w-full cursor-pointer items-center gap-3 rounded-[20px] bg-[var(--ajd-color-primary)] px-4 text-left text-white shadow-[var(--ajd-shadow-1)] transition-colors hover:bg-[var(--ajd-color-primary-hover)] active:scale-[0.99]"
        >
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
            <Icon name="material/verified" size={20} />
          </span>
          <span className="text-[14px] font-semibold leading-[19px]">
            Confirmar: Cheguei Segura
            <br />
            (Avisar Contatos)
          </span>
        </button>
      )}
    </section>
  );
};
