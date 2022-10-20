import { HTMLMotionProps } from 'framer-motion';
import { ThemeAtomWrapper } from 'themes/types';
import { CSS } from 'types';

export type AtomWrapperTypes = HTMLMotionProps<'div'> &
  HTMLMotionProps<'form'> &
  HTMLMotionProps<'section'> &
  HTMLMotionProps<'li'> &
  HTMLMotionProps<'ul'> &
  HTMLMotionProps<'main'> &
  HTMLMotionProps<'footer'> &
  HTMLMotionProps<'nav'> & {
    astheme?: keyof ThemeAtomWrapper['color'];
    as?: 'div' | 'form' | 'section' | 'li' | 'ul' | 'main' | 'footer' | 'nav';
    css?: CSS;
  };
