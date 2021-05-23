import { GetServerSidePropsContext } from 'next';
import { SitemapUtil } from '@utils/SitemapUtil';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await SitemapUtil.generateSitemapXml();
  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
}

const Sitemap = () => null;
export default Sitemap;
