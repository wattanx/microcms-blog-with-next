import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import {
  Banner,
  BreadCrumb,
  Categories,
  Loader,
  Meta,
  Pager,
  PopularArticle,
  Search,
} from '@components';
import { IBanner, IBlog, ICategory, IPopularArticles, ITag } from '@/types';
import { getContents } from '@blog';
import { Tags } from '@components/Tags';

type PageProps = {
  currentPage: number;
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  banner: IBanner;
  pager: [];
  selectedTag: ITag;
  tags: ITag[];
};

const Page: NextPage<PageProps> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="divider">
      <div className="container">
        <BreadCrumb tag={props.selectedTag} />
        {props.blogs.length === 0 && <>記事がありません</>}
        <ul>
          {props.blogs.map((blog) => {
            return (
              <li key={blog.id} className="list">
                <Link href="/[blogId]" as={`/${blog.id}`}>
                  <a className="link">
                    <>
                      {blog.ogimage && (
                        <picture>
                          <img src={`${blog.ogimage.url}?w=670`} className="ogimage lazyload" />
                        </picture>
                      )}
                      <dl className="content">
                        <dt className="title">{blog.title}</dt>
                        <dd>
                          <Meta
                            createdAt={blog.createdAt}
                            author={blog.writer}
                            category={blog.category}
                            tags={blog.tag}
                          />
                        </dd>
                      </dl>
                    </>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {props.blogs.length > 0 && (
          <ul className="pager">
            <Pager
              pager={props.pager}
              currentPage={props.currentPage}
              selectedTag={props.selectedTag}
            />
          </ul>
        )}
      </div>
      <aside className="aside">
        <Banner banner={props.banner} />
        <Search />
        <Categories categories={props.categories} />
        <Tags tags={props.tags} />
        <PopularArticle blogs={props.popularArticles.articles} />
      </aside>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const page: any = context.params?.id || '1';
  const tagId = context.params?.tagId;

  const articleFilter = tagId !== undefined ? `tag[contains]${tagId}` : undefined;

  const { blogs, pager, categories, popularArticles, banner, tags } = await getContents(
    page,
    articleFilter,
  );
  const selectedTag =
    tagId !== undefined ? tags.find((content) => content.id === tagId) : undefined;

  return {
    props: {
      currentPage: parseInt(page),
      blogs,
      categories,
      popularArticles,
      banner,
      pager,
      selectedTag,
      tags,
    },
  };
}
export default Page;
