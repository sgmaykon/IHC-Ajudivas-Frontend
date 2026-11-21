import React, { useId, useState } from 'react';
import { Icon } from '../Icon';
import type { SearchSuggestionItem } from '../../data/mockData';

export type SearchBarState = 'repouso' | 'edicao' | 'pesquisado';

export interface SearchBarProps {
  state?: SearchBarState;
  value: string;
  placeholder?: string;
  suggestions?: SearchSuggestionItem[];
  suggestionsHeading?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  onSuggestionSelect?: (suggestion: SearchSuggestionItem) => void;
  className?: string;
}

/**
 * Componente Figma: "Ajudivas / Barra de pesquisa" (node 1012:321)
 * Variantes: Estado=Repouso | Em edição | Pesquisado
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  state = 'repouso',
  value,
  placeholder = 'Para onde você vai com segurança?',
  suggestions = [],
  suggestionsHeading = 'Sugestões recentes',
  onFocus,
  onBlur,
  onChange,
  onSubmit,
  onClear,
  onSuggestionSelect,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId();

  const normalized = value.trim().toLowerCase();
  const filtered = normalized
    ? suggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(normalized) ||
          s.subtitle?.toLowerCase().includes(normalized),
      )
    : suggestions;

  const isEditing = state === 'edicao';
  const showDropdown = isEditing && filtered.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && showDropdown) {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp' && showDropdown) {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showDropdown && activeIndex >= 0 && filtered[activeIndex]) {
        onSuggestionSelect?.(filtered[activeIndex]);
      } else {
        onSubmit?.(value);
      }
      setActiveIndex(-1);
    } else if (e.key === 'Escape') {
      setActiveIndex(-1);
      onBlur?.();
    }
  };

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div
        className={`flex h-14 w-full items-center gap-2 rounded-[32px] bg-[var(--ajd-color-surface-raised)] pl-[18px] pr-4 transition-all ${
          isEditing
            ? 'border-2 border-[var(--ajd-color-primary)] shadow-[var(--ajd-shadow-2)]'
            : 'border border-transparent shadow-[var(--ajd-shadow-1)]'
        }`}
      >
        <input
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listboxId : undefined}
          aria-activedescendant={
            showDropdown && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
          }
          value={value}
          placeholder={placeholder}
          onFocus={() => {
            setActiveIndex(-1);
            onFocus?.();
          }}
          onChange={(e) => {
            setActiveIndex(-1);
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--ajd-color-text-primary)] placeholder:text-[var(--ajd-color-text-secondary)] focus:outline-none"
        />

        {value && (isEditing || state === 'pesquisado') && (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={() => {
              onChange('');
              onClear?.();
            }}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-text-secondary)] hover:bg-[var(--ajd-color-primary-soft)]"
          >
            <Icon name="lucide/x" size={18} />
          </button>
        )}

        <button
          type="button"
          aria-label="Pesquisar"
          onClick={() => onSubmit?.(value)}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-primary)] hover:bg-[var(--ajd-color-primary-soft)]"
        >
          <Icon name="lucide/search" size={22} />
        </button>
      </div>

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[62px] z-40 max-h-[240px] overflow-y-auto rounded-[20px] border border-[var(--ajd-color-outline)] bg-[var(--ajd-color-surface-raised)] p-2 shadow-[var(--ajd-shadow-2)]"
        >
          <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--ajd-color-text-secondary)]">
            {suggestionsHeading}
          </p>
          <div className="flex flex-col gap-0.5">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                id={`${listboxId}-${idx}`}
                role="option"
                aria-selected={activeIndex === idx}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSuggestionSelect?.(item);
                }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors ${
                  activeIndex === idx
                    ? 'bg-[var(--ajd-color-highlight-bg)] text-[var(--ajd-color-highlight-text)]'
                    : 'hover:bg-[var(--ajd-color-primary-soft)]'
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--ajd-color-surface)] text-[var(--ajd-color-primary)]">
                  <Icon name="material/location-on" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-[var(--ajd-color-text-primary)]">
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span className="block truncate text-[11px] text-[var(--ajd-color-text-secondary)]">
                      {item.subtitle}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
