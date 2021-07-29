import { ICategory } from '@/types';
import styles from '@styles/components/Pager.module.scss';

type PagerProps = {
  selectedCategory?: ICategory;
  pager: [];
};

export const Pager: React.FC<PagerProps> = (props) => {
  return (
    <ul className={styles.pager}>
      {props.pager.map((page, index) => {
        return (
          <li className={`${styles.page}`} key={index}>
            <a
              href={`/${
                props.selectedCategory !== undefined ? `category/${props.selectedCategory.id}/` : ''
              }page/${page + 1}`}
            >
              {page + 1}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
