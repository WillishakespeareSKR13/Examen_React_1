import { HTMLMotionProps } from 'framer-motion';
import { ThemeColorKeys } from 'themes/types';
import { CSS } from 'types';

export type AtomIconTypes = HTMLMotionProps<'div'> & {
  icon?: string;
  astheme?: ThemeColorKeys;
  css?: CSS;
};
