/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_PROVIDER?: 'mock' | 'leaflet';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
