import { IBlog } from '../interfaces/interface';
import styles from '../styles/components/PopularArticle.module.scss';

type PopularArticleProps = {
  blogs: IBlog[];
};

export const PopularArticle: React.FC<PopularArticleProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>人気の記事</h1>
      <ul>
        {props.blogs.map((blog) => {
          return (
            <li className={styles.list} key={blog.id}>
              <a href={`/${blog.id}`} className={styles.link}>
                <picture>
                  <img
                    src={`${blog.ogimage.url}?w=560&q=100`}
                    className={`${styles.image} ${styles.lazyload}`}
                  />
                </picture>
                <p className={styles.title}>{blog.title}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
