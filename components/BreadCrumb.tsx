import Link from 'next/link';
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
        <Link href="/">記事一覧</Link>
      </li>
      {hasCategory(props.category) && (
        <li className="breadcrumbList">
          <Link href={`/category/${props.category?.id}/page/1`}>{props.category?.name}</Link>
        </li>
      )}
      {hasTag(props.tag) && (
        <li className="breadcrumbList">
          <Link href={`/tag/${props.tag?.id}/page/1`}>{props.tag.name}</Link>
        </li>
      )}
    </ul>
  );
};
