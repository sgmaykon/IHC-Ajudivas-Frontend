import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { Icon } from '../components/Icon';
import { PostFeed } from '../components/PostFeed';
import { NavBar } from '../components/NavBar';
import { AccessibilityFab } from '../components/AccessibilityFab';
import { useApp } from '../context/AppContext';
import type { PostGravity } from '../data/mockData';
import type { SearchBarState } from '../components/SearchBar';

/**
 * Tela Figma: "Feed Comunitário" (1026:1436)
 */
export const FeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { feedPosts, toggleLikePost } = useApp();

  const [searchValue, setSearchValue] = useState('');
  const [searchState, setSearchState] = useState<SearchBarState>('repouso');
  const [selectedBairro, setSelectedBairro] = useState<string>('Todos');
  const [selectedTipo, setSelectedTipo] = useState<PostGravity | 'Todos'>('Todos');
  const [sortByProx, setSortByProx] = useState<'proximos' | 'recentes'>('proximos');
  const [openFilter, setOpenFilter] = useState<'bairro' | 'tipo' | 'prox' | null>(null);

  const bairros = useMemo(() => {
    const unique = Array.from(new Set(feedPosts.map((p) => p.bairro)));
    return ['Todos', ...unique];
  }, [feedPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    const list = feedPosts.filter((p) => {
      if (selectedBairro !== 'Todos' && p.bairro !== selectedBairro) return false;
      if (selectedTipo !== 'Todos' && p.gravidade !== selectedTipo) return false;
      if (q) {
        const hay = `${p.local} ${p.bairro} ${p.relato} ${p.autoria}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sortByProx === 'proximos') {
      return [...list].sort((a, b) => a.distanciaMetros - b.distanciaMetros);
    }
    return list;
  }, [feedPosts, searchValue, selectedBairro, selectedTipo, sortByProx]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#fafafa]">
      {/* Header + Barra de pesquisa do Feed */}
      <AppHeader
        searchState={searchState}
        searchValue={searchValue}
        searchPlaceholder="Pesquisar rua, bairro ou relato..."
        onSearchFocus={() => setSearchState('edicao')}
        onSearchBlur={() => setSearchState(searchValue ? 'pesquisado' : 'repouso')}
        onSearchChange={(val) => {
          setSearchValue(val);
          setSearchState(val ? 'edicao' : 'repouso');
        }}
        onSearchClear={() => {
          setSearchValue('');
          setSearchState('repouso');
        }}
        onSearchSubmit={() => setSearchState(searchValue ? 'pesquisado' : 'repouso')}
      />

      {/* Conteúdo principal rolável */}
      <main className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-24 pt-3">
        <h1 className="text-center text-[22px] font-semibold leading-[26px] tracking-[-0.5px] text-[var(--ajd-color-primary)]">
          Ocorrências próximas de você
        </h1>

        {/* Filtros: Bairro | Tipo | Proximidade (Figma 1028:325) */}
        <div className="relative flex items-center gap-2">
          {/* Bairro */}
          <button
            type="button"
            onClick={() => setOpenFilter(openFilter === 'bairro' ? null : 'bairro')}
            className={`flex cursor-pointer items-center gap-1 rounded-[20px] border px-2 py-1.5 text-[12px] font-medium transition-colors ${
              selectedBairro !== 'Todos'
                ? 'border-[var(--ajd-color-primary)] bg-[var(--ajd-color-highlight-bg)] text-[var(--ajd-color-highlight-text)]'
                : 'border-[#e7e1eb] bg-white text-[var(--ajd-color-text-secondary)]'
            }`}
          >
            <Icon name="material/location-on" size={18} />
            <span className="max-w-[68px] truncate">
              {selectedBairro === 'Todos' ? 'Bairro' : selectedBairro}
            </span>
            <Icon name="material/expand-more" size={18} />
          </button>

          {/* Tipo */}
          <button
            type="button"
            onClick={() => setOpenFilter(openFilter === 'tipo' ? null : 'tipo')}
            className={`flex cursor-pointer items-center gap-1 rounded-[20px] border px-2 py-1.5 text-[12px] font-medium transition-colors ${
              selectedTipo !== 'Todos'
                ? 'border-[var(--ajd-color-primary)] bg-[var(--ajd-color-highlight-bg)] text-[var(--ajd-color-highlight-text)]'
                : 'border-[#e7e1eb] bg-white text-[var(--ajd-color-text-secondary)]'
            }`}
          >
            <Icon name="material/warning" size={18} />
            <span>{selectedTipo === 'Todos' ? 'Tipo' : selectedTipo}</span>
            <Icon name="material/expand-more" size={18} />
          </button>

          {/* Proximidade */}
          <button
            type="button"
            onClick={() => setOpenFilter(openFilter === 'prox' ? null : 'prox')}
            className={`flex cursor-pointer items-center gap-1 rounded-[20px] border px-2 py-1.5 text-[12px] font-medium transition-colors ${
              sortByProx === 'proximos'
                ? 'border-[var(--ajd-color-primary)] bg-[var(--ajd-color-highlight-bg)] text-[var(--ajd-color-highlight-text)]'
                : 'border-[#e7e1eb] bg-white text-[var(--ajd-color-text-secondary)]'
            }`}
          >
            <Icon name="material/near-me" size={18} />
            <span>{sortByProx === 'proximos' ? 'Proximidade' : 'Recentes'}</span>
            <Icon name="material/expand-more" size={18} />
          </button>

          {/* Dropdown de filtros */}
          {openFilter && (
            <div className="absolute left-0 right-0 top-[44px] z-30 flex flex-wrap gap-1.5 rounded-[16px] border border-[var(--ajd-color-outline)] bg-white p-2.5 shadow-[var(--ajd-shadow-2)]">
              {openFilter === 'bairro' &&
                bairros.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setSelectedBairro(b);
                      setOpenFilter(null);
                    }}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[12px] font-medium ${
                      selectedBairro === b
                        ? 'bg-[var(--ajd-color-primary)] text-white'
                        : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)]'
                    }`}
                  >
                    {b}
                  </button>
                ))}

              {openFilter === 'tipo' &&
                (['Todos', 'Grave', 'Moderado', 'Sem problemas'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setSelectedTipo(t);
                      setOpenFilter(null);
                    }}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[12px] font-medium ${
                      selectedTipo === t
                        ? 'bg-[var(--ajd-color-primary)] text-white'
                        : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}

              {openFilter === 'prox' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSortByProx('proximos');
                      setOpenFilter(null);
                    }}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[12px] font-medium ${
                      sortByProx === 'proximos'
                        ? 'bg-[var(--ajd-color-primary)] text-white'
                        : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)]'
                    }`}
                  >
                    Mais próximos
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSortByProx('recentes');
                      setOpenFilter(null);
                    }}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[12px] font-medium ${
                      sortByProx === 'recentes'
                        ? 'bg-[var(--ajd-color-primary)] text-white'
                        : 'bg-[var(--ajd-color-surface)] text-[var(--ajd-color-text-primary)]'
                    }`}
                  >
                    Mais recentes
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Linha do tempo de posts */}
        <div className="flex flex-col gap-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostFeed key={post.id} post={post} onToggleLike={toggleLikePost} />
            ))
          ) : (
            <div className="rounded-[16px] border border-[var(--ajd-color-outline)] bg-white p-6 text-center text-[13px] text-[var(--ajd-color-text-secondary)]">
              Nenhuma ocorrência encontrada para os filtros selecionados.
            </div>
          )}
        </div>
      </main>

      {/* Botões flutuantes à direita: Acessibilidade + Adicionar postagem (Figma 1229:780 e 1028:469) */}
      <div className="absolute bottom-[126px] right-4 z-30 flex flex-col items-center gap-2">
        <AccessibilityFab />
        <button
          type="button"
          aria-label="Registrar nova ocorrência"
          onClick={() => navigate('/nova-ocorrencia')}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--ajd-color-primary)] text-white shadow-[var(--ajd-shadow-2)] transition-transform hover:bg-[var(--ajd-color-primary-hover)] active:scale-95"
        >
          <Icon name="material/add" size={26} />
        </button>
      </div>

      {/* NavBar com Feed ativo */}
      <div className="bg-[#fafafa] pt-1">
        <NavBar active="feed" />
      </div>
    </div>
  );
};
