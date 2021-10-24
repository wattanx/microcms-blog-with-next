import { GetServerSidePropsContext } from 'next';
import { generateFeedXml } from '@scripts';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await generateFeedXml();
  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
}

const Feed = () => null;
export default Feed;
