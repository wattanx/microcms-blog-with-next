import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Banner } from '@components/Banner';
import { BreadCrumb } from '@components/BreadCrumb';
import { Categories } from '@components/Categories';
import { Latest } from '@components/Latest';
import { Loader } from '@components/Loader';
import { Meta } from '@components/Meta';
import { PopularArticle } from '@components/PopularArticle';
import { Post, Search, Share, Toc } from '@components';
import { IBanner, IBlog, ICategory, IPopularArticles, ITag, TocTypes } from '@/types/interface';
import styles from '@styles/Detail.module.scss';
import { convertToToc, convertToHtml } from '@scripts';
import { getAllBlogs, getBlogById, getContents } from '@blog';
import { Tags } from '@components/Tags';

type DetailProps = {
  blog: IBlog;
  body: string;
  toc: TocTypes[];
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  banner: IBanner;
  tags: ITag[];
};

const Detail: NextPage<DetailProps> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
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
              srcSet={`${props.blog.ogimage.url}?w=820&fm=webp, ${props.blog.ogimage.url}?w=1640&fm=webp 2x`}
            />
            <source
              media="(min-width: 820px)"
              type="image/webp"
              srcSet={`${props.blog.ogimage.url}?w=740&fm=webp, ${props.blog.ogimage.url}?w=1480&fm=webp 2x`}
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={`${props.blog.ogimage.url}?w=728&fm=webp, ${props.blog.ogimage.url}?w=1456&fm=webp 2x`}
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={`${props.blog.ogimage.url}?w=375&fm=webp, ${props.blog.ogimage.url}?w=750&fm=webp 2x`}
            />
            <img src={`${props.blog.ogimage?.url}?w=820&q=100`} className={styles.ogimage} />
          </picture>
        </div>
        <BreadCrumb category={props.blog.category} />
        <div className={styles.main}>
          <Share id={props.blog.id} title={props.blog.title} />
          <div className={styles.container}>
            <h1 className={styles.title}>{props.blog.title}</h1>
            <Meta
              author={props.blog.writer}
              category={props.blog.category}
              createdAt={props.blog.createdAt}
              tags={props.blog.tag}
              isDetail={true}
            />
            {props.blog.toc_visible && <Toc toc={props.toc} />}
            <Post body={props.body} />
          </div>
        </div>
      </article>
      <aside className="aside">
        <Banner banner={props.banner} />
        <Search />
        <Categories categories={props.categories} />
        <Tags tags={props.tags} />
        <PopularArticle blogs={props.popularArticles.articles} />
        <Latest blogs={props.blogs} />
      </aside>
    </div>
  );
};

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const ids = blogs.contents.map((blog) => {
    return { params: { blogId: blog.id } };
  });
  return {
    paths: ids,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const blogId: any = context.params?.blogId || '1';
  const blog = await getBlogById(blogId);
  const toc = convertToToc(blog.body);
  const body = convertToHtml(blog.body);
  const { blogs, categories, popularArticles, banner, tags } = await getContents();

  return {
    props: {
      blog,
      body,
      toc,
      blogs,
      categories,
      popularArticles,
      banner,
      tags,
    },
  };
}
export default Detail;
