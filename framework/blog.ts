import { config } from '@site.config';
import { IBanner, IBlog, ICategory, IPopularArticles, MicroCmsResponse } from '@types';
import { client } from '@framework';
import { QueriesType } from 'microcms-js-sdk/dist/cjs/types';

const limit = parseInt(config.defaultLimit);

export const getContents = async (
  currentPage: number = 1,
  categoryId?: string,
): Promise<{
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  pager: number[];
  banner: IBanner;
}> => {
  const [{ blogs, pager }, categories, banner, popularArticles] = await Promise.all([
    getBlogsByCategory(limit, currentPage, categoryId),
    getCategories(),
    getBanners(),
    getPopularArticles(),
  ]);
  return {
    blogs: blogs.contents,
    categories: categories.contents,
    popularArticles,
    pager,
    banner,
  };
};

export const getAllBlogs = async (): Promise<MicroCmsResponse<IBlog>> => {
  const res = await client.get<MicroCmsResponse<IBlog>>({
    endpoint: 'blog',
    queries: { limit: config.defaultMaxLimit },
  });
  return res;
};

export const getBlogs = async (limit: number): Promise<MicroCmsResponse<IBlog>> => {
  const res = await client.get<MicroCmsResponse<IBlog>>({
    endpoint: 'blog',
    queries: { limit: limit },
  });

  return res;
};

export const getBlogsByCategory = async (
  limit: number,
  currentPage: number,
  categoryId?: string,
): Promise<{ blogs: MicroCmsResponse<IBlog>; pager: number[] }> => {
  const queries: QueriesType = {
    limit: limit,
    filters: categoryId === undefined ? '' : `category[equals]${categoryId}`,
    offset: (currentPage - 1) * limit,
  };
  const blogs = await client.get<MicroCmsResponse<IBlog>>({
    endpoint: 'blog',
    queries: queries,
  });
  const pager = [...Array(Math.ceil(blogs.totalCount / 10)).keys()];
  return { blogs, pager };
};

export const getBlogById = async (blogId: string): Promise<IBlog> => {
  const res = await client.get<IBlog>({
    endpoint: 'blog',
    contentId: blogId,
    queries: { depth: 2 },
  });
  return res;
};

export const getCategories = async (): Promise<MicroCmsResponse<ICategory>> => {
  const res = await client.get<MicroCmsResponse<ICategory>>({ endpoint: 'categories' });
  return res;
};

export const getPopularArticles = async (): Promise<IPopularArticles> => {
  const res = await client.get<IPopularArticles>({ endpoint: 'popular-articles' });
  return res;
};

export const getBanners = async (): Promise<IBanner> => {
  const res = await client.get<IBanner>({ endpoint: 'banner' });
  return res;
};
