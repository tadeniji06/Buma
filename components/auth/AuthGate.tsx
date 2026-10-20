"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

const inputClassName =
	"w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20";

export default function AuthGate({
	configured,
	authError,
}: {
	configured: boolean;
	authError?: string | null;
}) {
	const router = useRouter();
	const [mode, setMode] = useState<AuthMode>("signup");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [notice, setNotice] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!configured || isSubmitting) return;

		setIsSubmitting(true);
		setErrorMessage("");
		setNotice("");
		const formData = new FormData(event.currentTarget);
		const email = String(formData.get("email")).trim();
		const password = String(formData.get("password"));

		try {
			const supabase = createClient();
			if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: {
							full_name: String(formData.get("fullName")).trim(),
							phone: String(formData.get("phone")).trim(),
							location: String(formData.get("location")).trim(),
						},
					},
				});

				if (error) throw error;
				if (!data.session) {
					setNotice(
						"Your account was created. Check your email to confirm your address, then sign in.",
					);
					setMode("signin");
					return;
				}
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				if (error) throw error;
			}

			router.refresh();
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Authentication failed. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const switchMode = (nextMode: AuthMode) => {
		setMode(nextMode);
		setErrorMessage("");
		setNotice("");
	};

	return (
		<main className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-gray-950/80 px-4 py-4 backdrop-blur-sm sm:items-center sm:p-6">
			<section
				aria-labelledby="auth-title"
				className="my-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[0.9fr_1.1fr]"
			>
				<div className="hidden flex-col justify-center bg-primary-purple p-10 text-white md:flex lg:p-14">
					<p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
						Buma marketplace
					</p>
					<h2 className="text-3xl font-bold leading-tight lg:text-4xl">
						Your next campaign starts here.
					</h2>
					<p className="mt-5 text-white/80">
						Sign in or create an account to explore advertising opportunities
						across Africa.
					</p>
				</div>

				<div className="p-5 sm:p-8 lg:p-12">
					<p className="text-sm font-semibold text-primary-purple">
						WELCOME TO BUMA
					</p>
					<h1 id="auth-title" className="mt-2 text-2xl font-bold text-gray-900">
						{mode === "signup" ? "Create your account" : "Welcome back"}
					</h1>
					<p className="mt-2 text-sm text-gray-600">
						{mode === "signup"
							? "Enter your details to access the platform."
							: "Sign in to continue to the platform."}
					</p>

					<div className="mt-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
						<button
							type="button"
							onClick={() => switchMode("signup")}
							aria-pressed={mode === "signup"}
							className={`rounded-md px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
						>
							Sign up
						</button>
						<button
							type="button"
							onClick={() => switchMode("signin")}
							aria-pressed={mode === "signin"}
							className={`rounded-md px-3 py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
						>
							Sign in
						</button>
					</div>

					<div className="my-5 flex items-center gap-3 text-xs text-gray-400">
						<hr className="flex-1 border-gray-200" />
						<span>EMAIL</span>
						<hr className="flex-1 border-gray-200" />
					</div>

					{!configured ? (
						<div role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
							Authentication is not configured. Set{" "}
							<code className="font-semibold">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
							and{" "}
							<code className="font-semibold">
								NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
							</code>{" "}
							to enable sign-up and sign-in.
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							{mode === "signup" && (
								<>
									<div>
										<label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
											Full name
										</label>
										<input
											id="fullName"
											name="fullName"
											type="text"
											autoComplete="name"
											required
											maxLength={120}
											className={inputClassName}
											placeholder="Your full name"
										/>
									</div>
									<div className="grid gap-4 sm:grid-cols-2">
										<div>
											<label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
												Phone number
											</label>
											<input
												id="phone"
												name="phone"
												type="tel"
												autoComplete="tel"
												required
												maxLength={40}
												className={inputClassName}
												placeholder="+234 800 000 0000"
											/>
										</div>
										<div>
											<label htmlFor="location" className="mb-1.5 block text-sm font-medium text-gray-700">
												Location
											</label>
											<input
												id="location"
												name="location"
												type="text"
												autoComplete="address-level2"
												required
												maxLength={120}
												className={inputClassName}
												placeholder="Lagos, Nigeria"
											/>
										</div>
									</div>
								</>
							)}

							<div>
								<label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
									Email address
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									maxLength={254}
									className={inputClassName}
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete={mode === "signup" ? "new-password" : "current-password"}
									required
									minLength={8}
									className={inputClassName}
									placeholder="At least 8 characters"
								/>
							</div>

							{errorMessage && (
								<p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
									{errorMessage}
								</p>
							)}
							{notice && (
								<p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
									{notice}
								</p>
							)}
							{authError && (
								<p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
									{authError}
								</p>
							)}

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full rounded-lg bg-primary-purple px-4 py-3 font-semibold text-white transition hover:bg-purple-800 disabled:cursor-wait disabled:opacity-60"
							>
								{isSubmitting
									? "Please wait..."
									: mode === "signup"
										? "Create account"
										: "Sign in"}
							</button>
						</form>
					)}
				</div>
			</section>
		</main>
	);
}
