import { GetServerSidePropsContext, NextPage } from 'next';
import { Banner } from '../components/Banner';
import { BreadCrumb } from '../components/BreadCrumb';
import { Categories } from '../components/Categories';
import { PopularArticle } from '../components/PopularArticle';
import { Search } from '../components/Search';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  MicroCmsResponse,
} from '../interfaces/interface';
import styles from '../styles/Detail.module.scss';
import { getBanners, getBlogById, getCategories, getPopularArticles } from '../utils/BlogService';

type DetailProps = {
  blogs: IBlog;
  categories: MicroCmsResponse<ICategory>;
  popularArticles: IPopularArticles;
  banner: IBanner;
};

const Detail: NextPage<DetailProps> = (props) => {
  return (
    <div className={styles.divider}>
      <article className={styles.article}>
        <div className={styles.ogimageWrap}>
          <picture>
            <img src={`${props.blogs.ogimage?.url}?w=820&q=100`} className={styles.ogimage} />
          </picture>
        </div>
        <BreadCrumb category={props.blogs.category} />
        <div className={styles.main}>
          <h1 className={styles.title}>{props.blogs.title}</h1>
        </div>
      </article>
      <aside className="aside">
        <Banner banner={props.banner} />
        <Search />
        <Categories categories={props.categories.contents} />
        <PopularArticle blogs={props.popularArticles.articles} />
      </aside>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const blogId: any = context.params?.blogId || '1';
  const blogs = await getBlogById(blogId);
  const categories = await getCategories();
  const popularArticles = await getPopularArticles();
  const banner = await getBanners();
  return {
    props: {
      blogs: blogs,
      categories: categories,
      popularArticles: popularArticles,
      banner: banner,
    },
  };
}
export default Detail;
