import { css } from '@emotion/react';
import LoginBar from '@molecules/LoginBar';
import AuthContext from 'hooks/authContext';
import LayoutAnimation from 'layouts/ANIMATED';
import { FC } from 'react';

type Props = {
  Role?: string | string[];
};

const AdminLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <AuthContext type="PRIVATE">
      <LoginBar />
      <LayoutAnimation
        css={() => css`
          height: calc(100vh - 80px);
        `}
      >
        {children}
      </LayoutAnimation>
    </AuthContext>
  );
};
export default AdminLayout;
