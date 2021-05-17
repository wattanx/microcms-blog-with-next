import { TocTypes } from '../utils/TocUtil';

export interface IBlog extends IMicroCmsResponseBase {
  title?: string;
  category?: ICategory;
  toc_visible?: boolean;
  body?: string;
  description?: string;
  ogimage?: IMicroCmsImageType;
  writer?: IAuthor;
  partner?: string;
  related_blogs: IBlog[];
}

export interface ICategory extends IMicroCmsResponseBase {
  name?: string;
}

export interface IAuthor extends IMicroCmsResponseBase {
  name?: string;
  text?: string;
}

export interface IBanner extends IMicroCmsResponseBase {
  image?: IMicroCmsImageType;
  url?: string;
  alt?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface IPopularArticles {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  articles: IBlog[];
}

export type MicroCmsResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export interface IMicroCmsResponseBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface IMicroCmsImageType {
  url: string;
  height: number;
  width: number;
}

export interface IDraftResponse {
  blog: IBlog;
  toc: TocTypes[];
  body: string;
}
