"use client";
import { useState } from "react";
import { auth, logo } from "@/assets";
import { Icon } from "@iconify/react";
import Image from "next/image";
import SignUp from "./SignUp";
const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);
	const togglePopUp = () => {
		setShowPopUp((prev) => !prev);
	};
	return (
		<>
			<div className='min-h-screen flex flex-col md:flex-row'>
				{/* Left Section — hidden on small screens */}
				<div className='hidden md:flex md:w-1/2 bg-primary-purple text-white flex-col justify-center items-center px-8 py-12 rounded-r-3xl text-center'>
					<h2 className='text-3xl font-semibold mb-8 leading-snug'>
						The Perfect marketplace for <br />
						advertising spaces and connecting brands
					</h2>
					<Image
						width={400}
						height={300}
						src={auth}
						alt='auth illustration'
						className='mt-4'
					/>
				</div>

				{/* Right Section */}
				<div className='w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-20 py-10'>
					{/* Header */}
					<div className='flex justify-between items-center mb-10'>
						<h1 className='text-2xl md:text-3xl font-semibold'>
							Welcome Back
						</h1>
						<Image src={logo} alt='logo' width={100} height={100} />
					</div>

					{/* Form */}
					<form className='flex flex-col gap-6'>
						{/* Email / Phone */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								Email/phone
							</label>
							<input
								type='text'
								placeholder='mymail@gmail.com'
								className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-purple'
							/>
						</div>

						{/* Password */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? "text" : "password"}
									placeholder='********'
									className='w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-purple'
								/>
								<Icon
									icon={
										showPassword
											? "mdi:eye-off-outline"
											: "mdi:eye-outline"
									}
									className='absolute right-3 top-3.5 text-gray-500 cursor-pointer'
									width={22}
									onClick={() => setShowPassword((prev) => !prev)}
								/>
							</div>
							<p className='text-sm text-right text-primary-purple mt-2 cursor-pointer hover:underline'>
								Forgot password?
							</p>
						</div>

						{/* Remember Me */}
						<div className='flex items-center gap-2'>
							<input
								type='checkbox'
								id='remember'
								className='accent-primary-purple cursor-pointer'
							/>
							<label
								htmlFor='remember'
								className='text-sm text-gray-600'
							>
								Remember me
							</label>
						</div>

						{/* Login Button */}
						<button
							type='submit'
							className='bg-primary-purple text-white py-3 rounded-md hover:bg-purple-700 transition-all font-medium'
						>
							Login
						</button>

						{/* Divider */}
						<div className='flex items-center gap-2 my-4'>
							<hr className='flex-1 border-gray-300' />
							<span className='text-gray-500 text-sm'>or</span>
							<hr className='flex-1 border-gray-300' />
						</div>

						{/* Google Login */}
						<button
							type='button'
							className='border border-gray-300 py-3 rounded-md flex justify-center items-center gap-3 hover:bg-gray-50 transition-all'
						>
							<Icon
								icon='flat-color-icons:google'
								width={24}
								height={24}
							/>
							<span>Continue with Google</span>
						</button>

						{/* Sign Up Link */}
						<p className='text-center text-gray-600 text-sm mt-4'>
							Don’t have an account?{" "}
							<span
								onClick={togglePopUp}
								className='text-primary-purple cursor-pointer font-medium hover:underline'
							>
								Sign up
							</span>
						</p>
					</form>
				</div>
			</div>
			{showPopUp && <SignUp togglePopUp={togglePopUp} />}
		</>
	);
};

export default Login;
