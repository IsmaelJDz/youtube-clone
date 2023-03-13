import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);

  return (
    <>
      <Head>
        <title>YouTube clone</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1 maximum-scale=1'
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}>
        <NotificationsProvider>
          {getLayout(
            <main>
              <Component {...pageProps} />
            </main>
          )}
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
