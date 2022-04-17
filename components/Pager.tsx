import NextLink from 'next/link';
import { ICategory, ITag } from '@/types';
import styles from '@styles/components/Pager.module.scss';

type PagerProps = {
  currentPage: number;
  selectedCategory?: ICategory;
  selectedTag?: ITag;
  pager: [];
};

export const Pager: React.FC<PagerProps> = (props) => {
  const getPath = (pageNumber: number) => {
    if (props.selectedCategory) {
      return `/category/${props.selectedCategory.id}/page/${pageNumber}`;
    } else if (props.selectedTag) {
      return `/tag/${props.selectedTag.id}/page/${pageNumber}`;
    } else {
      return `/page/${pageNumber}`;
    }
  };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.pager}>
        {props.currentPage > 1 && (
          <li className={`${styles.page} ${styles.arrow}`}>
            <NextLink href={getPath(props.currentPage - 1)}>
              <a>
                <img width="24" height="24" src="/images/icon_arrow_left.svg" alt="前のページへ" />
              </a>
            </NextLink>
          </li>
        )}
        {props.currentPage > 3 && (
          <li className={styles.page}>
            <NextLink href={getPath(1)}>
              <a>1</a>
            </NextLink>
          </li>
        )}
        {props.currentPage > 4 && <li className={styles.omission}>...</li>}
        {props.pager.map((page, index) => {
          if (props.currentPage - 3 <= page && page <= props.currentPage + 1) {
            return (
              <li
                key={index}
                className={`${styles.page} ${
                  props.currentPage === page + 1 ? `${styles.active}` : ''
                }`}
              >
                <NextLink href={getPath(page + 1)}>
                  <a>{page + 1}</a>
                </NextLink>
              </li>
            );
          }
        })}
        {props.currentPage + 3 < props.pager.length && <li className={styles.omission}>...</li>}
        {props.currentPage + 2 < props.pager.length && (
          <li className={styles.page}>
            <NextLink href={getPath(props.pager.length)}>
              <a>{props.pager.length}</a>
            </NextLink>
          </li>
        )}
        {props.currentPage < props.pager.length && (
          <li className={`${styles.page} ${styles.arrow}`}>
            <NextLink href={getPath(props.currentPage + 1)}>
              <a>
                <img width="24" height="24" src="/images/icon_arrow_right.svg" alt="次のページへ" />
              </a>
            </NextLink>
          </li>
        )}
      </ul>
    </div>
  );
};
