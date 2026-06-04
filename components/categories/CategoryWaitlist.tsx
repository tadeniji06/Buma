import Link from "next/link";
import { Icon } from "@iconify/react";

interface CategoryWaitlistProps {
	icon: string;
	title: string;
	description: string;
	searchTerm?: string;
	accentClassName?: string;
}

const CategoryWaitlist = ({
	icon,
	title,
	description,
	searchTerm,
	accentClassName = "text-primary-purple",
}: CategoryWaitlistProps) => {
	const hasSearch = Boolean(searchTerm?.trim());

	return (
		<div className='rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center shadow-sm'>
			<div
				className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 ${accentClassName}`}
			>
				<Icon icon={icon} className='h-8 w-8' />
			</div>
			<h3 className='text-2xl font-bold text-gray-950'>
				{hasSearch ? "No matching inventory yet" : title}
			</h3>
			<p className='mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500'>
				{hasSearch
					? `No CMS item currently matches "${searchTerm}". Clear the search or request a curated quote from the Buma team.`
					: description}
			</p>
			<div className='mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row'>
				<Link
					href='/contact'
					className='inline-flex items-center justify-center gap-2 rounded-xl bg-primary-purple px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-purple-dark'
				>
					<Icon icon='mdi:message-text-outline' className='h-5 w-5' />
					Request a quote
				</Link>
				<Link
					href='/categories'
					className='inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-800 transition hover:border-primary-purple hover:text-primary-purple'
				>
					<Icon icon='mdi:billboard' className='h-5 w-5' />
					Browse billboards
				</Link>
			</div>
		</div>
	);
};

export default CategoryWaitlist;
