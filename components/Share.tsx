import { config } from '../site.config';
import styles from '@styles/components/Share.module.scss';

type ShareProps = {
  id: string;
  title?: string;
};

export const Share: React.FC<ShareProps> = (props) => {
  const twitterLink = `https://twitter.com/intent/tweet?text=${props.title}&url=${config.baseUrl}/${props.id}/&hashtags=microcms`;
  const facebookLink = `https://www.facebook.com/sharer.php?u=${config.baseUrl}/${props.id}/`;
  const hatenaLink = `https://b.hatena.ne.jp/entry/${config.baseUrl}/${props.id}/`;
  const feedLink = `${config.baseUrl}/feed`;
  return (
    <div className={styles.share}>
      <ul className={styles.shareLists}>
        <li className={styles.shareList}>
          <a href={twitterLink} target="_blank" rel="noopener noreferrer">
            <img src="/images/icon_twitter.svg" alt="twitter" />
          </a>
        </li>
        <li className={styles.shareList}>
          <a href={facebookLink} target="_blank" rel="noopener noreferrer">
            <img src="/images/icon_facebook.svg" alt="Facebook" />
          </a>
        </li>
        <li className={styles.shareList}>
          <a href={hatenaLink} target="_blank" rel="noopener noreferrer">
            <img src="/images/icon_hatena.svg" alt="はてなブックマーク" />
          </a>
        </li>
        <li className={styles.shareList}>
          <a href={feedLink} target="_blank" rel="noopener noreferrer">
            <img src="/images/icon_feed.svg" alt="フィード" />
          </a>
        </li>
      </ul>
    </div>
  );
};
