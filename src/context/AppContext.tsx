import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_FEED_POSTS,
  INITIAL_MAP_OCCURRENCES,
  type FeedPostItem,
  type LightingCondition,
  type MapOccurrence,
  type PostGravity,
} from '../data/mockData';
import photoRuaEscura from '../assets/photos/rua-pouco-iluminada.jpg';

export type RouteKind = 'segura' | 'insegura';
export type TextScale = 'compact' | 'default' | 'large';

export interface AccessibilityState {
  highContrast: boolean;
  textScale: TextScale;
  voiceGuidance: boolean;
  simplifiedMap: boolean;
}

export interface NewOccurrenceInput {
  anonymous: boolean;
  gravidade: PostGravity;
  iluminacao: LightingCondition;
  fatores: string[];
  relato: string;
  nota: number;
  local: string;
  photoUrl?: string;
}

interface AppContextValue {
  destination: string;
  setDestination: (dest: string) => void;
  selectedRoute: RouteKind;
  setSelectedRoute: (kind: RouteKind) => void;
  mapOccurrences: MapOccurrence[];
  feedPosts: FeedPostItem[];
  toggleLikePost: (postId: string) => void;
  publishOccurrence: (input: NewOccurrenceInput) => void;
  accessibility: AccessibilityState;
  setHighContrast: (v: boolean) => void;
  setTextScale: (s: TextScale) => void;
  setVoiceGuidance: (v: boolean) => void;
  setSimplifiedMap: (v: boolean) => void;
  panicOpen: boolean;
  setPanicOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'ajudivas_prototype_state_v1';

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destination, setDestination] = useState<string>('Casa da Vânia');
  const [selectedRoute, setSelectedRoute] = useState<RouteKind>('segura');

  const [feedPosts, setFeedPosts] = useState<FeedPostItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.feedPosts) && parsed.feedPosts.length > 0) {
          return parsed.feedPosts;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_FEED_POSTS;
  });

  const [mapOccurrences, setMapOccurrences] = useState<MapOccurrence[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.mapOccurrences) && parsed.mapOccurrences.length > 0) {
          return parsed.mapOccurrences;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_MAP_OCCURRENCES;
  });

  const [accessibility, setAccessibility] = useState<AccessibilityState>({
    highContrast: false,
    textScale: 'default',
    voiceGuidance: false,
    simplifiedMap: false,
  });

  const [panicOpen, setPanicOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Apply global WCAG accessibility attributes on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.highContrast) {
      root.setAttribute('data-ajd-contrast', 'high');
    } else {
      root.removeAttribute('data-ajd-contrast');
    }
    if (accessibility.textScale === 'default') {
      root.removeAttribute('data-ajd-text');
    } else {
      root.setAttribute('data-ajd-text', accessibility.textScale);
    }
  }, [accessibility.highContrast, accessibility.textScale]);

  // Persist feedPosts and mapOccurrences
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ feedPosts, mapOccurrences }),
      );
    } catch {
      // ignore quota errors
    }
  }, [feedPosts, mapOccurrences]);

  const toggleLikePost = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              apoiado: !p.apoiado,
              apoios: p.apoiado ? p.apoios - 1 : p.apoios + 1,
            }
          : p,
      ),
    );
  };

  const publishOccurrence = (input: NewOccurrenceInput) => {
    const newPost: FeedPostItem = {
      id: `post-${Date.now()}`,
      autoria: input.anonymous ? 'Anônima' : 'Você (Verificada)',
      verificada: true,
      dataEHorario: 'Agora mesmo',
      gravidade: input.gravidade,
      iluminacao: input.iluminacao,
      nota: input.nota || 2,
      relato:
        input.relato.trim() ||
        (input.fatores.length > 0
          ? `Fatores observados: ${input.fatores.join(', ')}.`
          : 'Alerta registrado pela comunidade neste trecho.'),
      local: input.local,
      bairro: 'Parque Santa Mônica',
      distanciaMetros: 50,
      notaDaImagem: 'IA: Rostos borrados',
      photoUrl: input.photoUrl || photoRuaEscura,
      apoios: 1,
      apoiado: true,
      fatores: input.fatores,
    };

    setFeedPosts((prev) => [newPost, ...prev]);

    if (input.gravidade !== 'Sem problemas') {
      const newMapOcc: MapOccurrence = {
        id: `occ-${Date.now()}`,
        severity: input.gravidade === 'Grave' ? 'grave' : 'media',
        title: input.fatores[0] || (input.gravidade === 'Grave' ? 'Alerta grave no trecho' : 'Ponto de atenção'),
        location: input.local,
        reportsCount: 1,
        reportedAgo: 'Relatado agora',
        rating: input.nota || 2,
        factors: input.fatores.length > 0 ? input.fatores : [`Iluminação: ${input.iluminacao}`],
        photoUrl: input.photoUrl || photoRuaEscura,
        photoAlt: `Foto do alerta em ${input.local}`,
        mockX: 54,
        mockY: 42,
        lat: -22.0142,
        lng: -47.8908,
      };
      setMapOccurrences((prev) => [newMapOcc, ...prev]);
    }

    showToast('Alerta publicado no feed e atualizado no mapa!');
  };

  return (
    <AppContext.Provider
      value={{
        destination,
        setDestination,
        selectedRoute,
        setSelectedRoute,
        mapOccurrences,
        feedPosts,
        toggleLikePost,
        publishOccurrence,
        accessibility,
        setHighContrast: (highContrast) => setAccessibility((a) => ({ ...a, highContrast })),
        setTextScale: (textScale) => setAccessibility((a) => ({ ...a, textScale })),
        setVoiceGuidance: (voiceGuidance) => setAccessibility((a) => ({ ...a, voiceGuidance })),
        setSimplifiedMap: (simplifiedMap) => setAccessibility((a) => ({ ...a, simplifiedMap })),
        panicOpen,
        setPanicOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}
