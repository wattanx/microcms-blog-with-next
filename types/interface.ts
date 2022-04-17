import {
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk';

export type Queries = MicroCMSQueries;

export type TocTypes = {
  text: string | null;
  id: string;
  name: string;
};

export interface IBlog extends ContentBase {
  title: string;
  category?: ICategory;
  tag?: ITag[];
  toc_visible?: boolean;
  body: string;
  description: string;
  ogimage: IMicroCmsImageType;
  writer?: IAuthor;
  partner?: string;
  related_blogs: IBlog[];
}

export interface ICategory extends ContentBase {
  name?: string;
}

export interface IAuthor extends ContentBase {
  name?: string;
  text?: string;
}

export interface IBanner extends MicroCMSObjectContent {
  image: IMicroCmsImageType;
  url?: string;
  alt?: string;
}

export interface ITag extends ContentBase {
  name?: string;
}

export interface IPopularArticles extends MicroCMSObjectContent {
  articles: IBlog[];
}

export type MicroCmsResponse<T> = MicroCMSListResponse<T>;

export type ContentBase = MicroCMSListContent;

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

export type Response<T = any> = {
  data: T;
  headers: any;
};

export interface IHttpClient {
  get: <T extends object, R = Response<T>>(path: string) => Promise<R>;
}
