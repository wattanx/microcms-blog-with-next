import { ICategory } from '../interfaces/interface';
import styles from '../styles/components/Categories.module.scss';

type CategoriesProps = {
  categories: ICategory[];
};

export const Categories: React.FC<CategoriesProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>カテゴリー</h1>
      <ul>
        {props.categories.map((category) => {
          return (
            <li className={styles.list} key={category.id}>
              <a href={`/category/${category.id}/page/1`} className="link">
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
