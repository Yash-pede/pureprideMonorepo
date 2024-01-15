import { db } from "@repo/drizzle/db";
import { products } from "@repo/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  console.log("POST");
  try {
    const { id } = await req.json();
    const product = await db.select().from(products).where(eq(products.id, id));
    return NextResponse.json({ success: true, product: product[0] });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
