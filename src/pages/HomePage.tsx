import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { MapView } from '../components/MapView';
import { MapAssistiveControls } from '../components/MapAssistiveControls';
import { OccurrenceDetails } from '../components/OccurrenceDetails';
import { NavBar } from '../components/NavBar';
import { DESTINATION_SUGGESTIONS, type MapOccurrence } from '../data/mockData';
import { useApp } from '../context/AppContext';
import type { SearchBarState } from '../components/SearchBar';

/**
 * Tela Figma: "Home (Mapa Interativo)" (1004:2131)
 * + estados "Home (Detalhes Ocorrência Grave)" (1012:563) e "Média" (1016:888)
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { mapOccurrences, setDestination, accessibility } = useApp();

  const [searchValue, setSearchValue] = useState('');
  const [searchState, setSearchState] = useState<SearchBarState>('repouso');
  const [selectedOccurrence, setSelectedOccurrence] = useState<MapOccurrence | null>(null);
  const [zoom, setZoom] = useState(1);

  const goToRoutes = (dest: string) => {
    const clean = dest.trim() || 'Casa da Vânia';
    setDestination(clean);
    navigate('/rotas');
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#ecebe5]">
      {/* Mapa em tela cheia ao fundo */}
      <div className="absolute inset-0 z-0">
        <MapView
          mode="home"
          occurrences={mapOccurrences}
          selectedOccurrenceId={selectedOccurrence?.id ?? null}
          onSelectOccurrence={(occ) => {
            setSelectedOccurrence(occ);
            setSearchState('repouso');
          }}
          zoom={zoom}
          simplified={accessibility.simplifiedMap}
        />
      </div>

      {/* Header + Barra de Pesquisa */}
      <AppHeader
        searchState={searchState}
        searchValue={searchValue}
        suggestions={DESTINATION_SUGGESTIONS}
        onSearchFocus={() => setSearchState('edicao')}
        onSearchBlur={() => setSearchState(searchValue ? 'pesquisado' : 'repouso')}
        onSearchChange={(val) => {
          setSearchValue(val);
          setSearchState('edicao');
        }}
        onSearchClear={() => setSearchState('repouso')}
        onSearchSuggestionSelect={(item) => {
          setSearchValue(item.label);
          setSearchState('pesquisado');
          goToRoutes(item.label);
        }}
        onSearchSubmit={(val) => {
          setSearchState('pesquisado');
          goToRoutes(val);
        }}
      />

      {/* Espaçador central flexível */}
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col justify-end pb-3">
        {/* Card de Detalhes da Ocorrência (quando um marcador é clicado) */}
        {selectedOccurrence && (
          <div className="pointer-events-auto flex justify-center px-4 pb-2">
            <OccurrenceDetails
              occurrence={selectedOccurrence}
              onClose={() => setSelectedOccurrence(null)}
            />
          </div>
        )}
      </div>

      {/* Controles assistivos flutuantes (direita, acima da NavBar) */}
      {!selectedOccurrence && (
        <MapAssistiveControls
          withContainerBg
          onZoomIn={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
          onZoomOut={() => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
          className="absolute bottom-[132px] right-3 z-20"
        />
      )}

      {/* Barra de navegação inferior */}
      <div className="relative z-30 pb-1">
        <NavBar active="inicio" />
      </div>
    </div>
  );
};
