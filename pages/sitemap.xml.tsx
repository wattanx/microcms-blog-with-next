import { GetServerSidePropsContext } from 'next';
import { generateSitemapXml } from '@scripts';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await generateSitemapXml();
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
