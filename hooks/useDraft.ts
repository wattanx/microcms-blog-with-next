import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { IDraftResponse } from '@/types';
import { BlogService } from '@utils';

export function useDraft() {
  const router = useRouter();
  const [data, setData] = useState<IDraftResponse>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetcher = async () => {
    const query = router.query;
    const data = await new BlogService().getDraftBlog(query.id as string, query.draftKey as string);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      fetcher();
    }
  }, [router.isReady]);

  return {
    data,
    isLoading,
  };
}
