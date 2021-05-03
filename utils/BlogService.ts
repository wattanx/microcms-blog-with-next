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

export async function getBlogsByCategory(
  limit: number,
  page: number,
  categoryId?: string,
): Promise<MicroCmsResponse<IBlog>> {
  return (
    await axios.get(
      `${apiRoot}/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      { headers: { 'X-API-KEY': config.apiKey } },
    )
  ).data;
}

export async function getBlogById(blogId: string): Promise<IBlog> {
  return (
    await axios.get(`${apiRoot}/blog/${blogId}?depth=2`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
}

export async function getBlogsByQuery(query: string): Promise<MicroCmsResponse<IBlog>> {
  return (await axios.get(`${config.siteRoot}/api/search?q=${query}`)).data;
}

export async function getCategories(): Promise<MicroCmsResponse<ICategory>> {
  return (
    await axios.get(`${apiRoot}/categories`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
}

export async function getPopularArticles(): Promise<IPopularArticles> {
  return (
    await axios.get(`${apiRoot}/popular-articles`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
}

export async function getBanners(): Promise<IBanner> {
  return (
    await axios.get(`${apiRoot}/banner`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
}
