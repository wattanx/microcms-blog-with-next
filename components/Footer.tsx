import styles from '@styles/components/Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.lists}>
        <li className={styles.list}>
          <a href="">運営会社</a>
        </li>
        <li className={styles.list}>
          <a href="">特定商取引法に基づく表記</a>
        </li>
        <li className={styles.list}>
          <a href="">利用規約</a>
        </li>
        <li className={styles.list}>
          <a href="">プライバシーポリシー</a>
        </li>
        <li className={styles.list}>
          <a href="">お問い合わせ</a>
        </li>
      </ul>
      <p className={styles.cr}>© 〇〇 Inc.</p>
    </footer>
  );
};
