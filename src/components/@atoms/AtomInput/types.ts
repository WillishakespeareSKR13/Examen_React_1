import { FormikValues } from 'formik';
import { HTMLMotionProps } from 'framer-motion';
import { ThemeColorKeys } from 'themes/types';
import { CSS } from 'types';

type InputType = HTMLMotionProps<'input'>['type'] | 'toggle';

export type AtomInputInputProps = HTMLMotionProps<'input'> & {
  astheme?: ThemeColorKeys;
  type?: InputType;
  css?: CSS;
};
export type AtomInputLabelProps = HTMLMotionProps<'label'> & {
  astheme?: ThemeColorKeys;
  css?: CSS;
};
export type AtomInputErrorProps = HTMLMotionProps<'span'> & {
  astheme?: ThemeColorKeys;
  css?: CSS;
};
export type AtomInputSpanProps = HTMLMotionProps<'span'> & {
  astheme?: ThemeColorKeys;
  css?: CSS;
};

export type AtomInputTypes = {
  input?: AtomInputInputProps;
  label?: AtomInputLabelProps;
  error?: AtomInputErrorProps;
  span?: AtomInputSpanProps;
  spantext?: string;
  astheme?: ThemeColorKeys;
  id?: string;
  type?: InputType;
  formik?: FormikValues;
  css?: CSS;
};
