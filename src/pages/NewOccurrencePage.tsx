import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { NavBar } from '../components/NavBar';
import { AccessibilityFab } from '../components/AccessibilityFab';
import {
  FEAR_FACTOR_SUGGESTIONS,
  type LightingCondition,
  type PostGravity,
} from '../data/mockData';
import { useApp } from '../context/AppContext';

/**
 * Tela Figma: "Nova ocorrência" (1083:537)
 * + estados "Nova ocorrência · sugestões" (1137:609), "busca" (1137:684) e "selecionados" (1143:775)
 */
export const NewOccurrencePage: React.FC = () => {
  const navigate = useNavigate();
  const { publishOccurrence } = useApp();

  const [anonymous, setAnonymous] = useState(true);
  const [gravidade, setGravidade] = useState<PostGravity>('Grave');
  const [iluminacao, setIluminacao] = useState<LightingCondition>('Péssima');
  const [factorQuery, setFactorQuery] = useState('');
  const [factorDropdownOpen, setFactorDropdownOpen] = useState(false);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([
    'Mato alto',
    'Via deserta',
  ]);
  const [relato, setRelato] = useState('');
  const [rating, setRating] = useState(2);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredFactors = useMemo(() => {
    const q = factorQuery.trim().toLowerCase();
    return FEAR_FACTOR_SUGGESTIONS.filter(
      (f) => !selectedFactors.includes(f) && (!q || f.toLowerCase().includes(q)),
    );
  }, [factorQuery, selectedFactors]);

  const addFactor = (factor: string) => {
    const clean = factor.trim();
    if (!clean) return;
    if (!selectedFactors.includes(clean)) {
      setSelectedFactors((prev) => [...prev, clean]);
    }
    setFactorQuery('');
    setFactorDropdownOpen(false);
  };

  const removeFactor = (factor: string) => {
    setSelectedFactors((prev) => prev.filter((f) => f !== factor));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    publishOccurrence({
      anonymous,
      gravidade,
      iluminacao,
      fatores: selectedFactors,
      relato,
      nota: rating,
      local: 'Rua dos Bem-te-vis',
      photoUrl: photoPreview,
    });
    navigate('/feed');
  };

  const gravidadeColor =
    gravidade === 'Grave'
      ? 'text-[#dc2626]'
      : gravidade === 'Moderado'
        ? 'text-[#92400e]'
        : 'text-[#166534]';

  const iluminacaoColor =
    iluminacao === 'Péssima'
      ? 'text-[#dc2626]'
      : iluminacao === 'Regular'
        ? 'text-[#92400e]'
        : 'text-[#166534]';

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#fffbfe]">
      {/* Cabeçalho (Figma 1083:538) */}
      <header className="shrink-0 bg-[var(--ajd-color-surface)] px-4 pb-3 pt-1">
        <div className="flex h-[20px] items-center justify-between text-[12px] font-medium text-[var(--ajd-color-text-primary)]">
          <span>21:41</span>
          <span className="text-[11px] text-[var(--ajd-color-text-secondary)]">São Carlos</span>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/feed')}
            aria-label="Voltar para o Feed"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-primary)] hover:bg-[var(--ajd-color-highlight-bg)]"
          >
            <Icon name="material/arrow-back" size={24} />
          </button>
          <h1 className="text-[22px] font-medium leading-6 text-[var(--ajd-color-primary)]">
            Registrar Ocorrência
          </h1>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[#49454f]">
          <Icon name="material/location-on" size={20} className="text-[var(--ajd-color-primary)]" />
          <span>Local: Rua dos Bem-te-vis</span>
        </div>
      </header>

      {/* Formulário rolável */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6 pt-3"
      >
        {/* Identidade e privacidade (Figma 1083:539) */}
        <div className="flex flex-col gap-2">
          <span className="text-[16px] font-medium text-[#49454f]">Como deseja publicar?</span>
          <div className="grid h-11 grid-cols-2 overflow-hidden rounded-[22px] border border-[#79747e] bg-[#fffbfe]">
            <button
              type="button"
              onClick={() => setAnonymous(false)}
              className={`flex cursor-pointer flex-col items-center justify-center transition-colors ${
                !anonymous
                  ? 'rounded-[20px] bg-[#e8def8] text-[#4f378b]'
                  : 'text-[#49454f]'
              }`}
            >
              <span className="text-[12px] font-medium leading-tight">
                {!anonymous ? '✓ ' : ''}Publicar com meu Perfil
              </span>
              <span className="text-[10px] leading-tight opacity-80">Foto e Nome</span>
            </button>
            <button
              type="button"
              onClick={() => setAnonymous(true)}
              className={`flex cursor-pointer flex-col items-center justify-center transition-colors ${
                anonymous
                  ? 'rounded-[20px] bg-[#e8def8] text-[#4f378b]'
                  : 'text-[#49454f]'
              }`}
            >
              <span className="text-[12px] font-medium leading-tight">
                {anonymous ? '✓ ' : ''}Publicar como Anônima
              </span>
              <span className="text-[10px] leading-tight opacity-80">LGPD</span>
            </button>
          </div>
        </div>

        {/* Select: Gravidade da Ocorrência */}
        <div className="relative">
          <label
            htmlFor="gravidade-select"
            className="absolute -top-2.5 left-3 z-10 bg-[#fffbfe] px-1 text-[12px] text-[#49454f]"
          >
            Gravidade da Ocorrência
          </label>
          <select
            id="gravidade-select"
            value={gravidade}
            onChange={(e) => setGravidade(e.target.value as PostGravity)}
            className={`h-14 w-full cursor-pointer appearance-none rounded-[4px] border border-[#79747e] bg-[#fffbfe] px-4 pr-10 text-[16px] focus:border-[var(--ajd-color-primary)] focus:outline-none ${gravidadeColor}`}
          >
            <option value="Grave">Grave / Perigo</option>
            <option value="Moderado">Moderado / Atenção</option>
            <option value="Sem problemas">Sem problemas / Seguro</option>
          </select>
          <Icon
            name="material/expand-more"
            size={24}
            className="pointer-events-none absolute right-3 top-4 text-[#49454f]"
          />
        </div>

        {/* Select: Condição de Iluminação */}
        <div className="relative">
          <label
            htmlFor="iluminacao-select"
            className="absolute -top-2.5 left-3 z-10 bg-[#fffbfe] px-1 text-[12px] text-[#49454f]"
          >
            Condição de Iluminação
          </label>
          <select
            id="iluminacao-select"
            value={iluminacao}
            onChange={(e) => setIluminacao(e.target.value as LightingCondition)}
            className={`h-14 w-full cursor-pointer appearance-none rounded-[4px] border border-[#79747e] bg-[#fffbfe] px-4 pr-10 text-[16px] focus:border-[var(--ajd-color-primary)] focus:outline-none ${iluminacaoColor}`}
          >
            <option value="Péssima">Péssima</option>
            <option value="Regular">Regular</option>
            <option value="Boa">Boa</option>
          </select>
          <Icon
            name="material/expand-more"
            size={24}
            className="pointer-events-none absolute right-3 top-4 text-[#49454f]"
          />
        </div>

        {/* Infraestrutura e Fatores de Medo (Figma 1137:609 / 1137:684 / 1143:775) */}
        <div className="relative flex flex-col gap-2">
          <span className="text-[16px] font-medium text-[var(--ajd-color-text-primary)]">
            Infraestrutura e Fatores de Medo
          </span>

          <div className="flex h-12 items-center gap-2 rounded-[32px] bg-white pl-4 pr-3 shadow-[var(--ajd-shadow-1)]">
            <input
              type="text"
              value={factorQuery}
              placeholder="Indique um fator de medo"
              onFocus={() => setFactorDropdownOpen(true)}
              onChange={(e) => {
                setFactorQuery(e.target.value);
                setFactorDropdownOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFactor(factorQuery);
                }
              }}
              className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--ajd-color-text-primary)] placeholder:text-[var(--ajd-color-text-secondary)] focus:outline-none"
            />
            <button
              type="button"
              aria-label="Adicionar fator"
              onClick={() =>
                factorQuery.trim()
                  ? addFactor(factorQuery)
                  : setFactorDropdownOpen((o) => !o)
              }
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[var(--ajd-color-primary)]"
            >
              <Icon name="lucide/search" size={20} />
            </button>
          </div>

          {/* Sugestões de fatores */}
          {factorDropdownOpen && filteredFactors.length > 0 && (
            <div className="z-20 max-h-[160px] overflow-y-auto rounded-[16px] border border-[var(--ajd-color-outline)] bg-white p-1.5 shadow-[var(--ajd-shadow-2)]">
              {filteredFactors.map((f) => (
                <button
                  key={f}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addFactor(f);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-left text-[13px] text-[var(--ajd-color-text-primary)] hover:bg-[var(--ajd-color-surface)]"
                >
                  <span>{f}</span>
                  <Icon name="material/add" size={18} className="text-[var(--ajd-color-primary)]" />
                </button>
              ))}
            </div>
          )}

          {/* Chips selecionados (Figma 1143:815) */}
          {selectedFactors.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-0.5">
              {selectedFactors.map((factor) => (
                <button
                  key={factor}
                  type="button"
                  onClick={() => removeFactor(factor)}
                  title="Toque para remover"
                  className="flex h-9 cursor-pointer items-center gap-1.5 rounded-[8px] bg-[#e8def8] px-3 text-[12px] font-medium text-[#4f378b] hover:opacity-85"
                >
                  <span>✓ {factor}</span>
                  <Icon name="lucide/x" size={14} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upload de imagem + Relato opcional (Figma 1092:661) */}
        <div className="flex items-start gap-2.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Adicionar foto do local"
            className="relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[12px] border border-[#79747e] bg-[#f7f2fa] text-[#49454f] hover:bg-[#e8def8]"
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Prévia" className="h-full w-full object-cover" />
            ) : (
              <>
                <Icon name="material/photo-camera" size={34} />
                <Icon
                  name="material/add"
                  size={18}
                  className="absolute right-1 top-1 text-[var(--ajd-color-primary)]"
                />
              </>
            )}
          </button>

          <div className="relative flex-1">
            <label
              htmlFor="relato-textarea"
              className="absolute -top-2 left-2.5 bg-[#fffbfe] px-1 text-[11px] font-medium text-[var(--ajd-color-primary)]"
            >
              Relato (opcional)
            </label>
            <textarea
              id="relato-textarea"
              rows={3}
              value={relato}
              onChange={(e) => setRelato(e.target.value)}
              placeholder="Descreva brevemente o que aconteceu ou avise outras mulheres..."
              className="h-[86px] w-full resize-none rounded-[4px] border border-[#79747e] bg-[#fffbfe] px-3 py-2.5 text-[13px] leading-[18px] text-[var(--ajd-color-text-primary)] placeholder:text-[var(--ajd-color-text-secondary)] focus:border-[var(--ajd-color-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Avaliação Interativa 1 a 5 estrelas (Figma 1186:946) */}
        <div className="flex flex-col gap-1">
          <span className="text-[16px] font-medium text-[var(--ajd-color-text-primary)]">
            Avalie sua Experiência no Local
          </span>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Nota de 1 a 5 estrelas">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={rating === star}
                aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-[30px] leading-none transition-transform active:scale-90 ${
                  star <= rating ? 'text-[var(--ajd-color-primary)]' : 'text-[#d8d1df]'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <span className="text-[12px] text-[var(--ajd-color-text-secondary)]">
            Escolha de 1 a 5 estrelas para classificar
          </span>
        </div>

        {/* Botão Publicar Alerta no Feed (Figma 1083:607) */}
        <button
          type="submit"
          className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[24px] bg-[var(--ajd-color-primary)] px-4 text-[14px] font-medium text-white shadow-[var(--ajd-shadow-1)] transition-colors hover:bg-[var(--ajd-color-primary-hover)] active:scale-[0.99]"
        >
          <Icon name="material/send" size={20} />
          <span>Publicar Alerta no Feed</span>
        </button>
      </form>

      {/* Botão flutuante de acessibilidade */}
      <AccessibilityFab className="absolute bottom-[128px] right-4 z-30" />

      {/* NavBar com Feed ativo */}
      <div className="bg-[#fffbfe] pt-1">
        <NavBar active="feed" />
      </div>
    </div>
  );
};
