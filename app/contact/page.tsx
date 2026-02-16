"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		company: "",
		interest: "Billboard / OOH",
		budget: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Construct WhatsApp message
		const text = `*New Inquiry from Website*
		
*Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Company:* ${formData.company}
*Interest:* ${formData.interest}
*Budget:* ${formData.budget}

*Message:*
${formData.message}`;

		const whatsappUrl = `https://wa.me/2347040925563?text=${encodeURIComponent(
			text,
		)}`;

		// Open WhatsApp
		window.open(whatsappUrl, "_blank");

		setIsSubmitting(false);
		setIsSuccess(true);
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			company: "",
			interest: "Billboard / OOH",
			budget: "",
			message: "",
		});
	};

	return (
		<div className='min-h-screen bg-gray-50 font-sans'>
			{/* Hero Section */}
			<div className='bg-primary-purple text-white py-20 px-6 text-center relative overflow-hidden'>
				<div className='absolute inset-0 opacity-10 pattern-dots pointer-events-none' />
				<div className='max-w-3xl mx-auto relative z-10 space-y-4'>
					<h1 className='text-4xl md:text-5xl font-bold animate-fadeIn'>
						Get in Touch
					</h1>
					<p className='text-xl text-purple-100 max-w-2xl mx-auto'>
						Ready to launch your campaign? Our team of experts is here
						to help you find the perfect media solution.
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12'>
				{/* Contact Information Side */}
				<div className='lg:col-span-1 space-y-10'>
					<div>
						<h2 className='text-2xl font-bold text-gray-900 mb-6'>
							Contact Information
						</h2>
						<p className='text-gray-600 mb-8 leading-relaxed'>
							Fill out the form and our team will get back to you
							within 24 hours. Alternatively, reach out to us directly
							through our channels below.
						</p>

						<div className='space-y-6'>
							<div className='flex items-start gap-4 group cursor-pointer'>
								<div className='w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple shrink-0 group-hover:bg-primary-purple group-hover:text-white transition-colors duration-300'>
									<Icon
										icon='mdi:email-outline'
										className='w-6 h-6'
									/>
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>
										Email Us
									</h3>
									<a
										href='mailto:hello@mybuma.com'
										className='text-gray-600 hover:text-primary-purple transition-colors'
									>
										business@mybuma.com
									</a>
								</div>
							</div>

							<div className='flex items-start gap-4 group cursor-pointer'>
								<div className='w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple shrink-0 group-hover:bg-primary-purple group-hover:text-white transition-colors duration-300'>
									<Icon
										icon='mdi:phone-outline'
										className='w-6 h-6'
									/>
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>
										Call Us
									</h3>
									<a
										href='tel:+2347040925563'
										className='text-gray-600 hover:text-primary-purple transition-colors'
									>
										+234 704 092 5563
									</a>
								</div>
							</div>

							<div className='flex items-start gap-4 group'>
								<div className='w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple shrink-0 group-hover:bg-primary-purple group-hover:text-white transition-colors duration-300'>
									<Icon
										icon='mdi:map-marker-outline'
										className='w-6 h-6'
									/>
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>
										Visit Us
									</h3>
									<p className='text-gray-600 max-w-xs'>
										Lagos, Nigeria
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Social Proof / Trust */}
					<div className='bg-primary-purple/5 p-8 rounded-2xl border border-primary-purple/10'>
						<h3 className='font-bold text-gray-900 mb-4'>
							Why choose Buma?
						</h3>
						<ul className='space-y-3'>
							{[
								"Access to premium billboard locations",
								"Top-rated radio & TV slots",
								"Verified PR & Media partners",
								"Data-driven campaign insights",
							].map((item, i) => (
								<li
									key={i}
									className='flex items-center gap-3 text-sm text-gray-700'
								>
									<Icon
										icon='mdi:check-circle'
										className='text-green-500 w-5 h-5 shrink-0'
									/>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Contact Form Side */}
				<div className='lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 md:p-10 border border-gray-100'>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						Tell us about your project
					</h2>
					<p className='text-gray-500 mb-8'>
						We'd love to hear more about your advertising needs.
					</p>

					{isSuccess ? (
						<div className='flex flex-col items-center justify-center py-12 text-center animate-fadeIn'>
							<div className='w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6'>
								<Icon icon='mdi:check' className='w-10 h-10' />
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-2'>
								Message Sent!
							</h3>
							<p className='text-gray-600 max-w-md mx-auto mb-8'>
								Thank you for reaching out. We have opened WhatsApp to
								finalize your inquiry details. Our team will review
								your request and get back to you shortly.
							</p>
							<button
								onClick={() => setIsSuccess(false)}
								className='text-primary-purple font-semibold hover:underline'
							>
								Send another message
							</button>
						</div>
					) : (
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<label
										htmlFor='firstName'
										className='text-sm font-semibold text-gray-700'
									>
										First Name <span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										id='firstName'
										name='firstName'
										required
										placeholder='John'
										className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all'
										value={formData.firstName}
										onChange={handleChange}
									/>
								</div>
								<div className='space-y-2'>
									<label
										htmlFor='lastName'
										className='text-sm font-semibold text-gray-700'
									>
										Last Name <span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										id='lastName'
										name='lastName'
										required
										placeholder='Doe'
										className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all'
										value={formData.lastName}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<label
										htmlFor='email'
										className='text-sm font-semibold text-gray-700'
									>
										Email Address{" "}
										<span className='text-red-500'>*</span>
									</label>
									<input
										type='email'
										id='email'
										name='email'
										required
										placeholder='john@company.com'
										className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all'
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								<div className='space-y-2'>
									<label
										htmlFor='phone'
										className='text-sm font-semibold text-gray-700'
									>
										Phone Number{" "}
										<span className='text-red-500'>*</span>
									</label>
									<input
										type='tel'
										id='phone'
										name='phone'
										required
										placeholder='+234...'
										className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all'
										value={formData.phone}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='company'
									className='text-sm font-semibold text-gray-700'
								>
									Company Name
								</label>
								<input
									type='text'
									id='company'
									name='company'
									placeholder='Your Company Ltd.'
									className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all'
									value={formData.company}
									onChange={handleChange}
								/>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<label
										htmlFor='interest'
										className='text-sm font-semibold text-gray-700'
									>
										I'm interested in...
									</label>
									<div className='relative'>
										<select
											id='interest'
											name='interest'
											className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all appearance-none bg-white'
											value={formData.interest}
											onChange={handleChange}
										>
											<option>Billboard / OOH</option>
											<option>Radio Advertising</option>
											<option>PR & Media Publication</option>
											<option>TV Advertising</option>
											<option>Influencer Marketing</option>
											<option>General Inquiry</option>
										</select>
										<Icon
											icon='mdi:chevron-down'
											className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<label
										htmlFor='budget'
										className='text-sm font-semibold text-gray-700'
									>
										Estimated Budget
									</label>
									<div className='relative'>
										<select
											id='budget'
											name='budget'
											className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all appearance-none bg-white'
											value={formData.budget}
											onChange={handleChange}
										>
											<option value=''>Select a range</option>
											<option value='< ₦500k'>Less than ₦500k</option>
											<option value='₦500k - ₦2M'>₦500k - ₦2M</option>
											<option value='₦2M - ₦10M'>₦2M - ₦10M</option>
											<option value='₦10M - ₦50M'>₦10M - ₦50M</option>
											<option value='₦50M+'>₦50M+</option>
											<option value='Not sure'>Not sure yet</option>
										</select>
										<Icon
											icon='mdi:chevron-down'
											className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
										/>
									</div>
								</div>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='message'
									className='text-sm font-semibold text-gray-700'
								>
									Project Details{" "}
									<span className='text-red-500'>*</span>
								</label>
								<textarea
									id='message'
									name='message'
									required
									rows={4}
									placeholder='Tell us more about your campaign goals, target audience, and any specific locations...'
									className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 outline-none transition-all resize-none'
									value={formData.message}
									onChange={handleChange}
								/>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-purple/20 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 ${
									isSubmitting
										? "bg-gray-400 cursor-not-allowed"
										: "bg-primary-purple hover:bg-primary-purple-dark"
								}`}
							>
								{isSubmitting ? (
									<span className='flex items-center justify-center gap-2'>
										<Icon
											icon='mdi:loading'
											className='animate-spin w-5 h-5'
										/>
										Sending...
									</span>
								) : (
									"Submit Request"
								)}
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
