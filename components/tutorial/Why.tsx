import { Icon } from "@iconify/react";

const Why = () => {
	const reasons = [
		{
			title: "Verified Vendors",
			icon: "material-symbols:verified",
			desc: "We ensure that all space owners go through our verification process.",
		},
		{
			title: "Up-to-date Spaces",
			icon: "oui:app-spaces",
			desc: "We provide relevant and updated spaces for advertisers.",
		},
		{
			title: "24/7 Support",
			icon: "fluent:person-support-16-filled",
			desc: "We provide our customers and vendors with round-the-clock support.",
		},
		{
			title: "Quality Assurance",
			icon: "ic:outline-high-quality",
			desc: "We ensure regular quality checks and performance monitoring.",
		},
	];

	return (
		<div className='py-16 px-6 max-w-6xl mx-auto'>
			{/* Header */}
			<div className='text-center mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold text-dark'>
					Why Choose{" "}
					<span className='text-primary-purple'>BUMA?</span>
				</h2>
				<p className='text-gray-600 mt-3 max-w-2xl mx-auto'>
					We provide a secure, reliable platform that protects both
					advertisers and space owners.
				</p>
			</div>

			{/* Reasons Grid */}
			<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
				{reasons.map((item, i) => (
					<div
						key={i}
						className='flex flex-col items-center text-center gap-4 p-6 border rounded-2xl shadow-sm hover:shadow-md transition'
					>
						<div className='w-12 h-12 flex items-center justify-center rounded-full bg-primary-purple/10 text-primary-purple text-2xl'>
							<Icon icon={item.icon} />
						</div>
						<h3 className='text-lg font-semibold text-dark'>
							{item.title}
						</h3>
						<p className='text-gray-600 text-sm'>{item.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Why;
