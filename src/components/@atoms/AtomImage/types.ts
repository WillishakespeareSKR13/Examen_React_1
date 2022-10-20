import { HTMLMotionProps } from 'framer-motion';
import { CSS } from 'types';

export type AtomImageTypes = HTMLMotionProps<'img'> & {
  css?: CSS;
};
