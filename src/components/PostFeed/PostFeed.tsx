import React from 'react';
import { Icon } from '../Icon';
import type { FeedPostItem } from '../../data/mockData';

export interface PostFeedProps {
  post: FeedPostItem;
  onToggleLike: (postId: string) => void;
  className?: string;
}

/**
 * Componente Figma: "Post Feed" (node 1076:939)
 * Variantes: Gravidade=Grave (1076:940) | Moderado (1076:968) | Sem problemas (1076:996)
 */
export const PostFeed: React.FC<PostFeedProps> = ({ post, onToggleLike, className = '' }) => {
  const isModerado = post.gravidade === 'Moderado';
  const isSemProblemas = post.gravidade === 'Sem problemas';

  const badgeStyle = isSemProblemas
    ? 'bg-[#f0fdf4] border-[#15803d] text-[#166534]'
    : isModerado
      ? 'bg-[#fffbeb] border-[#b45309] text-[#92400e]'
      : 'bg-[#fef2f2] border-[#991b1b] text-[#b91c1c]';

  const starsColor = isSemProblemas
    ? 'text-[#166534]'
    : isModerado
      ? 'text-[#92400e]'
      : 'text-[#b91c1c]';

  const avatarBg = isSemProblemas
    ? 'bg-[#dcfce7] text-[#166534]'
    : isModerado
      ? 'bg-[#fef3c7] text-[#92400e]'
      : 'bg-[#eaddff] text-[#4f378b]';

  const initials = post.autoria.slice(0, 2).toUpperCase();

  return (
    <article
      className={`flex w-full flex-col gap-2 rounded-[16px] border border-[#e7e1eb] bg-[var(--ajd-color-surface-raised)] px-3 py-2.5 ${className}`.trim()}
    >
      {/* Autoria e gravidade */}
      <div className="flex w-full items-center gap-2">
        <div
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${avatarBg}`}
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-[14px] font-semibold text-[var(--ajd-color-text-primary)]">
              {post.autoria}
            </span>
            {post.verificada && (
              <Icon
                name="material/verified"
                size={18}
                label="Usuária verificada"
                className="text-[var(--ajd-color-primary)]"
              />
            )}
          </div>
          <p className="text-[11px] text-[var(--ajd-color-text-secondary)]">{post.dataEHorario}</p>
        </div>

        <span
          className={`shrink-0 rounded-[8px] border-[0.5px] px-2 py-1 text-[11px] font-bold ${badgeStyle}`}
        >
          {post.gravidade}
        </span>
      </div>

      {/* Foto + avaliação + relato */}
      <div className="flex w-full items-start gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[10px]">
          <img
            src={post.photoUrl}
            alt={`Foto do local ${post.local}`}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-1 left-[3px] rounded-[4px] bg-[rgba(33,29,41,0.78)] px-1 py-[3px] text-[9px] font-medium text-white">
            {post.notaDaImagem}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <span className={`text-[16px] leading-none tracking-[1px] ${starsColor}`}>
              {'★'.repeat(post.nota)}
              {'☆'.repeat(5 - post.nota)}
            </span>
            <span className="text-[11px] text-[var(--ajd-color-text-secondary)]">
              {post.nota}/5
            </span>
          </div>

          <div className="flex items-center gap-1 text-[12px] font-semibold text-[var(--ajd-color-text-primary)]">
            <Icon
              name={isSemProblemas ? 'material/lightbulb' : 'lucide/lightbulb-off'}
              size={15}
              className="text-[var(--ajd-color-text-primary)]"
            />
            <span>Iluminação: {post.iluminacao}</span>
          </div>

          <p className="text-[13px] leading-[16px] text-[var(--ajd-color-text-primary)]">
            {post.relato}
          </p>
        </div>
      </div>

      {/* Rodapé: local + distância + botão Apoio */}
      <div className="flex w-full items-center gap-2 border-t border-[#e7e1eb] pt-2">
        <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-[var(--ajd-color-primary)]">
          {post.local} • A {post.distanciaMetros}m de você
        </p>

        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          aria-pressed={post.apoiado}
          className={`flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[12px] font-medium transition-colors ${
            post.apoiado
              ? 'bg-[#fef2f2] text-[#dc2626]'
              : 'text-[#b91c1c] hover:bg-[#fef2f2]/70'
          }`}
        >
          {post.apoiado ? (
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0 text-[#dc2626] transition-transform duration-150 scale-110"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <Icon name="material/favorite" size={20} className="text-[#b91c1c]" />
          )}
          <span>{post.apoios} apoios</span>
        </button>
      </div>
    </article>
  );
};
