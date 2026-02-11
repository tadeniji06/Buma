import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
	projectId: "28xmzroq",
	dataset: "production",
	useCdn: false, // Ensure fresh data
	apiVersion: "2023-05-03",
	token: process.env.SANITY_API_TOKEN || "skkGHfDXyGrsuY5YYrJHPG3TSPsgjzgfsHVNPelDHQ5rZXgpHlbbOD2bSnAkwiaPKoikmYMMFrLtR2w8dUNmLzRRpmRZmhEelF7IfkAIudLeX11p9iUerRgFstpvjJemkint4lDr2JuAytwQXiq4LMjYiKjxqybxFP3oHiy3mkCpDUAprVv0",
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json(
			{ error: "Missing id" },
			{ status: 400 },
		);
	}

	try {
		const query = `*[_id == $id][0] { views, reactions }`;
		const data = await client.fetch(query, { id });

		return NextResponse.json({
			views: data?.views || 0,
			reactions: data?.reactions || 0,
		});
	} catch (error) {
		console.error("Error fetching stats:", error);
		return NextResponse.json({ views: 0, reactions: 0 });
	}
}

export async function POST(request: Request) {
	const body = await request.json();
	const { id, type } = body;

	if (!id || !type) {
		return NextResponse.json(
			{ error: "Missing id or type" },
			{ status: 400 },
		);
	}

	if (!process.env.SANITY_API_TOKEN) {
		console.warn("Skipping stats update: SANITY_API_TOKEN not found");
		// Return mock success to keep UI responsive
		return NextResponse.json(
			{ message: "No Sanity token configured" },
			{ status: 200 },
		);
	}

	try {
		if (type === "view") {
			await client
				.patch(id)
				.setIfMissing({ views: 0 })
				.inc({ views: 1 })
				.commit();
		} else if (type === "reaction") {
			await client
				.patch(id)
				.setIfMissing({ reactions: 0 })
				.inc({ reactions: 1 })
				.commit();
		} else if (type === "remove-reaction") {
			await client
				.patch(id)
				.setIfMissing({ reactions: 0 })
				.dec({ reactions: 1 })
				.commit();
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Sanity patch error:", error);
		return NextResponse.json(
			{ error: "Failed to update stats" },
			{ status: 500 },
		);
	}
}
