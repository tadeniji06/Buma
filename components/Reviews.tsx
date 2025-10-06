const Reviews = () => {
	const reviews = [
		{
			desc: "BUMA made it incredibly easy to find and book the perfect billboard for our product launch. The platform is intuitive and the customer service is outstanding.",
			name: "Tolu Fayemi",
			role: "Marketing Director, FreshMart",
		},
		{
			desc: "We listed our ad space on BUMA and within a week, we had multiple bookings. A true game-changer for space owners.",
			name: "James Johnson",
			role: "Ad Space Owner",
		},
		{
			desc: "The best platform we've used for managing campaigns across multiple cities. Streamlined, fast, and reliable.",
			name: "Victor D.A",
			role: "Media Buyer, AdPro Agency",
		},
	];

	return (
		<div className='py-16 px-6 bg-gray-50'>
			<div className='max-w-6xl mx-auto flex flex-col gap-12 items-center text-center'>
				{/* Section Heading */}
				<div className='flex flex-col gap-4'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
						Hear what others say about{" "}
						<span className='text-primary-purple'>BUMA</span>
					</h2>
					<p className='text-gray-600 max-w-2xl text-sm md:text-base'>
						Join thousands of satisfied customers who trust BUMA for
						their advertising needs.
					</p>
				</div>

				{/* Reviews Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
					{reviews.map((review, i) => (
						<div
							key={i}
							className='flex flex-col gap-4 bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left'
						>
							<p className='text-gray-700 text-sm leading-relaxed'>
								“{review.desc}”
							</p>
							<div className='mt-auto'>
								<p className='font-semibold text-gray-900'>
									{review.name}
								</p>
								<p className='text-gray-500 text-sm'>{review.role}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Reviews;
