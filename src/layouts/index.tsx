import { FC } from 'react';
import PRIVATE from './ROLES/PRIVATE';
import DEFAULT from './ROLES/DEFAULT';
import LOGIN from './ROLES/LOGIN';

export const AllLayouts = {
  default: DEFAULT,
  prvate: PRIVATE,
  login: LOGIN
};

export type LayoutType = {
  Layout?: keyof typeof AllLayouts;
  Role?: string | string[];
};

const LayoutContext: FC<LayoutType> = (props) => {
  const { Layout, children } = props;
  const GetLayout = AllLayouts[Layout || 'default'];
  return <GetLayout>{children}</GetLayout>;
};

export default LayoutContext;
