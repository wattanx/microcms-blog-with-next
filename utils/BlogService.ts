import axios from 'axios';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  MicroCmsResponse,
} from '../interfaces/interface';
import { config } from '../site.config';

const apiRoot: string = `https://${config.serviceId}.microcms.io/api/v1`;

/**
 * blog取得用サービスのインターフェース
 */
export interface IBlogService {
  /** configに設定されている最大量のblogを取得します */
  getAllBlogs(): Promise<MicroCmsResponse<IBlog>>;
  
  /**
   * blogを取得します
   * @param limit 上限
   */
  getBlogs(limit: number): Promise<MicroCmsResponse<IBlog>>;

  /**
   * カテゴリーで絞ったblogを取得します
   * @param limit 上限
   * @param page ページNumber
   * @param categoryId カテゴリーID
   */
  getBlogsByCategory(limit: number, page: number, categoryId?: string): Promise<MicroCmsResponse<IBlog>>;

  /**
   * blogIdに合致するblogデータを取得します
   * @param blogId ブログID
   */
  getBlogById(blogId: string): Promise<IBlog>;

  /**
   * カテゴリーを取得します
   */
  getCategories(): Promise<MicroCmsResponse<ICategory>>;

  /**
   * クエリで絞ったblogを取得します。
   * @param query クエリ
   */
  getBlogsByQuery(query: string): Promise<MicroCmsResponse<IBlog>>;

  /**
   * 人気記事を取得します
   */
  getPopularArticles(): Promise<IPopularArticles>;

  /**
   * バナーを取得します
   */
  getBanners(): Promise<IBanner>;
}

export class BlogService implements IBlogService {
  public async getAllBlogs(): Promise<MicroCmsResponse<IBlog>> {
    return (
      await axios.get(`${apiRoot}/blog?limit=${config.defaultMaxLimit}`, {
        headers: { 'X-API-KEY': config.apiKey },
      })
    ).data;
  }
  
  public async getBlogs(limit: number): Promise<MicroCmsResponse<IBlog>> {
    return (
      await axios.get(`${apiRoot}/blog?limit=${limit}`, {
        headers: { 'X-API-KEY': config.apiKey },
      })
    ).data;
  }
  
  public async getBlogsByCategory(limit: number, page: number, categoryId?: string): Promise<MicroCmsResponse<IBlog>> {
    return (
      await axios.get(
        `${apiRoot}/blog?limit=${limit}${
          categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
        }&offset=${(page - 1) * limit}`,
        { headers: { 'X-API-KEY': config.apiKey } },
      )
    ).data;
  }
  
  public async getBlogById(blogId: string): Promise<IBlog> {
    return (
      await axios.get(`${apiRoot}/blog/${blogId}?depth=2`, {
        headers: { 'X-API-KEY': config.apiKey },
      })
    ).data;
  }
  
  public async getCategories(): Promise<MicroCmsResponse<ICategory>> {
    return (
      await axios.get(`${apiRoot}/categories`, {
        headers: { 'X-API-KEY': config.apiKey },
      })
    ).data;
  }
  
  public async getBlogsByQuery(query: string): Promise<MicroCmsResponse<IBlog>> {
    return (await axios.get(`${config.baseUrl}/api/search?q=${query}`)).data;
  }
  
  public async getPopularArticles(): Promise<IPopularArticles> {
    return (
      await axios.get(`${apiRoot}/popular-articles`, {
        headers: { 'X-API-KEY': config.apiKey },
      })
    ).data;
  }
  
  public async getBanners(): Promise<IBanner> {
    return (
      await axios.get(`${apiRoot}/banner`, {
        headers: { 'X-API-KEY': config.apiKey },
      })
    ).data;
  } 
}