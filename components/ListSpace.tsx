const ListSpace = () => {
	return (
		<div className='h-[400px] flex bg-gradient-to-br from-dark to-primary-purple p-8'>
			<div className='max-w-3xl flex flex-col items-center justify-center gap-6 mx-auto text-center'>
				{/* Heading */}
				<h2 className='text-white text-3xl md:text-4xl font-bold leading-snug'>
					Own an Ad Space? <br className='hidden md:block' />
					Earn by Listing it Today
				</h2>

				{/* Description */}
				<p className='text-white/90 text-base md:text-lg max-w-xl'>
					Join thousands of space owners who are earning passive
					income by renting out their advertising spaces. Turn your
					unused space into steady revenue.
				</p>

				{/* CTA Button */}
				<button className='bg-white text-primary-purple font-semibold rounded-xl py-3 px-8 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all'>
					List Your Space
				</button>
			</div>
		</div>
	);
};

export default ListSpace;
