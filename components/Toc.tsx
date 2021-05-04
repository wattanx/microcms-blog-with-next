import styles from '../styles/components/Toc.module.scss';
import { Link } from 'react-scroll';
import { useEffect, useState } from 'react';
import { ConvertToHtml, AddList} from '../utils/TocUtil';
type TocProps = {
    body: string; 
}

type TocItem = {
    text: string | undefined;
    id: string | undefined | null;
    name: string | undefined | null;
}

export const Toc: React.FC<TocProps> = (props) => {
    const [tocItem, setToc] = useState<TocItem[]>([]);
    useEffect(() => {
        const headings: any[] = [];
        const element = ConvertToHtml(props.body);
        AddList(headings, element.querySelectorAll('h1, h2, h3, h4, h5, h6'));

        const toc: TocItem[] = headings.map((heading: HTMLHeadElement) => {
            return {
                text: heading.innerText,
                id: heading.getAttribute('id'),
                name: heading.getAttribute('name')
            };
        });
        setToc(toc);
    }, [])
    
    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>
                <ul className={styles.lists}>
                    {tocItem.map((x) => {
                        return (
                            <li key={x.id} className={`${styles.list} ${x.name}`}>
                                <Link to={`${x.id}`}>{x.text}</Link>
                            </li>
                        )
                    })}
                </ul>
            </h4>
        </div>
    );
}