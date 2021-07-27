import { useState } from 'react';
import { useQuery } from 'react-query';
import { MicroCmsResponse, IBlog } from '@/types';
import { BlogService } from '@utils';

export function useSearchByQuery(query: string, initialData: MicroCmsResponse<IBlog>) {
  const [searchValue, setSearchValue] = useState<string>(query);
  const { isLoading, data, refetch } = useQuery(
    ['blogs', searchValue],
    async (context) => {
      console.log(context.queryKey[1]);
      return await new BlogService().getBlogsByQuery(context.queryKey[1] as string);
    },
    {
      initialData: initialData,
      enabled: false,
    },
  );

  const onEnterKeyEvent = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim()) return;
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return {
    setSearchValue,
    onEnterKeyEvent,
    data,
    searchValue,
    isLoading,
  };
}
