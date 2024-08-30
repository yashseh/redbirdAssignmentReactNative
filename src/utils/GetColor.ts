import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

export const getColor = (colorName: string): string => {
  if (fullConfig.theme?.colors) {
    return fullConfig.theme.colors[colorName] as string;
  }
  return '#fff';
};
