"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function NewsletterPopup({
	hasSignedUp,
}: {
	hasSignedUp: boolean;
}) {
	const [isOpen, setIsOpen] = useState(!hasSignedUp);
	const dialogRef = useRef<HTMLDivElement>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		location: "",
	});

	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		const previousFocus =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		document.body.style.overflow = "hidden";

		const focusableElements = () =>
			dialogRef.current?.querySelectorAll<HTMLElement>(
				'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
			) ?? [];
		focusableElements()[0]?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				return;
			}

			if (event.key !== "Tab") return;

			const elements = focusableElements();
			const first = elements[0];
			const last = elements[elements.length - 1];
			if (!first || !last) {
				event.preventDefault();
				dialogRef.current?.focus();
			} else if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
			previousFocus?.focus();
		};
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const secureAttribute =
			window.location.protocol === "https:" ? "; Secure" : "";
		document.cookie = `newsletterSignedUp=true; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${secureAttribute}`;
		toast.success("Thanks for signing up!");
		setIsOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="newsletter-title"
				tabIndex={-1}
				className="my-auto w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
			>
				<div className="p-6 sm:p-8">
					<div className="text-center mb-4">
						<h2 id="newsletter-title" className="text-xl font-bold text-gray-900 mb-1">
							Join Our Newsletter
						</h2>
						<p className="text-gray-600 text-xs">
							Sign up to our newsletter to access the platform and receive the latest Buma updates.
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
							Subscribe and Continue
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
