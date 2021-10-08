import NextLink from 'next/link';
import { ITag } from '@types';
import styles from '@styles/components/Tags.module.scss';

type TagsProps = {
  tags: ITag[];
};

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>タグ</h1>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.id} className={styles.listItem}>
            <NextLink href="/tag/[tagId]/page/[id]" as={`/tag/${tag.id}/page/1`}>
              <a className={styles.link}>{tag.name}</a>
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
