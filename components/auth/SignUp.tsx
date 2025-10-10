"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";

const SignUp = ({ togglePopUp }: { togglePopUp: () => void }) => {
	const [showPassword, setShowPassword] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	// Close modal when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(e.target as Node)
			) {
				togglePopUp();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [togglePopUp]);

	return (
		<div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
			<div
				ref={modalRef}
				className='bg-white w-[90%] sm:w-[400px] rounded-2xl p-6 sm:p-8 shadow-2xl animate-popIn relative'
			>
				{/* Close Icon */}
				<button
					onClick={togglePopUp}
					className='absolute right-4 top-4 text-gray-500 hover:text-gray-800'
				>
					<Icon icon='mdi:close' width={22} />
				</button>

				{/* Title */}
				<h2 className='text-2xl font-semibold mb-6'>
					Create Account
				</h2>

				{/* Google Signup */}
				<button className='border border-gray-300 py-3 rounded-md flex justify-center items-center gap-3 w-full hover:bg-gray-50 transition-all'>
					<Icon
						icon='flat-color-icons:google'
						width={24}
						height={24}
					/>
					<span>Continue with Google</span>
				</button>

				{/* Divider */}
				<div className='flex items-center gap-2 my-5'>
					<hr className='flex-1 border-gray-300' />
					<span className='text-gray-500 text-sm'>or</span>
					<hr className='flex-1 border-gray-300' />
				</div>

				{/* Email */}
				<div className='mb-4'>
					<label className='block text-sm font-medium mb-2'>
						Email/phone
					</label>
					<div className='relative'>
						<Icon
							icon='mdi:email-outline'
							className='absolute left-3 top-3.5 text-gray-400'
						/>
						<input
							type='text'
							placeholder='mybuma@gmail.com'
							className='w-full border border-gray-300 rounded-md p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-purple'
						/>
					</div>
				</div>

				{/* Password */}
				<div className='mb-6'>
					<label className='block text-sm font-medium mb-2'>
						Password
					</label>
					<div className='relative'>
						<Icon
							icon='mdi:lock-outline'
							className='absolute left-3 top-3.5 text-gray-400'
						/>
						<input
							type={showPassword ? "text" : "password"}
							placeholder='********'
							className='w-full border border-gray-300 rounded-md p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-purple'
						/>
						<Icon
							icon={
								showPassword
									? "mdi:eye-off-outline"
									: "mdi:eye-outline"
							}
							className='absolute right-3 top-3.5 text-gray-500 cursor-pointer'
							onClick={() => setShowPassword((prev) => !prev)}
						/>
					</div>
				</div>

				{/* Sign Up Button */}
				<button className='bg-primary-purple text-white w-full py-3 rounded-md hover:bg-purple-700 transition-all font-medium'>
					Sign up
				</button>
			</div>
		</div>
	);
};

export default SignUp;
