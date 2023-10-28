import { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/dataTable.css';
import 'react-calendar/dist/Calendar.css';

import DataProvider from '@redux/store';
import DashboardLayout from '@components/Layout/DashboardLayout';
import LandingPageLayout from '@components/Layout/LandingPageLayout';
import { dgteamDynamicInfo, landingPageLayoutUrls } from '@config';
import { AppPropsWithLayout } from '@config/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalAction from '@shared/GlobalAction';
import HeadElement from '@components/HeadElement';

// Create a client
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const getLayout =
    Component.getLayout ??
    ((page) => {
      if (landingPageLayoutUrls.includes(router.pathname)) {
        return (
          <DataProvider>
            <LandingPageLayout>{page}</LandingPageLayout>
          </DataProvider>
        );
      }
      return (
        <DataProvider>
          <QueryClientProvider client={queryClient}>
            <DashboardLayout>{page}</DashboardLayout>
          </QueryClientProvider>
        </DataProvider>
      );
    });

  return getLayout(
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <HeadElement
          subTitle={
            dgteamDynamicInfo?.filter(
              (title: any) =>
                title.url === router.asPath || title.url === router.route
            )[0]?.title
          }
        />
        <Component {...pageProps} />
        <GlobalAction />
      </QueryClientProvider>
    </DataProvider>
  );
}
