import styles from './Post.module.scss';

type PostProps = {
  sanitizedHtml: string;
};

export const Post: React.FC<PostProps> = ({ sanitizedHtml }) => {
  return <div className={styles.post} dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>;
};
