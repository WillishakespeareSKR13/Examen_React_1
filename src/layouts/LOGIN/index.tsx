import AuthContext from 'hooks/authContext';
import LayoutAnimation from 'layouts/_ANIMATED';
import { FC } from 'react';

type Props = {
  Role?: string | string[];
};

const AdminLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <AuthContext>
      <LayoutAnimation>{children}</LayoutAnimation>
    </AuthContext>
  );
};
export default AdminLayout;
