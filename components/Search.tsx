import { useState } from 'react';
import styles from '../styles/components/Search.module.scss';

export const Search: React.FC = () => {

    const [searchable, setSearchable] = useState<boolean>(false);

    const onEnterKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // TODO 検索処理
    }

    return (
        <label className={styles.label}>
            <input className={styles.input} type="text" onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onEnterKeyEvent}/>
        </label>
    );
}