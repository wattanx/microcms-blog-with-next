import { useState } from "react";
import Link from 'next/link';

export const Header: React.FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <div>
            <header className="header">
                <h1 className="logo">
                    <Link href="/">
                        <img className="logoImg" src="/images/vercel.svg" alt="microCMS" />
                    </Link>
                </h1>
                <button className="menuBtn" onClick={() => setOpen(!isOpen)}>
                    <img src="/images/icon_menu.svg" alt="menu" />
                </button>
                {isOpen && 
                    (<div className="mask" onClick={() => setOpen(false)}></div>)
                }
                
                <div className={ isOpen ? 'menu isOpen' : 'menu' }>
                    <ul className="lists">
                        <li className="list">
                            <a href="">menu1</a>
                        </li>
                        <li className="list">
                            <a href="">menu2</a>
                        </li>
                        <li className="list">
                            <a href="">menu3</a>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="empty"></div>
        </div>
    )
}