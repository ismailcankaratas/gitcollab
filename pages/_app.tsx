import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import tr from 'javascript-time-ago/locale/tr.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(tr)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const Noop: React.FC = ({ children }: any) => <>{children}</>;
  const Layout = (Component as any).Layout || Noop;
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}