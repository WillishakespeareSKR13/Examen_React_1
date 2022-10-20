import { FC } from 'react';
import { AppPropsWithLayout } from 'next/app';
import GlobalStyles from 'styles/GlobalStyles';
import AlertContext from 'hooks/alertContext';
import LayoutContext from 'layouts/index';

const _App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  return (
    <AlertContext>
      <LayoutContext Layout={Component.Layout}>
        <GlobalStyles />
        <Component {...pageProps} />
      </LayoutContext>
    </AlertContext>
  );
};

export default _App;
