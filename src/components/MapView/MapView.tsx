import React from 'react';
import type { MapOccurrence } from '../../data/mockData';
import type { RouteKind } from '../../context/AppContext';
import { MockMapView } from './MockMapView';
import { LeafletMapView } from './LeafletMapView';

export type MapMode = 'home' | 'routes' | 'active' | 'arrived';

export interface MapViewProps {
  mode: MapMode;
  occurrences?: MapOccurrence[];
  selectedOccurrenceId?: string | null;
  onSelectOccurrence?: (occ: MapOccurrence) => void;
  selectedRoute?: RouteKind;
  destinationLabel?: string;
  zoom?: number;
  simplified?: boolean;
  className?: string;
}

export const MAP_PROVIDER =
  import.meta.env.VITE_MAP_PROVIDER === 'leaflet' ? 'leaflet' : 'mock';

/**
 * Seleciona entre o mapa ilustrado mockado (padrão) e o mapa Leaflet (OpenStreetMap)
 * com base na variável de ambiente VITE_MAP_PROVIDER ("mock" | "leaflet").
 */
export const MapView: React.FC<MapViewProps> = (props) => {
  if (MAP_PROVIDER === 'leaflet') {
    return <LeafletMapView {...props} />;
  }
  return <MockMapView {...props} />;
};
