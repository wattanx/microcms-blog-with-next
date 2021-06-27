import { useRouter } from 'next/dist/client/router';
import { IDraftResponse } from '@/types/interface';
import { BlogService } from '@utils/BlogService';
import { useEffect, useState } from 'react';
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
