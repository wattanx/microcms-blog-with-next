import axios from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Banner } from '../../components/Banner';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Categories } from '../../components/Categories';
import { Meta } from '../../components/Meta';
import { PopularArticle } from '../../components/PopularArticle';
import {
  IBanner,
  IBlog,
  ICategory,
  IPopularArticles,
  MicroCmsResponse,
} from '../../interfaces/interface';
import styles from '../../styles/SearchPage.module.scss';
import {
  getBanners,
  getBlogsByQuery,
  getCategories,
  getPopularArticles,
} from '../../utils/BlogService';

type IndexProps = {
  blogs: MicroCmsResponse<IBlog>;
  categories: MicroCmsResponse<ICategory>;
  popularArticles: IPopularArticles;
  banner: IBanner;
  query: string;
};

const Index: NextPage<IndexProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>(props.query);
  const [blogs, setBlogs] = useState<MicroCmsResponse<IBlog>>(props.blogs);

  const onEnterKeyEvent = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const data = (await axios.get(`/api/search?q=${e.currentTarget.value}`)).data;
      console.log(data);
      setBlogs(data);
    }
  };

  return (
    <div className="divider">
      <div className="container">
        <input
          value={searchValue}
          className={styles.search}
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => onEnterKeyEvent(e)}
        />
        <BreadCrumb />
        {blogs.contents.length === 0 && <>記事がありません</>}
        <ul>
          {blogs.contents.map((blog) => {
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
      </div>
      <aside className="aside">
        <Banner banner={props.banner} />
        <Categories categories={props.categories.contents} />
        <PopularArticle blogs={props.popularArticles.articles} />
      </aside>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.q;
  const blogs = await getBlogsByQuery(query as string);
  const categories = await getCategories();
  const popularArticles = await getPopularArticles();
  const banner = await getBanners();
  return {
    props: {
      blogs: blogs,
      categories: categories,
      popularArticles: popularArticles,
      banner: banner,
      query: query,
    },
  };
}

export default Index;
