import React from 'react';
import { Icon } from '../Icon';
import { SearchBar, type SearchBarState } from '../SearchBar';
import type { SearchSuggestionItem } from '../../data/mockData';

export interface AppHeaderProps {
  city?: string;
  time?: string;
  searchState?: SearchBarState;
  searchValue: string;
  searchPlaceholder?: string;
  suggestions?: SearchSuggestionItem[];
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  onSearchChange: (val: string) => void;
  onSearchSubmit?: (val: string) => void;
  onSearchClear?: () => void;
  onSearchSuggestionSelect?: (item: SearchSuggestionItem) => void;
  className?: string;
}

/**
 * Componente Figma: "header + pesquisa" (node 1018:2148)
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  city = 'São Carlos',
  time = '21:41',
  searchState = 'repouso',
  searchValue,
  searchPlaceholder = 'Para onde você vai com segurança?',
  suggestions = [],
  onSearchFocus,
  onSearchBlur,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  onSearchSuggestionSelect,
  className = '',
}) => {
  return (
    <header className={`relative z-30 w-full shrink-0 ${className}`.trim()}>
      {/* Barra superior (80px = 24px status + 56px app bar) */}
      <div className="flex h-[80px] w-full flex-col bg-[var(--ajd-color-surface)]">
        {/* Status do Android */}
        <div className="flex h-[24px] w-full items-center justify-between px-6 text-[12px] font-semibold text-[var(--ajd-color-text-primary)]">
          <span>{time}</span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="19.5" r="1.2" fill="currentColor" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="15" width="3" height="6" rx="1" />
              <rect x="8.5" y="11" width="3" height="10" rx="1" />
              <rect x="14" y="7" width="3" height="14" rx="1" />
              <rect x="19.5" y="3" width="3" height="18" rx="1" />
            </svg>
            <svg width="18" height="14" viewBox="0 0 26 14" fill="none">
              <rect x="1" y="2" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
              <rect x="3.2" y="4.2" width="15.6" height="5.6" rx="1" fill="currentColor" />
              <path d="M23 5v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Barra do aplicativo */}
        <div className="flex h-[56px] w-full items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <Icon
              name="lucide/shield-check"
              size={28}
              className="text-[var(--ajd-color-primary)]"
            />
            <span className="text-[28px] font-bold leading-none tracking-[-0.5px] text-[var(--ajd-color-primary)]">
              Ajudivas
            </span>
          </div>
          <div className="flex items-center gap-1 text-[12px] font-medium text-[var(--ajd-color-text-secondary)]">
            <Icon name="lucide/map-pin" size={15} className="text-[var(--ajd-color-primary)]" />
            <span>{city}</span>
          </div>
        </div>
      </div>

      {/* Barra de pesquisa flutuante (top 92px -> mt-3) */}
      <div className="px-4 pt-3">
        <SearchBar
          state={searchState}
          value={searchValue}
          placeholder={searchPlaceholder}
          suggestions={suggestions}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          onClear={onSearchClear}
          onSuggestionSelect={onSearchSuggestionSelect}
        />
      </div>
    </header>
  );
};
