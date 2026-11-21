import React from 'react';

const materialFiles = import.meta.glob('../../assets/icons/material/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const lucideFiles = import.meta.glob('../../assets/icons/lucide/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const fileName = (path: string) => path.split('/').pop()!.replace('.svg', '');

function toRegistry(files: Record<string, string>, prefix: string) {
  return Object.fromEntries(
    Object.entries(files).map(([path, url]) => [`${prefix}/${fileName(path)}`, url]),
  ) as Record<string, string>;
}

export const ICONS: Record<string, string> = {
  ...toRegistry(materialFiles, 'material'),
  ...toRegistry(lucideFiles, 'lucide'),
};

export type IconName = string;

export interface IconProps {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  label,
  className = '',
  style,
}) => {
  const url = ICONS[name];
  if (!url) return null;

  const maskUrl = `url("${url}")`;

  return (
    <span
      className={`ajd-icon ${className}`.trim()}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        width: size,
        height: size,
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        ...style,
      }}
    />
  );
};
