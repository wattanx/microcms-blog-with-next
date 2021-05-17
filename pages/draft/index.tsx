import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Banner } from '../../components/Banner';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Categories } from '../../components/Categories';
import { Latest } from '../../components/Latest';
import { Loader } from '../../components/Loader';
import { Meta } from '../../components/Meta';
import { PopularArticle } from '../../components/PopularArticle';
import { Post } from '../../components/Post';
import { Search } from '../../components/Search';
import { Share } from '../../components/Share';
import { Toc } from '../../components/Toc';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  MicroCmsResponse,
  IDraftResponse,
} from '../../interfaces/interface';
import styles from '../../styles/Detail.module.scss';
import { IBlogService, BlogService } from '../../utils/BlogService';
import { useEffect, useState } from 'react';

type DraftProps = {
  blogs: MicroCmsResponse<IBlog>;
  categories: MicroCmsResponse<ICategory>;
  popularArticles: IPopularArticles;
  banner: IBanner;
};

const Draft: NextPage<DraftProps> = (props) => {
  const router = useRouter();
  const [data, setData] = useState<IDraftResponse>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetcher = async () => {
    const query = router.query;
    const data = await new BlogService().getDraftBlog(query.id as string, query.draftKey as string);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      fetcher();
    }
  }, [router.isReady]);

  if (isLoading || !data) {
    return <Loader />;
  }
  return (
    <div className={styles.divider}>
      <article className={styles.article}>
        <div className={styles.ogimageWrap}>
          <picture>
            <source
              media="(min-width: 1160px)"
              type="image/webp"
              srcSet={`${data.blog.ogimage.url}?w=820&fm=webp, ${data.blog.ogimage.url}?w=1640&fm=webp 2x`}
            />
            <source
              media="(min-width: 820px)"
              type="image/webp"
              srcSet={`${data.blog.ogimage.url}?w=740&fm=webp, ${data.blog.ogimage.url}?w=1480&fm=webp 2x`}
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={`${data.blog.ogimage.url}?w=728&fm=webp, ${data.blog.ogimage.url}?w=1456&fm=webp 2x`}
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={`${data.blog.ogimage.url}?w=375&fm=webp, ${data.blog.ogimage.url}?w=750&fm=webp 2x`}
            />
            <img src={`${data.blog.ogimage?.url}?w=820&q=100`} className={styles.ogimage} />
          </picture>
        </div>
        <BreadCrumb category={data.blog.category} />
        <div className={styles.main}>
          <Share id={data.blog.id} title={data.blog.title} />
          <div className={styles.container}>
            <h1 className={styles.title}>{data.blog.title}</h1>
            <Meta
              author={data.blog.writer}
              category={data.blog.category}
              createdAt={data.blog.createdAt}
            />
            {data.blog.toc_visible && <Toc toc={data.toc} />}
            <Post body={data.body} />
          </div>
        </div>
      </article>
      <aside className="aside">
        <Banner banner={props.banner} />
        <Search />
        <Categories categories={props.categories.contents} />
        <PopularArticle blogs={props.popularArticles.articles} />
        <Latest blogs={props.blogs.contents} />
      </aside>
    </div>
  );
};

export async function getStaticProps() {
  const limit: number = 10;
  const service: IBlogService = new BlogService();
  const blogs = await service.getBlogs(limit);
  const categories = await service.getCategories();
  const popularArticles = await service.getPopularArticles();
  const banner = await service.getBanners();
  return {
    props: {
      blogs: blogs,
      categories: categories,
      popularArticles: popularArticles,
      banner: banner,
    },
  };
}
export default Draft;
