import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { MapView } from '../components/MapView';
import { MapAssistiveControls } from '../components/MapAssistiveControls';
import { ActiveRoutePanel } from '../components/ActiveRoutePanel';
import { NavBar } from '../components/NavBar';
import { useApp } from '../context/AppContext';

/**
 * Tela Figma: "Mapa (Iniciar rota)" (1032:1093)
 */
export const ActiveRoutePage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, selectedRoute, accessibility } = useApp();
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--ajd-color-surface-raised)]">
      {/* Status bar + Barra superior de instrução */}
      <header className="shrink-0 bg-[var(--ajd-color-surface)]">
        <div className="flex h-[24px] items-center justify-between px-6 text-[12px] font-semibold text-[var(--ajd-color-text-primary)]">
          <span>21:41</span>
          <span className="text-[11px] font-medium text-[var(--ajd-color-text-secondary)]">
            GPS Ativo
          </span>
        </div>
        <div className="flex h-[56px] items-center gap-1 pl-2 pr-4">
          <button
            type="button"
            onClick={() => navigate('/rotas')}
            aria-label="Voltar para opções de rota"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-primary)] hover:bg-[var(--ajd-color-highlight-bg)]"
          >
            <Icon name="material/arrow-back" size={24} />
          </button>
          <h1 className="truncate text-[22px] font-semibold text-[var(--ajd-color-primary)]">
            Siga reto por 200m
          </h1>
        </div>
      </header>

      {/* Mapa urbano compacto (h-[250px]) */}
      <div className="relative h-[248px] w-full shrink-0 overflow-hidden bg-[#ecebe5]">
        <MapView
          mode="active"
          selectedRoute={selectedRoute}
          destinationLabel={`${destination} (850m)`}
          zoom={zoom}
          simplified={accessibility.simplifiedMap}
        />

        {/* Banner de consentimento transparente (RNF10 / Figma 1032:1121) */}
        <div className="absolute inset-x-4 top-2.5 z-20 flex h-12 items-center gap-2.5 rounded-[12px] border border-[#e4dded] bg-[var(--ajd-color-surface-raised)] px-3 shadow-xs">
          <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#16a34a]" />
          <p className="text-[12.5px] leading-[16px] text-[var(--ajd-color-text-primary)]">
            Monitoramento em 2º plano ativo (GPS e sensor de passos)
          </p>
        </div>

        {/* Controles assistivos */}
        <MapAssistiveControls
          onZoomIn={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
          onZoomOut={() => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
          className="absolute bottom-2 right-3 z-20 scale-90 origin-bottom-right"
        />
      </div>

      {/* Painel de percurso ativo */}
      <div className="flex-1 overflow-y-auto">
        <ActiveRoutePanel
          mode="active"
          durationLabel={selectedRoute === 'segura' ? '11 min' : '9 min'}
          onPauseOrDiscard={() => navigate('/')}
          onSimulateArrival={() => navigate('/chegada')}
        />
      </div>

      {/* NavBar com Percurso ativo */}
      <div className="bg-[var(--ajd-color-surface-raised)] pt-1">
        <NavBar active="percurso" showPercursoTab />
      </div>
    </div>
  );
};
