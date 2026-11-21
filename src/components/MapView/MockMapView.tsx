import React from 'react';
import { Icon } from '../Icon';
import { OccurrenceMarker } from '../OccurrenceMarker';
import type { MapViewProps } from './MapView';

/**
 * Mapa estilizado de São Carlos fiel ao Figma (Fluxo Principal) — 100% offline.
 */
export const MockMapView: React.FC<MapViewProps> = ({
  mode,
  occurrences = [],
  selectedOccurrenceId,
  onSelectOccurrence,
  selectedRoute = 'segura',
  destinationLabel = 'Casa da Vânia (850m)',
  zoom = 1,
  simplified = false,
  className = '',
}) => {
  const isCompact = mode === 'active' || mode === 'arrived';

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#ecebe5] select-none ${className}`.trim()}
    >
      {/* Container escalável pelo zoom */}
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
      >
        {/* Base cartográfica (quadras urbanas + vias) */}
        {!simplified && (
          <div className="pointer-events-none absolute inset-0">
            {/* Vias brancas */}
            <div className="absolute left-0 right-0 top-[54%] h-[18px] bg-white" />
            <div className="absolute left-0 right-0 top-[28%] h-[14px] bg-white/90" />
            <div className="absolute bottom-0 top-0 left-[20%] w-[18px] bg-white" />
            <div className="absolute bottom-0 top-0 left-[48%] w-[18px] bg-white" />
            <div className="absolute bottom-0 top-0 left-[78%] w-[16px] bg-white/90" />

            {/* Quadras urbanas */}
            <div className="absolute left-[2%] top-[16%] h-[10%] w-[16%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[26%] top-[16%] h-[10%] w-[20%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[54%] top-[16%] h-[10%] w-[22%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[83%] top-[16%] h-[10%] w-[15%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />

            <div className="absolute left-[2%] top-[33%] h-[18%] w-[16%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[26%] top-[33%] h-[18%] w-[20%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[54%] top-[33%] h-[18%] w-[22%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[83%] top-[33%] h-[18%] w-[15%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />

            <div className="absolute left-[2%] top-[60%] h-[18%] w-[16%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            <div className="absolute left-[26%] top-[60%] h-[18%] w-[20%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />
            {/* Praça do Mercado (área verde) */}
            <div className="absolute left-[54%] top-[61%] flex h-[17%] w-[22%] items-center justify-center rounded-[12px] bg-[#dbe6d5] px-1 text-center text-[10px] leading-tight text-[#5f6259]">
              Praça do Mercado
            </div>
            <div className="absolute left-[83%] top-[60%] h-[18%] w-[15%] rounded-[6px] border border-[#d8d7d1] bg-[#e2e1dc]" />

            {/* Nomes das vias de São Carlos */}
            <span className="absolute left-[1%] top-[44%] -rotate-90 text-[10px] text-[#5f6259]">
              Av. São Carlos
            </span>
            <span className="absolute right-[13%] top-[44%] -rotate-90 text-[10px] text-[#5f6259]">
              R. Episcopal
            </span>
            <span className="absolute left-[55%] top-[54.5%] text-[10px] text-[#5f6259]">
              R. General Osório
            </span>
            {!isCompact && (
              <span className="absolute left-[53%] top-[79%] text-[10px] text-[#5f6259]">
                R. Sete de Setembro
              </span>
            )}
          </div>
        )}

        {/* Traçados de rota (modo routes ou active) */}
        {(mode === 'routes' || mode === 'active') && (
          <svg
            viewBox="0 0 390 400"
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {/* Rota Insegura (vermelho tracejado) */}
            {mode === 'routes' && (
              <path
                d="M 88 330 L 88 228 L 170 228 L 270 168"
                fill="none"
                stroke="#dc2626"
                strokeWidth={selectedRoute === 'insegura' ? 6 : 4}
                strokeDasharray="8 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={selectedRoute === 'insegura' ? 1 : 0.65}
              />
            )}

            {/* Rota Segura (roxo contínuo) */}
            <path
              d={
                mode === 'active'
                  ? 'M 88 320 L 88 225 L 190 225 L 190 175 L 258 175'
                  : 'M 88 330 L 195 330 L 195 228 L 270 228 L 270 168'
              }
              fill="none"
              stroke="#6750a4"
              strokeWidth={selectedRoute === 'segura' || mode === 'active' ? 6 : 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={selectedRoute === 'segura' || mode === 'active' ? 1 : 0.65}
            />
          </svg>
        )}

        {/* Selos das rotas no modo Opções de Rota */}
        {mode === 'routes' && (
          <>
            <div className="pointer-events-none absolute left-[6%] top-[49%] flex h-[30px] items-center gap-1.5 rounded-full bg-[#dc2626] px-2.5 text-[11.5px] font-semibold text-white shadow-[var(--ajd-shadow-1)]">
              <Icon name="lucide/triangle-alert" size={14} />
              <span>+ Perigosa | -2 min</span>
            </div>

            <div className="pointer-events-none absolute left-[6%] top-[73%] flex h-[32px] items-center gap-1.5 rounded-full bg-[#f3edf7] px-3 text-[12.5px] font-semibold text-[#6750a4] shadow-[var(--ajd-shadow-1)]">
              <Icon name="lucide/shield-check" size={16} />
              <span>Rota Segura</span>
            </div>

            <div className="pointer-events-none absolute left-[48%] top-[59%] flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-[#6750a4] bg-white text-[#6750a4]">
              <Icon name="material/lightbulb" size={18} />
            </div>

            <div className="pointer-events-none absolute left-[66%] top-[37%] flex h-9 w-9 items-center justify-center rounded-full bg-[#6750a4] text-white shadow-[var(--ajd-shadow-1)]">
              <Icon name="material/flag" size={18} />
            </div>
          </>
        )}

        {/* Badge de destino no modo Percurso Ativo / Chegada */}
        {isCompact && (
          <>
            <div className="pointer-events-none absolute left-[24%] top-[27%] flex items-center gap-1.5 rounded-[12px] bg-white px-3 py-1.5 shadow-[0_2px_8px_rgba(33,29,41,0.1)]">
              <Icon name="material/home" size={20} className="text-[#6750a4]" />
              <span className="text-[12px] font-bold text-[#6750a4]">{destinationLabel}</span>
            </div>

            {/* Ponto de chegada */}
            <div className="pointer-events-none absolute left-[64%] top-[42%] h-3.5 w-3.5 rounded-full border-2 border-white bg-[#6750a4] shadow" />
          </>
        )}

        {/* Marcadores de ocorrência (modos home e routes) */}
        {(mode === 'home' || mode === 'routes') &&
          occurrences.map((occ) => (
            <OccurrenceMarker
              key={occ.id}
              severity={occ.severity}
              selected={selectedOccurrenceId === occ.id}
              onClick={() => onSelectOccurrence?.(occ)}
              style={{
                position: 'absolute',
                left: `${occ.mockX}%`,
                top: `${occ.mockY}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

        {/* Localização atual ("Você") */}
        <div
          className="pointer-events-none absolute flex flex-col items-center"
          style={
            mode === 'arrived'
              ? { left: '66%', top: '44%', transform: 'translate(-50%, -50%)' }
              : mode === 'active'
                ? { left: '23%', top: '80%', transform: 'translate(-50%, -50%)' }
                : mode === 'routes'
                  ? { left: '22.5%', top: '82.5%', transform: 'translate(-50%, -50%)' }
                  : { left: '50%', top: '79%', transform: 'translate(-50%, -50%)' }
          }
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#6750a4]/25" />
            <span className="h-[18px] w-[18px] rounded-full border-[3px] border-white bg-[#6750a4] shadow" />
          </span>
          <span className="mt-0.5 rounded bg-white/80 px-1.5 text-[11px] font-bold text-[#6750a4]">
            {isCompact ? 'Você · A pé' : 'Você'}
          </span>
        </div>
      </div>

      {/* Escala cartográfica */}
      <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-1.5">
        <span className="h-[2px] w-7 bg-[#625b71]" />
        <span className="text-[10px] text-[#625b71]">100 m</span>
      </div>
    </div>
  );
};
