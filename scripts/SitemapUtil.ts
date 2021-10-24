import { getAllBlogs } from 'scripts/blog';
import { config } from '../site.config';
import { formatDate } from '../utils/DateUtil';

export async function generateSitemapXml(): Promise<string> {
  let xml: string = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const blogs = await getAllBlogs();
  blogs.contents.forEach((blog) => {
    xml += `<url>
        <loc>${config.baseUrl}/${blog.id}</loc>
        <lastmod>${formatDate(blog.createdAt, 'YYYY-MM-DD')}</lastmod>
        <changefreq>weekly</changefreq>
      </url>`;
  });

  return (xml += `</urlset>`);
}
