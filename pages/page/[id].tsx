import axios from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Categories } from '../../components/Categories';
import { Meta } from '../../components/Meta';
import { Pager } from '../../components/Pager';
import { PopularArticle } from '../../components/PopularArticle';
import { Search } from '../../components/Search';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  MicroCmsResponse,
} from '../..//interfaces/interface';
import { config } from '../../site.config';
import { Banner } from '../../components/Banner';

type PageProps = {
  blogs: MicroCmsResponse<IBlog>;
  categories: MicroCmsResponse<ICategory>;
  popularArticles: IPopularArticles;
  banner: IBanner;
  pager: [];
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <div className="divider">
      <div className="container">
        <BreadCrumb />
        {props.blogs.contents.length === 0 && <>記事がありません</>}
        <ul>
          {props.blogs.contents.map((blog) => {
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
        {props.blogs.contents.length > 0 && (
          <ul className="pager">
            <Pager pager={props.pager} />
          </ul>
        )}
      </div>
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
  const page: any = context.params.id || '1';
  const categoryId = context.params;
  const limit: number = 10;
  const blogs = (
    await axios.get(
      `https://${config.serviceId}.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      { headers: { 'X-API-KEY': config.apiKey } },
    )
  ).data;
  const categories = (
    await axios.get(`https://${config.serviceId}.microcms.io/api/v1/categories`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
  const popularArticles = (
    await axios.get(`https://${config.serviceId}.microcms.io/api/v1/popular-articles`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
  const banner = (
    await axios.get(`https://${config.serviceId}.microcms.io/api/v1/banner`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
  ).data;
  return {
    props: {
      blogs: blogs,
      categories: categories,
      popularArticles: popularArticles,
      banner: banner,
      pager: [...Array(Math.ceil(blogs.totalCount / 10)).keys()],
    },
  };
}
export default Page;
