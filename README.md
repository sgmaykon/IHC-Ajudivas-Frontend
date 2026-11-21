# Ajudivas — Frontend (Protótipo Interativo)

Protótipo mobile-first em **React 19 + TypeScript + Vite + Tailwind CSS + React Router**, construído a partir da aba **Fluxo Principal** e da aba **Componentes** do Figma (`Projeto-IHC`).

## Como rodar o projeto

1. **Instale as dependências:**
   ```sh
   npm i
   ```

2. **Configure o arquivo `.env`:**
   Copie o arquivo de exemplo `.env.example` para `.env`:
   ```sh
   cp .env.example .env
   ```

   Escolha qual provedor de mapa deseja usar editando a variável `VITE_MAP_PROVIDER` no `.env`:
   ```env
   # "mock" (padrão) — Mapa ilustrado de São Carlos fiel ao Figma (funciona 100% offline)
   # "leaflet"       — Mapa real interativo com Leaflet + OpenStreetMap
   VITE_MAP_PROVIDER=mock
   ```
   *(Sempre que alterar o `.env`, reinicie o servidor de desenvolvimento.)*

3. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

4. **Build de produção (opcional):**
   ```sh
   npm run build
   ```

## Estrutura do projeto

- `src/pages/` — Uma página por tela do **Fluxo Principal** do Figma:
  - `/` — **Home (Mapa Interativo)** + detalhes de ocorrência (Grave / Média) + busca
  - `/rotas` — **Home (Rotas Opções)** + detalhes de ocorrência sobre a rota (`RouteSheet`)
  - `/percurso` — **Mapa (Iniciar rota)** (monitoramento em 2º plano + Rede de Confiança)
  - `/chegada` — **Mapa (Chegada)** (confirmação *Cheguei Segura*)
  - `/feed` — **Feed Comunitário** (busca, filtros Bairro / Tipo / Proximidade, apoios e FAB `+`)
  - `/nova-ocorrencia` — **Nova ocorrência** (anônimo LGPD / perfil, gravidade, iluminação, busca e seleção de fatores de medo, foto, relato e avaliação por estrelas)
- `src/components/` — Componentes do Design System (cada componente em sua própria pasta).
- `src/context/AppContext.tsx` — Estado compartilhado e persistido em `localStorage`.
- `src/data/mockData.ts` — Dados mockados de São Carlos.
