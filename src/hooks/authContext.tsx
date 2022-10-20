import { FC } from 'react';
import Auth from 'auth';

type AuthProps = {
  type?: keyof typeof Auth;
};

const AuthContext: FC<AuthProps> = (props) => {
  const { children, type } = props;

  const QueryContext = Auth[type || 'DEFAULT'];
  return <QueryContext>{children}</QueryContext>;
};

export default AuthContext;
