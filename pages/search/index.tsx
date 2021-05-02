import axios from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { isReturnStatement } from 'typescript';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Categories } from '../../components/Categories';
import { Meta } from '../../components/Meta';
import { PopularArticle } from '../../components/PopularArticle';
import { IBlog, ICategory, IPopularArticles, MicroCmsResponse } from '../../interfaces/interface';
import { config } from '../../site.config';
import styles from '../../styles/SearchPage.module.scss';

type IndexProps = {
  blogs: MicroCmsResponse<IBlog>;
  categories: MicroCmsResponse<ICategory>;
  popularArticles: IPopularArticles;
  query: string;
}

const Index: NextPage<IndexProps> = (props) => {
    const [searchValue, setSearchValue] = useState<string>(props.query);
    const [blogs, setBlogs] = useState<MicroCmsResponse<IBlog>>(props.blogs);

    const onEnterKeyEvent = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const data = (await axios.get(`/api/search?q=${e.currentTarget.value}`)).data;
            console.log(data);
            setBlogs(data);
        }
    }

  return (
    <div className="divider">
      <div className="container">
        <input value={searchValue} className={styles.search} type="text" onChange={(e) => setSearchValue(e.target.value)} onKeyPress={(e) => onEnterKeyEvent(e)} />
        <BreadCrumb />
        {blogs.contents.length === 0 &&
          (<>記事がありません</>)
        }
        <ul>
          {blogs.contents.map(blog => {
            return (
              <li key={blog.id} className="list">
                <a href={`/${blog.id}`} className="link">
                  <>
                    {blog.ogimage &&
                      (<picture>
                        <img src={`${blog.ogimage.url}?w=670`} className="ogimage lazyload" />
                      </picture>
                      )
                    }
                    <dl className="content">
                      <dt className="title">{blog.title}</dt>
                      <dd>
                        <Meta createdAt={blog.createdAt} author={blog.writer} category={blog.category}/>
                      </dd>
                    </dl>
                  </>
                  
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <aside className="aside">
        <Categories categories={props.categories.contents} />
        <PopularArticle blogs={props.popularArticles.articles} />
      </aside>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.q;
  console.log(query);
  const blogs = (await axios.get(`${config.siteRoot}/api/search?q=${query}`)).data;
  const categories = (await axios.get(`https://${config.serviceId}.microcms.io/api/v1/categories`, { headers: { 'X-API-KEY': config.apiKey } })).data;
  const popularArticles = (await axios.get(`https://${config.serviceId}.microcms.io/api/v1/popular-articles`, { headers: { 'X-API-KEY': config.apiKey } })).data;
  return {
    props: {
      blogs: blogs,
      categories: categories,
      popularArticles: popularArticles,
      query: query
    }
  };
}

export default Index;
