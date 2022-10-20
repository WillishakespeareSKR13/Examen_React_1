import { FC } from 'react';
import { Provider } from 'jotai';
import { AppPropsWithLayout } from 'next/app';
import GlobalStyles from 'styles/GlobalStyles';
import AlertContext from 'hooks/alertContext';
import LayoutContext from 'layouts/index';

const _App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  return (
    <Provider>
      <AlertContext>
        <LayoutContext Layout={Component.Layout}>
          <GlobalStyles />
          <Component {...pageProps} />
        </LayoutContext>
      </AlertContext>
    </Provider>
  );
};

export default _App;
