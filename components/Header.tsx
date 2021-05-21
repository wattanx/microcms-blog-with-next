import { useState } from 'react';
import Link from 'next/link';
import styles from '@styles/components/Header.module.scss';

export const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <Link href="/">
            <img className={styles.logoImg} src="/images/vercel.svg" alt="microCMS" />
          </Link>
        </h1>
        <button className={styles.menuBtn} onClick={() => setOpen(!isOpen)}>
          <img src="/images/icon_menu.svg" alt="menu" />
        </button>
        {isOpen && <div className={styles.mask} onClick={() => setOpen(false)}></div>}

        <div className={isOpen ? `${styles.menu} ${styles.isOpen}` : styles.menu}>
          <ul className={styles.lists}>
            <li className={styles.list}>
              <a href="">menu1</a>
            </li>
            <li className={styles.list}>
              <a href="">menu2</a>
            </li>
            <li className={styles.list}>
              <a href="">menu3</a>
            </li>
          </ul>
        </div>
      </header>
      <div className={styles.empty}></div>
    </div>
  );
};
