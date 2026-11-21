import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { MapView } from '../components/MapView';
import { MapAssistiveControls } from '../components/MapAssistiveControls';
import { OccurrenceDetails } from '../components/OccurrenceDetails';
import { RouteSheet } from '../components/RouteSheet';
import { DESTINATION_SUGGESTIONS, type MapOccurrence } from '../data/mockData';
import { useApp } from '../context/AppContext';
import type { SearchBarState } from '../components/SearchBar';

/**
 * Tela Figma: "Home (Rotas Opções)" (1012:359)
 * + estado "Home (Rota + Detalhes Ocorrência)" (1018:1546)
 */
export const RouteOptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    destination,
    setDestination,
    selectedRoute,
    setSelectedRoute,
    mapOccurrences,
    accessibility,
  } = useApp();

  const [searchValue, setSearchValue] = useState(destination);
  const [searchState, setSearchState] = useState<SearchBarState>('pesquisado');
  const [selectedOccurrence, setSelectedOccurrence] = useState<MapOccurrence | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#ecebe5]">
      {/* Área do mapa ocupando todo o fundo livre atrás do header e acima do RouteSheet */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0">
          <MapView
            mode="routes"
            occurrences={mapOccurrences}
            selectedOccurrenceId={selectedOccurrence?.id ?? null}
            onSelectOccurrence={(occ) => setSelectedOccurrence(occ)}
            selectedRoute={selectedRoute}
            destinationLabel={`${destination} (850m)`}
            zoom={zoom}
            simplified={accessibility.simplifiedMap}
          />
        </div>

        {/* Header + Pesquisa flutuando sobre o topo do mapa */}
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
          onSearchClear={() => {
            setSearchValue('');
            navigate('/');
          }}
          onSearchSuggestionSelect={(item) => {
            setSearchValue(item.label);
            setDestination(item.label);
            setSearchState('pesquisado');
          }}
          onSearchSubmit={(val) => {
            const clean = val.trim() || 'Casa da Vânia';
            setSearchValue(clean);
            setDestination(clean);
            setSearchState('pesquisado');
          }}
        />

        {/* Controles assistivos */}
        <MapAssistiveControls
          onZoomIn={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
          onZoomOut={() => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
          className="absolute bottom-3 right-3 z-20"
        />

        {/* Detalhes da ocorrência sobrepostos à rota (Figma 1018:1546) */}
        {selectedOccurrence && (
          <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center px-3">
            <OccurrenceDetails
              occurrence={selectedOccurrence}
              onClose={() => setSelectedOccurrence(null)}
            />
          </div>
        )}
      </div>

      {/* Painel inferior de rotas compacto (Figma 1037:513) */}
      <RouteSheet
        destination={destination}
        selected={selectedRoute}
        onSelect={setSelectedRoute}
        onStart={(kind) => {
          setSelectedRoute(kind);
          navigate('/percurso');
        }}
        onClose={() => navigate('/')}
      />
    </div>
  );
};
