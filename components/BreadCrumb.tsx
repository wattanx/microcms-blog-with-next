import Link from "next/link"

type BreadCrumbProps = {
    category: CategoryType;
}

type CategoryType = {
    type: Object;
    required: boolean;
    default(): void;
    id: number;
    name: string;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
    const hasCategory = (category: CategoryType) => {
        return Object.keys(category).length > 0;
    }
    return (
        <ul className="breadcrumb">
            <li className="breadcrumbList">
                <Link href="/">
                    記事一覧
                </Link>
            </li>
            {hasCategory(props.category) &&
                (
                    <li className="breadcrumbList">
                        <Link href={`/category/${props.category.id}/page/1`}>
                            {props.category.name}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}