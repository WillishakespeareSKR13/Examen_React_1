import AuthContext from 'hooks/authContext';
import LayoutAnimation from 'layouts/ANIMATED';
import { FC } from 'react';

type Props = {
  Role?: string | string[];
};

const DefaultLayout: FC<Props> = ({ children }) => (
  <AuthContext>
    <LayoutAnimation>{children}</LayoutAnimation>
  </AuthContext>
);
export default DefaultLayout;
