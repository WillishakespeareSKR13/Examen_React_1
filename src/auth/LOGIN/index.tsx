import { useAtomValue } from 'jotai';
import { TokenAtom } from 'jotais/token';
import { useRouter } from 'next/router';
import { FC } from 'react';

const LOGIN: FC = (props) => {
  const { children } = props;
  const router = useRouter();
  const token = useAtomValue(TokenAtom);
  if (token) router.push('/employees');
  return <>{children}</>;
};

export default LOGIN;
