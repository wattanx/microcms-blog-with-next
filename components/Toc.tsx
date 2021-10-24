import styles from '@styles/components/Toc.module.scss';
import { Link } from 'react-scroll';
import { TocTypes } from '@types';

type TocProps = {
  toc: TocTypes[];
};

export const Toc: React.FC<TocProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>
        <ul className={styles.lists}>
          {props.toc.map((x) => {
            return (
              <li key={x.id} className={`${styles.list} ${x.name}`}>
                <Link to={`${x.id}`}>{x.text}</Link>
              </li>
            );
          })}
        </ul>
      </h4>
    </div>
  );
};
