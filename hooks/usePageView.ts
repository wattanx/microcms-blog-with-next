import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@utils/gtag';

export function usePageView() {
  const router = useRouter();
  useEffect(() => {
    if (!gtag.GA_TRACKING_ID) {
      return;
    }

    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
