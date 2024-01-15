import { db } from "@repo/drizzle/db";
import { productBatches } from "@repo/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET");
  try {
    const stocks = await db.select().from(productBatches);
    return NextResponse.json({ success: true, stocks });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}
