import { Link } from 'react-scroll';
import { TocTypes } from '@types';
import styles from './Toc.module.scss';

type TocProps = {
  toc: TocTypes[];
};

const getMarginLeft = (name: string) => {
  if (name === 'h2') {
    return styles.h2;
  }
  if (name === 'h3') {
    return styles.h3;
  }

  return '';
};

export const Toc: React.FC<TocProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>
        <ul className={styles.lists}>
          {props.toc.map((x) => {
            return (
              <li key={x.id} className={`${styles.list} ${getMarginLeft(x.name)}`}>
                <Link to={`${x.id}`}>{x.text}</Link>
              </li>
            );
          })}
        </ul>
      </h4>
    </div>
  );
};
