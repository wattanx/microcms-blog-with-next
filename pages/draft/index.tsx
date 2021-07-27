import { NextPage } from 'next';
import {
  Banner,
  BreadCrumb,
  Categories,
  Latest,
  Loader,
  Meta,
  PopularArticle,
  Post,
  Search,
  Share,
  Toc,
} from '@components';
import { IBanner, IBlog, ICategory, IPopularArticles, MicroCmsResponse } from '@/types';
import { useDraft } from '@hooks';
import { IBlogService, BlogService } from '@utils';
import styles from '@styles/Detail.module.scss';

type DraftProps = {
  blogs: MicroCmsResponse<IBlog>;
  categories: MicroCmsResponse<ICategory>;
  popularArticles: IPopularArticles;
  banner: IBanner;
};

const Draft: NextPage<DraftProps> = (props) => {
  const { data, isLoading } = useDraft();

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
