import Link from 'next/link';
import { ICategory } from '@/types';
import styles from '@styles/components/Categories.module.scss';

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
              <Link href="/category/[categoryId]/page/[id]" as={`/category/${category.id}/page/1`}>
                <a className="link">{category.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
