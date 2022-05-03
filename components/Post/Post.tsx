import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import styles from './Post.module.scss';

type PostProps = {
  body?: string;
};

export const Post: React.FC<PostProps> = (props) => {
  const [htmlString, setHtmlString] = useState<string>('');
  useEffect(() => {
    if (props.body) {
      // XSS対策
      setHtmlString(DOMPurify().sanitize(props.body));
    }
  }, []);
  return <div className={styles.post} dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
};
