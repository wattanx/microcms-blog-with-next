import NextLink from 'next/link';
import { ICategory } from '@/types';
import styles from './Categories.module.scss';

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
              <NextLink
                href="/category/[categoryId]/page/[id]"
                as={`/category/${category.id}/page/1`}
                passHref
                prefetch={false}
              >
                <a className={styles.link}>{category.name}</a>
              </NextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
