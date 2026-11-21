import React from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

/**
 * Diálogo de confirmação do botão Pânico da NavBar (RNF04 / Interactions.mdx).
 * Não cria página fora do Fluxo Principal: aciona discagem/alerta sobre a tela atual.
 */
export const PanicDialog: React.FC = () => {
  const { panicOpen, setPanicOpen, showToast } = useApp();

  if (!panicOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="panic-dialog-title"
      className="absolute inset-0 z-50 flex items-end justify-center bg-[var(--ajd-color-scrim)] p-4"
    >
      <div className="w-full rounded-[24px] border-2 border-[var(--ajd-color-danger)] bg-[var(--ajd-color-surface-raised)] p-5 shadow-[var(--ajd-shadow-3)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ajd-color-danger)] text-white">
              <Icon name="lucide/triangle-alert" size={22} />
            </span>
            <div>
              <h2
                id="panic-dialog-title"
                className="text-[18px] font-bold text-[var(--ajd-color-danger-highlight-text)]"
              >
                Acionar Emergência
              </h2>
              <p className="text-[12px] text-[var(--ajd-color-text-secondary)]">
                Discador rápido georreferenciado · São Carlos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPanicOpen(false)}
            aria-label="Cancelar emergência"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-text-secondary)] hover:bg-[var(--ajd-color-surface)]"
          >
            <Icon name="lucide/x" size={20} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <a
            href="tel:190"
            onClick={(e) => {
              e.preventDefault();
              setPanicOpen(false);
              showToast('Discador aberto: Polícia Militar (190) + localização enviada à Rede de Confiança.');
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[20px] bg-[var(--ajd-color-danger)] px-4 text-[15px] font-bold text-white shadow-sm hover:bg-[var(--ajd-color-danger-strong)]"
          >
            <Icon name="material/call" size={20} />
            <span>Ligar Polícia Militar (190)</span>
          </a>

          <a
            href="tel:180"
            onClick={(e) => {
              e.preventDefault();
              setPanicOpen(false);
              showToast('Discador aberto: Central de Atendimento à Mulher (180).');
            }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-[20px] border border-[var(--ajd-color-danger)] bg-[#fef2f2] px-4 text-[14px] font-semibold text-[var(--ajd-color-danger-highlight-text)]"
          >
            <Icon name="material/call" size={18} />
            <span>Central da Mulher (180)</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setPanicOpen(false);
              showToast('Alerta silencioso com sua localização enviado para Vânia, Grupo Moradia e Mãe.');
            }}
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] bg-[var(--ajd-color-highlight-bg)] px-4 text-[14px] font-semibold text-[var(--ajd-color-highlight-text)]"
          >
            <Icon name="material/share" size={18} />
            <span>Enviar alerta silencioso à Rede de Confiança</span>
          </button>
        </div>
      </div>
    </div>
  );
};
