import AtomLoader from '@atoms/AtomLoader';
import { useAtomValue, useSetAtom } from 'jotai';
import { TokenAtom } from 'jotais/token';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import CONFIG from 'src/config';
import jwt from 'jsonwebtoken';
import { IUser, UserLoginAtom } from 'jotais/users';

const PRIVATE: FC = (props) => {
  const { children } = props;
  const setUserLogin = useSetAtom(UserLoginAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = useAtomValue(TokenAtom);

  useEffect(() => {
    const ValidateLoading = setTimeout(() => {
      try {
        const isTokenValid = jwt.verify(token, CONFIG.SECRET) as IUser;
        setUserLogin(isTokenValid);
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    }, 1000);
    return () => {
      clearTimeout(ValidateLoading);
    };
  }, []);

  return (
    <AtomLoader astype="fullscreen" loading={loading} colorLoading="#4d51e0">
      {children}
    </AtomLoader>
  );
};

export default PRIVATE;
