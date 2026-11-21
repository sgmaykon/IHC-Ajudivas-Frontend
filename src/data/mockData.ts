import photoAglomeracao from '../assets/photos/aglomeracao-de-homens.jpg';
import photoRuaEscura from '../assets/photos/rua-pouco-iluminada.jpg';

export type OccurrenceSeverity = 'grave' | 'media';
export type PostGravity = 'Grave' | 'Moderado' | 'Sem problemas';
export type LightingCondition = 'Péssima' | 'Regular' | 'Boa';

export interface MapOccurrence {
  id: string;
  severity: OccurrenceSeverity;
  title: string;
  location: string;
  reportsCount: number;
  reportedAgo: string;
  rating: number;
  factors: string[];
  photoUrl: string;
  photoAlt: string;
  /** Coordenadas percentuais no mapa ilustrado (0-100) */
  mockX: number;
  mockY: number;
  /** Coordenadas reais em São Carlos para o Leaflet */
  lat: number;
  lng: number;
}

export interface FeedPostItem {
  id: string;
  autoria: string;
  verificada: boolean;
  dataEHorario: string;
  gravidade: PostGravity;
  iluminacao: LightingCondition;
  nota: number;
  relato: string;
  local: string;
  bairro: string;
  distanciaMetros: number;
  notaDaImagem: string;
  photoUrl: string;
  apoios: number;
  apoiado: boolean;
  fatores: string[];
}

export interface SearchSuggestionItem {
  id: string;
  label: string;
  subtitle?: string;
}

export const INITIAL_MAP_OCCURRENCES: MapOccurrence[] = [
  {
    id: 'occ-grave-1',
    severity: 'grave',
    title: 'Aglomeração de homens',
    location: 'Av. São Carlos · próximo à R. General Osório',
    reportsCount: 14,
    reportedAgo: 'Relatado há 2h',
    rating: 1,
    factors: ['Aglomeração de homens', 'Pouca iluminação', 'Calçada estreita'],
    photoUrl: photoAglomeracao,
    photoAlt: 'Foto do trecho com aglomeração de homens à noite',
    mockX: 36,
    mockY: 53,
    lat: -22.0155,
    lng: -47.8926,
  },
  {
    id: 'occ-media-1',
    severity: 'media',
    title: 'Rua pouco iluminada',
    location: 'Rua Episcopal · altura do nº 1400',
    reportsCount: 6,
    reportedAgo: 'Relatado há 4h',
    rating: 2,
    factors: ['Pouca iluminação', 'Mato alto', 'Via deserta'],
    photoUrl: photoRuaEscura,
    photoAlt: 'Foto de trecho com iluminação pública precária',
    mockX: 79,
    mockY: 31,
    lat: -22.0124,
    lng: -47.8891,
  },
];

export const INITIAL_FEED_POSTS: FeedPostItem[] = [
  {
    id: 'post-1',
    autoria: 'MariStar10',
    verificada: true,
    dataEHorario: '09/11/2026 • Há 10 min',
    gravidade: 'Grave',
    iluminacao: 'Péssima',
    nota: 2,
    relato: 'Postes queimados perto do ponto de ônibus e mato muito alto na calçada.',
    local: 'Av. São Carlos',
    bairro: 'Centro',
    distanciaMetros: 350,
    notaDaImagem: 'IA: Rostos borrados',
    photoUrl: photoRuaEscura,
    apoios: 42,
    apoiado: false,
    fatores: ['Mato alto', 'Pouca iluminação'],
  },
  {
    id: 'post-2',
    autoria: 'bru22',
    verificada: true,
    dataEHorario: '09/11/2026 • Há 1 min',
    gravidade: 'Moderado',
    iluminacao: 'Regular',
    nota: 3,
    relato: 'Iluminação irregular perto do ponto de ônibus. Alguns trechos precisam de atenção.',
    local: 'Rua dos Bem-te-Vis',
    bairro: 'Parque Santa Mônica',
    distanciaMetros: 100,
    notaDaImagem: 'IA: Rostos borrados',
    photoUrl: photoAglomeracao,
    apoios: 16,
    apoiado: false,
    fatores: ['Iluminação irregular', 'Via deserta'],
  },
  {
    id: 'post-3',
    autoria: 'Anônima',
    verificada: true,
    dataEHorario: '09/11/2026 • Há 35 min',
    gravidade: 'Sem problemas',
    iluminacao: 'Boa',
    nota: 5,
    relato: 'Trecho bem iluminado e calçada livre de obstáculos perto do ponto de ônibus.',
    local: 'Praça do Mercado',
    bairro: 'Centro',
    distanciaMetros: 220,
    notaDaImagem: 'IA: Rostos borrados',
    photoUrl: photoRuaEscura,
    apoios: 28,
    apoiado: false,
    fatores: ['Movimento constante'],
  },
];

export const DESTINATION_SUGGESTIONS: SearchSuggestionItem[] = [
  { id: 'dest-1', label: 'Casa da Vânia', subtitle: 'R. Episcopal · 850 m' },
  { id: 'dest-2', label: 'UFSCar — Portaria Sul', subtitle: 'Rod. Washington Luís · 2,4 km' },
  { id: 'dest-3', label: 'USP — Campus 1 (Av. Trabalhador)', subtitle: 'Parque Arnold Schimidt · 1,1 km' },
  { id: 'dest-4', label: 'Praça do Mercado Municipal', subtitle: 'Centro · 450 m' },
  { id: 'dest-5', label: 'Rua dos Bem-te-vis', subtitle: 'Parque Santa Mônica · 600 m' },
];

export const FEAR_FACTOR_SUGGESTIONS: string[] = [
  'Mato alto',
  'Via deserta',
  'Poste queimado / escuro',
  'Aglomeração de homens',
  'Calçada sem visibilidade',
  'Ponto de ônibus isolado',
  'Terreno baldio',
  'Assédio verbal recente',
];

export const TRUSTED_CONTACTS = [
  { id: 'c-1', name: 'Vânia', initial: 'V', isGroup: false },
  { id: 'c-2', name: 'Grupo Moradia', initial: 'G', isGroup: true },
  { id: 'c-3', name: 'Mãe', initial: 'M', isGroup: false },
];

export const SAO_CARLOS_CENTER: [number, number] = [-22.0145, -47.891];
export const USER_LOCATION: [number, number] = [-22.0172, -47.8918];
export const DESTINATION_LOCATION: [number, number] = [-22.0126, -47.8895];

export const SAFE_ROUTE_COORDS: [number, number][] = [
  [-22.0172, -47.8918],
  [-22.0168, -47.8902],
  [-22.0148, -47.8897],
  [-22.0126, -47.8895],
];

export const UNSAFE_ROUTE_COORDS: [number, number][] = [
  [-22.0172, -47.8918],
  [-22.0155, -47.8926],
  [-22.0138, -47.8916],
  [-22.0126, -47.8895],
];
