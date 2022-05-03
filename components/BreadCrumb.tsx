import NextLink from 'next/link';
import { ICategory, ITag } from '@/types';

type BreadCrumbProps = {
  category?: ICategory;
  tag?: ITag;
};

export const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  const hasCategory = (category?: ICategory) => {
    if (!category) {
      return false;
    }
    return Object.keys(category).length > 0;
  };

  const hasTag = (tag?: ITag) => {
    if (!tag) {
      return false;
    }
    return Object.keys(tag).length > 0;
  };

  return (
    <ul className="breadcrumb">
      <li className="breadcrumbList">
        <NextLink href="/" passHref prefetch={false}>
          <a>記事一覧</a>
        </NextLink>
      </li>
      {hasCategory(props.category) && (
        <li className="breadcrumbList">
          <NextLink href={`/category/${props.category?.id}/page/1`} passHref prefetch={false}>
            <a>{props.category?.name}</a>
          </NextLink>
        </li>
      )}
      {hasTag(props.tag) && (
        <li className="breadcrumbList">
          <NextLink href={`/tag/${props.tag?.id}/page/1`} passHref prefetch={false}>
            <a>{props.tag?.name}</a>
          </NextLink>
        </li>
      )}
    </ul>
  );
};
