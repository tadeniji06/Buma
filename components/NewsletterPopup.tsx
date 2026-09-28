"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterPopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		location: "",
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const hasSignedUp = document.cookie.split('; ').find(row => row.startsWith('newsletterSignedUp='));
		if (hasSignedUp) return;

		if (!isOpen) {
			const timer = setTimeout(() => {
				setIsOpen(true);
			}, 120000);
			return () => clearTimeout(timer);
		}
	}, [isOpen, mounted]);

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, this is where you'd send data to your API
		console.log("Newsletter signup:", formData);
		document.cookie = "newsletterSignedUp=true; max-age=" + 60*60*24*365 + "; path=/";
		toast.success("Thanks for subscribing to our newsletter!");
		setIsOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	if (!mounted) return null;
	if (!isOpen) return null;

	return (
		<div className="fixed bottom-4 left-4 z-[9999] w-full max-w-sm p-4 transition-opacity">
			<div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 w-full relative overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
				<button
					onClick={handleClose}
					className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
					aria-label="Close"
				>
					<X className="w-5 h-5" />
				</button>

				<div className="p-6">
					<div className="text-center mb-4">
						<h2 className="text-xl font-bold text-gray-900 mb-1">
							Join Our Newsletter
						</h2>
						<p className="text-gray-600 text-xs">
							Get the latest updates, exclusive deals, and insights directly to your inbox.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-3">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								value={formData.name}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								placeholder="John Doe"
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								placeholder="john@example.com"
							/>
						</div>
						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
								Phone Number
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								required
								value={formData.phone}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								placeholder="+1 234 567 8900"
							/>
						</div>
						<div>
							<label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
								Location
							</label>
							<input
								type="text"
								id="location"
								name="location"
								required
								value={formData.location}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								placeholder="Lagos, Nigeria"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors mt-2"
						>
							Subscribe Now
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
