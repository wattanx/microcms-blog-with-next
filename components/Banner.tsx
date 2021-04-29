import { IBanner } from "../interfaces/interface";

type BannerProps = {
    banner?: IBanner;
}

export const Banner: React.FC<BannerProps> = (props) => {
    return (
        <div className="wrapper">
            <a href={`${props.banner.url}?utm_source=google&utm_medium=content-text&utm_campain=remarketing`}>
                <picture>
                    <img src={props.banner.image.url} className="image lazyload" alt={props.banner.alt}/>
                </picture>
            </a>
        </div>
    );
}