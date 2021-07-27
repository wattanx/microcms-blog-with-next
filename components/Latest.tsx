import { IBlog } from '@/types';
import styles from '@styles/components/Latest.module.scss';

type LatestProps = {
  blogs: IBlog[];
};

export const Latest: React.FC<LatestProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>最新の記事</h1>
      <ul>
        {props.blogs.map((blog) => {
          return (
            <li className={styles.list} key={blog.id}>
              <a href={`/${blog.id}`} className={styles.link}>
                {blog.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
