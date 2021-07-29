import { IBanner } from '@/types';
import styles from '@styles/components/Banner.module.scss';

type BannerProps = {
  banner?: IBanner;
};

export const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div className="wrapper">
      <a
        href={
          props.banner?.url
            ? `${props.banner.url}?utm_source=google&utm_medium=content-text&utm_campain=remarketing`
            : ''
        }
      >
        <picture>
          <source
            type="image/webp"
            srcSet={`${props.banner.image.url}?w=300&fm=webp,${props.banner.image.url}?w=600&fm=webp 2x`}
          />
          <img
            src={props.banner?.image?.url}
            className={`${styles.image} lazyload`}
            alt={props.banner?.alt}
          />
        </picture>
      </a>
    </div>
  );
};
