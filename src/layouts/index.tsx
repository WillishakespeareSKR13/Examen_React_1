import { FC } from 'react';
import ADMIN from './ROLES/ADMIN';
import DEFAULT from './ROLES/DEFAULT';
import LOGIN from './ROLES/LOGIN';

export const AllLayouts = {
  default: DEFAULT,
  admin: ADMIN,
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
