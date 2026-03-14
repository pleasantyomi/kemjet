import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseClient();

    // Fetch news items ordered by published_at (newest first)
    const { data, error } = await supabase
      .from("news")
      .select(
        "id, title, excerpt, content, image_url, published_at, created_at",
      )
      .order("published_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
