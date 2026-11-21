import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  DESTINATION_LOCATION,
  SAFE_ROUTE_COORDS,
  SAO_CARLOS_CENTER,
  UNSAFE_ROUTE_COORDS,
  USER_LOCATION,
} from '../../data/mockData';
import type { MapViewProps } from './MapView';

/**
 * Mapa real com Leaflet + OpenStreetMap em São Carlos.
 * Ativado quando VITE_MAP_PROVIDER=leaflet.
 */
export const LeafletMapView: React.FC<MapViewProps> = ({
  mode,
  occurrences = [],
  selectedOccurrenceId,
  onSelectOccurrence,
  selectedRoute = 'segura',
  destinationLabel = 'Casa da Vânia (850m)',
  zoom = 1,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // Inicializa o mapa Leaflet uma única vez
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: SAO_CARLOS_CENTER,
      zoom: 15,
      zoomControl: false,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    const group = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerGroupRef.current = group;

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  // Sincroniza zoom externo dos botões assistivos
  useEffect(() => {
    if (!mapRef.current) return;
    const baseZoom = 15;
    const targetZoom = Math.round(baseZoom + (zoom - 1) * 4);
    mapRef.current.setZoom(Math.max(13, Math.min(18, targetZoom)));
  }, [zoom]);

  // Atualiza marcadores e rotas quando props mudam
  useEffect(() => {
    const group = layerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    // Rotas
    if (mode === 'routes') {
      L.polyline(UNSAFE_ROUTE_COORDS, {
        color: '#dc2626',
        weight: selectedRoute === 'insegura' ? 6 : 4,
        dashArray: '8 6',
        opacity: selectedRoute === 'insegura' ? 1 : 0.65,
      }).addTo(group);

      L.polyline(SAFE_ROUTE_COORDS, {
        color: '#6750a4',
        weight: selectedRoute === 'segura' ? 6 : 4,
        opacity: selectedRoute === 'segura' ? 1 : 0.65,
      }).addTo(group);
    } else if (mode === 'active') {
      L.polyline(SAFE_ROUTE_COORDS, {
        color: '#6750a4',
        weight: 6,
        opacity: 1,
      }).addTo(group);
    }

    // Destino
    if (mode === 'routes' || mode === 'active' || mode === 'arrived') {
      const destIcon = L.divIcon({
        className: '',
        html: `<div style="display:flex;align-items:center;gap:4px;background:#fff;border:2px solid #6750a4;border-radius:12px;padding:4px 8px;font:700 11px Roboto,sans-serif;color:#6750a4;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.15);">🏁 ${destinationLabel}</div>`,
        iconSize: [140, 28],
        iconAnchor: [70, 14],
      });
      L.marker(DESTINATION_LOCATION, { icon: destIcon }).addTo(group);
    }

    // Ocorrências
    if (mode === 'home' || mode === 'routes') {
      occurrences.forEach((occ) => {
        const isMedia = occ.severity === 'media';
        const bg = isMedia ? '#e46962' : '#dc2626';
        const ring = selectedOccurrenceId === occ.id ? '0 0 0 4px rgba(103,80,164,0.45)' : 'none';
        const occIcon = L.divIcon({
          className: '',
          html: `<div style="width:40px;height:40px;border-radius:999px;background:rgba(220,38,38,0.18);display:flex;align-items:center;justify-content:center;box-shadow:${ring};cursor:pointer;"><div style="width:28px;height:28px;border-radius:999px;background:${bg};border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">!</div></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        const marker = L.marker([occ.lat, occ.lng], { icon: occIcon }).addTo(group);
        marker.on('click', () => onSelectOccurrence?.(occ));
      });
    }

    // Localização da usuária
    const userPos = mode === 'arrived' ? DESTINATION_LOCATION : USER_LOCATION;
    const userIcon = L.divIcon({
      className: '',
      html: `<div style="display:flex;flex-direction:column;align-items:center;"><div style="width:18px;height:18px;border-radius:999px;background:#6750a4;border:3px solid #fff;box-shadow:0 0 0 8px rgba(103,80,164,0.22);"></div><span style="margin-top:3px;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:6px;font:700 11px Roboto,sans-serif;color:#6750a4;">Você</span></div>`,
      iconSize: [44, 38],
      iconAnchor: [22, 12],
    });
    L.marker(userPos, { icon: userIcon }).addTo(group);
  }, [mode, occurrences, selectedOccurrenceId, selectedRoute, destinationLabel, onSelectOccurrence]);

  return <div ref={containerRef} className={`h-full w-full ${className}`.trim()} />;
};
