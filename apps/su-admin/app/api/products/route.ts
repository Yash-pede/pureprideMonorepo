import { db } from "@repo/drizzle/db";
import { products } from "@repo/drizzle/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
    console.log("GET");
    const allProducts = await db.select().from(products);
    return NextResponse.json({ success: true, allProducts });
  };
  