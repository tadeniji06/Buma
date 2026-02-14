"use client";
import { useState, useRef, useEffect } from "react";
import { headerLinks, categoryData } from "../utils/data";
import { logo } from "../assets/index";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

type CategoryKey = keyof typeof categoryData;

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileCategoryOpen, setIsMobileCategoryOpen] =
		useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		setIsMobileCategoryOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className='sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm'>
			<div className='flex items-center justify-between px-4 max-w-8xl mx-auto lg:px-6 relative'>
				{/* Logo */}
				<div className='cursor-pointer flex-shrink-0 py-3'>
					<Link href='/' onClick={closeMobileMenu}>
						<Image
							className='w-[160px] md:w-[200px] h-auto object-contain'
							src={logo}
							alt='Logo'
							priority
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className='hidden lg:flex' ref={dropdownRef}>
					<ul className='flex items-center gap-8 xl:gap-10'>
						{headerLinks.map((link, index) => (
							<li key={index} className='group'>
								{link.type === "dropdown" ? (
									<div
										className='relative'
										onMouseEnter={() => setIsDropdownOpen(true)}
										onMouseLeave={() => setIsDropdownOpen(false)}
									>
										<button
											className={`flex items-center gap-1 py-4 text-base font-medium transition-colors duration-200 ${isDropdownOpen ? "text-primary-purple" : "text-gray-700 hover:text-primary-purple"}`}
											onClick={() =>
												setIsDropdownOpen(!isDropdownOpen)
											}
										>
											{link.title}
											<Icon
												icon='mdi:chevron-down'
												className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
											/>
										</button>

										{/* Simple Dropdown Menu */}
										<div
											className={`absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top z-50 ${
												isDropdownOpen
													? "opacity-100 scale-100 visible translate-y-0"
													: "opacity-0 scale-95 invisible -translate-y-2"
											}`}
										>
											<div className='py-2'>
												{(
													Object.keys(categoryData) as CategoryKey[]
												).map((category) => {
													const info = categoryData[category];
													let href = "#";
													if (!info.comingSoon) {
														if (category === "OOH")
															href = "/categories";
														else if (category === "Radio")
															href = "/radio";
														else if (category === "PR") href = "/pr";
													}

													return (
														<Link
															key={category}
															href={href}
															className={`block px-4 py-3 hover:bg-gray-50 flex items-center justify-between group/item transition-colors ${info.comingSoon ? "cursor-not-allowed opacity-70" : ""}`}
														>
															<div className='flex flex-col'>
																<span
																	className={`text-sm font-medium ${info.comingSoon ? "text-gray-500" : "text-gray-700 group-hover/item:text-primary-purple"}`}
																>
																	{info.title}
																</span>
																<span className='text-[10px] text-gray-400 line-clamp-1'>
																	{info.description}
																</span>
															</div>
															{info.comingSoon && (
																<span className='text-[10px] uppercase font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded'>
																	Soon
																</span>
															)}
														</Link>
													);
												})}
											</div>
										</div>
									</div>
								) : (
									<Link
										href={link.link}
										className='block py-4 text-base font-medium text-gray-700 hover:text-primary-purple transition-colors duration-200'
									>
										{link.title}
									</Link>
								)}
							</li>
						))}
					</ul>
				</nav>

				{/* Desktop CTA Button */}
				<div className='hidden lg:block pl-6'>
					<Link href='/'>
						<button className='py-3 px-6 rounded-full bg-primary-purple text-white hover:bg-primary-purple-dark text-sm font-bold shadow-lg shadow-primary-purple/30 transition-all duration-200 transform hover:-translate-y-0.5'>
							List Your Space
						</button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					className='lg:hidden p-2 -mr-2 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-600'
					onClick={toggleMobileMenu}
					aria-label='Toggle mobile menu'
					aria-expanded={isMobileMenuOpen}
				>
					<Icon
						icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
						className='w-7 h-7'
					/>
				</button>
			</div>

			{/* Smooth Overlay Fix */}
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-40 ${
					isMobileMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={closeMobileMenu}
			/>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 overflow-y-auto ${
					isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className='flex flex-col min-h-full pb-6'>
					{/* Mobile Menu Header */}
					<div className='flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10'>
						<span className='font-bold text-lg text-gray-900'>
							Menu
						</span>
						<button
							onClick={closeMobileMenu}
							className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
							aria-label='Close mobile menu'
						>
							<Icon
								icon='mdi:close'
								className='w-5 h-5 text-gray-500'
							/>
						</button>
					</div>

					{/* Mobile Navigation Links */}
					<nav className='flex-1 px-2 pt-4'>
						<ul className='space-y-1'>
							{headerLinks.map((link, index) => (
								<li key={index}>
									{link.type === "dropdown" ? (
										<div>
											<button
												onClick={() =>
													setIsMobileCategoryOpen(
														!isMobileCategoryOpen,
													)
												}
												className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
													isMobileCategoryOpen
														? "bg-primary-purple/5 text-primary-purple"
														: "text-gray-700 hover:bg-gray-50"
												}`}
											>
												{link.title}
												<Icon
													icon='mdi:chevron-down'
													className={`w-5 h-5 transition-transform duration-200 ${isMobileCategoryOpen ? "rotate-180" : ""}`}
												/>
											</button>

											{/* Mobile Accordion Content */}
											<div
												className={`overflow-hidden transition-all duration-300 ease-in-out ${
													isMobileCategoryOpen
														? "max-h-[800px] opacity-100"
														: "max-h-0 opacity-0"
												}`}
											>
												<div className='bg-gray-50/50 rounded-lg mx-2 my-1 p-2 space-y-1'>
													{(
														Object.keys(categoryData) as CategoryKey[]
													).map((cat) => {
														const info = categoryData[cat];
														let href = "#";
														if (!info.comingSoon) {
															if (cat === "OOH") href = "/categories";
															else if (cat === "Radio")
																href = "/radio";
															else if (cat === "PR") href = "/pr";
														}

														return (
															<Link
																key={cat}
																href={href}
																onClick={closeMobileMenu}
																className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md ${
																	info.comingSoon
																		? "text-gray-400 cursor-not-allowed"
																		: "text-gray-600 hover:bg-white hover:text-primary-purple hover:shadow-sm"
																}`}
															>
																<span>{info.title}</span>
																{info.comingSoon && (
																	<span className='text-[10px] uppercase font-bold bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded'>
																		Soon
																	</span>
																)}
															</Link>
														);
													})}
												</div>
											</div>
										</div>
									) : (
										<Link
											href={link.link}
											onClick={closeMobileMenu}
											className='block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-purple rounded-lg transition-colors'
										>
											{link.title}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>

					{/* Mobile CTA Button */}
					<div className='p-4 mt-auto border-t border-gray-100'>
						<Link href='/'>
							<button
								className='w-full py-3.5 px-6 rounded-xl text-center bg-primary-purple text-white font-bold shadow-lg shadow-primary-purple/20 hover:bg-primary-purple-dark transition-all duration-200 active:scale-95'
								onClick={closeMobileMenu}
							>
								List Your Space
							</button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
