import { SerializedStyles } from '@emotion/utils';

export type AtomTableTypes<T extends object> = {
  css?: () => SerializedStyles;
  columnscss?: (data: T) => SerializedStyles;
  data?: T[];
  columns: AtomTableColumnTypes<T>[];
};

export type AtomTableColumnTypes<T extends object> = {
  key?: string;
  sortable?: boolean;
  searchable?: boolean;
  title?: JSX.Element;
  view: (data?: T) => JSX.Element;
  css?: (data?: T) => SerializedStyles;
};
