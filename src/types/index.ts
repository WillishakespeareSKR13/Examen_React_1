import {
  Interpolation,
  SerializedStyles,
  Theme,
  WithTheme
} from '@emotion/react';
import { FC, ReactNode } from 'react';
import { Palette } from 'themes/types';
import { AnyEventObject, StateMachine } from 'xstate';

type ChildrenProps = {
  children?: React.ReactNode;
};

export type RDC = Record<string, unknown>;
export type FCWC<P = RDC> = FC<P & ChildrenProps>;
export type SSP<P = RDC> = (props: WithTheme<P, Theme>) => SerializedStyles;
export type SSPS<P = RDC> = (props: WithTheme<P, Theme>) => string;
export type CSS = Interpolation<Theme>;
export type IPalette = Palette;
export type ThemesFamily = {
  select: {
    [key: string]: IPalette;
  };
  machine: StateMachine<string, never, AnyEventObject>;
};
export type ThemesFamilyType = {
  key: string;
  toggle: () => void;
};

export type ThemeContextProps = {
  themes: ThemesFamily;
  children: ReactNode;
};
