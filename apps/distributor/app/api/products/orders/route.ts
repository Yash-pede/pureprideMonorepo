import { db } from "@repo/drizzle/db";
import { cart, orders } from "@repo/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  console.log("POST");
  try {
    const { userId } = await req.json();
    const responseCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId));
    const responseOrders = await db.insert(orders).values(responseCart);
    await db.delete(cart).where(eq(cart.userId, userId));
    return NextResponse.json({ success: true, responseOrders });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
