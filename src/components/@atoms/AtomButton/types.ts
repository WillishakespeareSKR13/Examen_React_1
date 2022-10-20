import { HTMLMotionProps } from 'framer-motion';
import { ThemeAtomButton, ThemeColorKeys } from 'themes/types';
import { CSS } from 'types';

export type AtomButtonTypes = HTMLMotionProps<'button'> & {
  loading?: boolean | 'true' | 'false';
  astheme?: ThemeColorKeys;
  astype?: ThemeAtomButton['type'];
  css?: CSS;
};
