import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Banner } from '../components/Banner';
import { BreadCrumb } from '../components/BreadCrumb';
import { Categories } from '../components/Categories';
import { Latest } from '../components/Latest';
import { Loader } from '../components/Loader';
import { Meta } from '../components/Meta';
import { PopularArticle } from '../components/PopularArticle';
import { Post } from '../components/Post';
import { Search } from '../components/Search';
import { Share } from '../components/Share';
import { Toc } from '../components/Toc';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  MicroCmsResponse,
} from '../interfaces/interface';
import styles from '../styles/Detail.module.scss';
import { getAllBlogs, getBanners, getBlogById, getCategories, getPopularArticles } from '../utils/BlogService';

type DetailProps = {
  blog: IBlog;
  blogs: MicroCmsResponse<IBlog>;
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
            <img src={`${props.blog.ogimage?.url}?w=820&q=100`} className={styles.ogimage} />
          </picture>
        </div>
        <BreadCrumb category={props.blog.category} />
        <div className={styles.main}>
          <Share id={props.blog.id} title={props.blog.title}/>
          <div className={styles.container}>
            <h1 className={styles.title}>{props.blog.title}</h1>
            <Meta author={props.blog.writer} category={props.blog.category} createdAt={props.blog.createdAt} />
            {props.blog.toc_visible && (
              <Toc body={props.blog.body ?? ''}/>
            )}
            <Post body={props.blog.body}/>
          </div>
          
        </div>
      </article>
      <aside className="aside">
        <Banner banner={props.banner} />
        <Search />
        <Categories categories={props.categories.contents} />
        <PopularArticle blogs={props.popularArticles.articles} />
        <Latest blogs={props.blogs.contents}/>
      </aside>
    </div>
  );
};

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const ids = blogs.contents.map(blog => {
    return { blogId: blog.id }
  });
  return {
    paths: ids, fallback: true
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const blogId: any = context.params?.blogId || '1';
  const blog = await getBlogById(blogId);
  const blogs = await getAllBlogs();
  const categories = await getCategories();
  const popularArticles = await getPopularArticles();
  const banner = await getBanners();
  return {
    props: {
      blog: blog,
      blogs: blogs,
      categories: categories,
      popularArticles: popularArticles,
      banner: banner,
    },
  };
}
export default Detail;
