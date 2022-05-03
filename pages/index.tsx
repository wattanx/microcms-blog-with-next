import { GetStaticPropsContext, NextPage } from 'next';
import NextLink from 'next/link';
import {
  Banner,
  BreadCrumb,
  Categories,
  Meta,
  Pager,
  PopularArticle,
  Search,
  Tags,
} from '@components';
import { IBanner, IBlog, ICategory, IPopularArticles, ITag } from '@/types';
import { getContents } from '@/framework';

type IndexProps = {
  currentPage: number;
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  banner: IBanner;
  pager: [];
  tags: ITag[];
};

const Index: NextPage<IndexProps> = (props) => {
  return (
    <div className="divider">
      <div className="container">
        <BreadCrumb />
        {props.blogs.length === 0 && <>記事がありません</>}
        <ul>
          {props.blogs.map((blog) => {
            return (
              <li key={blog.id} className="list">
                <NextLink href="/[blogId]" as={`/${blog.id}`} passHref prefetch={false}>
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
                </NextLink>
              </li>
            );
          })}
        </ul>
        {props.blogs.length > 0 && (
          <ul className="pager">
            <Pager pager={props.pager} currentPage={props.currentPage} />
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const page: any = context.params || '1';
  const { blogs, pager, categories, popularArticles, banner, tags } = await getContents(page);
  return {
    props: {
      currentPage: parseInt(page),
      blogs,
      categories,
      popularArticles,
      pager,
      banner,
      tags,
    },
  };
}

export default Index;
