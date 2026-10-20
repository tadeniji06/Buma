"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AccountControls({ email }: { email: string }) {
	const router = useRouter();
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSignOut = async () => {
		setIsSigningOut(true);
		setErrorMessage("");

		try {
			const { error } = await createClient().auth.signOut();
			if (error) throw error;
			router.refresh();
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Could not sign out.",
			);
			setIsSigningOut(false);
		}
	};

	return (
		<div className="flex min-h-10 items-center justify-end gap-3 border-b border-gray-100 bg-gray-50 px-4 text-sm text-gray-600 lg:px-8">
			{errorMessage && <span role="alert" className="text-red-700">{errorMessage}</span>}
			<span className="max-w-[60vw] truncate">{email}</span>
			<button
				type="button"
				onClick={handleSignOut}
				disabled={isSigningOut}
				className="font-semibold text-primary-purple hover:underline disabled:opacity-60"
			>
				{isSigningOut ? "Signing out..." : "Sign out"}
			</button>
		</div>
	);
}
