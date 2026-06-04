import Link from "next/link";
import { Icon } from "@iconify/react";
import { categoryData } from "@/utils/navigation";

interface CategorySwitcherProps {
	activeHref: string;
}

const CategorySwitcher = ({ activeHref }: CategorySwitcherProps) => {
	return (
		<nav className='border-b border-gray-100 bg-white'>
			<div className='mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4 lg:px-6'>
				{Object.entries(categoryData).map(([key, category]) => {
					const isActive = category.href === activeHref;

					return (
						<Link
							key={key}
							href={category.href}
							className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
								isActive
									? "border-primary-purple bg-primary-purple text-white shadow-sm"
									: "border-gray-200 bg-white text-gray-700 hover:border-primary-purple hover:text-primary-purple"
							}`}
							aria-current={isActive ? "page" : undefined}
						>
							<Icon icon={category.icon} className='h-4 w-4' />
							{category.title}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default CategorySwitcher;
