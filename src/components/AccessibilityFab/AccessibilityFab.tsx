import React, { useState } from 'react';
import { Icon } from '../Icon';
import { AccessibilityToolbar } from '../AccessibilityToolbar';

export interface AccessibilityFabProps {
  className?: string;
}

/**
 * Botão azul de acessibilidade do Figma (node 1214:1183) que abre a AccessibilityToolbar.
 */
export const AccessibilityFab: React.FC<AccessibilityFabProps> = ({ className = '' }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`.trim()}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="Abrir opções de acessibilidade"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[16px] bg-[#0284c7] text-white shadow-[var(--ajd-shadow-1)] transition-transform hover:bg-[#0369a1] active:scale-95"
      >
        <Icon name="material/accessibility-new" size={24} />
      </button>

      {open && (
        <div className="absolute right-0 bottom-14 z-50">
          <AccessibilityToolbar onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
};
