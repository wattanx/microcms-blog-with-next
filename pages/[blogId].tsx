import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Banner } from '../components/Banner';
import { BreadCrumb } from '../components/BreadCrumb';
import { Categories } from '../components/Categories';
import { Loader } from '../components/Loader';
import { PopularArticle } from '../components/PopularArticle';
import { Post } from '../components/Post';
import { Search } from '../components/Search';
import { Share } from '../components/Share';
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
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />
  }
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
          <Share id={props.blogs.id} title={props.blogs.title}/>
          <div className={styles.container}>
            <h1 className={styles.title}>{props.blogs.title}</h1>
            <Post body={props.blogs.body}/>
          </div>
          
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

export async function getStaticPaths() {
  return {
    paths: [], fallback: true
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
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
