import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

	if (!supabaseUrl || !supabasePublishableKey) {
		if (pathname.startsWith("/api/")) {
			return NextResponse.json(
				{ error: "Authentication is not configured." },
				{ status: 503 },
			);
		}

		if (pathname !== "/" && pathname !== "/login") {
			return NextResponse.redirect(new URL("/", request.url));
		}

		return NextResponse.next({ request });
	}

	let response = NextResponse.next({ request });
	const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value),
				);
				response = NextResponse.next({ request });
				cookiesToSet.forEach(({ name, value, options }) =>
					response.cookies.set(name, value, options),
				);
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user && pathname.startsWith("/api/")) {
		const unauthorizedResponse = NextResponse.json(
			{ error: "Authentication required." },
			{ status: 401 },
		);
		response.cookies.getAll().forEach((cookie) =>
			unauthorizedResponse.cookies.set(cookie),
		);
		return unauthorizedResponse;
	}

	if (!user && pathname !== "/" && pathname !== "/login") {
		const redirectResponse = NextResponse.redirect(new URL("/", request.url));
		response.cookies.getAll().forEach((cookie) =>
			redirectResponse.cookies.set(cookie),
		);
		return redirectResponse;
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
