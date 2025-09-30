import { Icon } from "@iconify/react/dist/iconify.js";
import { logo } from "@/assets";
import { headerLinks } from "@/utils/data";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className='bg-dark text-white py-12 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					{/* Company Info Column */}
					<div className='lg:col-span-2'>
						<div className='mb-6'>
							<Image width={200} alt='logo' src={logo} />
							<p className='text-lg font-medium text-white mb-4'>
								... Africa's No.1 Media Buying Agency
							</p>
						</div>
						<div className='text-sm leading-relaxed text-gray-300'>
							<p className='mb-2'>
								<span className='font-semibold'>BUMA</span> The
								premier marketplace for advertising spaces. Connect
								brands with the perfect locations for their campaigns.
							</p>
							<p>
								We are a pioneer agency with the goal of simplifying
								media buying processes whilst ensuring customers'
								satisfaction.
							</p>
						</div>
					</div>

					{/* Navigation Links Column */}
					<div className='flex gap-16'>
						<div className='mb-6'>
							<h3 className='text-lg font-medium mb-4'>Navigation</h3>
							<ul className='space-y-3'>
								{headerLinks.map((link, index) => (
									<li key={index}>
										<Link
											href={link.link}
											className='text-gray-300 hover:text-dark transition-colors duration-200 text-sm'
										>
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className='text-lg font-medium mb-4'>Support</h3>
							<ul className='space-y-3'>
								<li>
									<a
										href='#'
										className='text-gray-300 hover:text-dark transition-colors duration-200 text-sm'
									>
										Help Center
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-gray-300 hover:text-dark transition-colors duration-200 text-sm'
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-gray-300 hover:text-dark transition-colors duration-200 text-sm'
									>
										Terms and Policies
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Contact Information Column */}
					<div className='space-y-6'>
						{/* Lagos Office */}
						<div>
							<div className='flex items-start gap-3 mb-3'>
								<Icon
									icon='mdi:home'
									className='text-white text-xl mt-1'
								/>
								<div>
									<p className='text-sm text-gray-300 leading-relaxed'>
										426a oluwadamilola fasade str omole phase 1, Lagos
									</p>
								</div>
							</div>

							<div className='flex items-center gap-3 mb-2'>
								<Icon
									icon='mdi:phone'
									className='text-white text-lg'
								/>
								<a
									href='tel:+2348064968725'
									className='text-sm text-gray-300 hover:text-dark transition-colors'
								>
									+234 806 496 8725
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className='border-t border-gray-700 pt-6'>
					<p className='text-center text-sm text-gray-400'>
						Copyright © 2025 mybuma.com
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
