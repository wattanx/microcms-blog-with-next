import { config } from '@site.config';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  ITag,
  MicroCmsResponse,
  Queries,
} from '@types';
import { client } from '@framework';

const limit = parseInt(config.defaultLimit);

export const getContents = async (
  currentPage: number = 1,
  articleFilter?: string,
): Promise<{
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  pager: number[];
  banner: IBanner;
  tags: ITag[];
}> => {
  const [{ blogs, pager }, categories, banner, popularArticles, tags] = await Promise.all([
    getBlogsByFilter(limit, currentPage, articleFilter),
    getCategories(),
    getBanners(),
    getPopularArticles(),
    getTags(),
  ]);
  return {
    blogs: blogs.contents,
    categories: categories.contents,
    popularArticles,
    pager,
    banner,
    tags: tags.contents,
  };
};

export const getAllBlogs = async () => {
  const res = await client.getList<IBlog>({
    endpoint: 'blog',
    queries: { limit: config.defaultMaxLimit },
  });
  return res;
};

export const getBlogs = async (limit: number) => {
  const res = await client.getList<IBlog>({
    endpoint: 'blog',
    queries: { limit: limit },
  });

  return res;
};

export const getBlogsByFilter = async (
  limit: number,
  currentPage: number,
  articleFilter?: string,
): Promise<{ blogs: MicroCmsResponse<IBlog>; pager: number[] }> => {
  const queries: Queries = {
    limit: limit,
    filters: articleFilter,
    offset: (currentPage - 1) * limit,
  };
  const blogs = await client.getList<IBlog>({
    endpoint: 'blog',
    queries: queries,
  });
  const pager = [...Array(Math.ceil(blogs.totalCount / 10)).keys()];
  return { blogs, pager };
};

export const getBlogById = async (blogId: string) => {
  const res = await client.getListDetail<IBlog>({
    endpoint: 'blog',
    contentId: blogId,
    queries: { depth: 2 },
  });
  return res;
};

export const getCategories = async () => {
  const res = await client.getList<ICategory>({ endpoint: 'categories' });
  return res;
};

export const getPopularArticles = async (): Promise<IPopularArticles> => {
  const res = await client.getObject<IPopularArticles>({ endpoint: 'popular-articles' });
  return res;
};

export const getBanners = async (): Promise<IBanner> => {
  const res = await client.getObject<IBanner>({ endpoint: 'banner' });
  return res;
};

export const getTags = async (): Promise<MicroCmsResponse<ITag>> => {
  const res = await client.get<MicroCmsResponse<ITag>>({
    endpoint: 'tags',
    queries: { limit: 1000 },
  });
  return res;
};
