import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.loadingicon} src="/images/icon_loading.svg" alt="検索中" />
    </div>
  );
};
