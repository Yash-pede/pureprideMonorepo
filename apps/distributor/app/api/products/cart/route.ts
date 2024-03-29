import { db } from "@repo/drizzle/db";
import { cart } from "@repo/drizzle/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export const GET = async () => {
  console.log("GET");
  try {
    const supabase = createServerComponentClient({ cookies: cookies });
    const user = String((await supabase.auth.getUser()).data.user?.id);
    const cartItems = await db.select().from(cart).where(eq(cart.userId, user));
    return NextResponse.json({ success: true, cartItems });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const POST = async (req: Request) => {
  console.log("POST");
  try {
    const { product, quantity, user } = await req.json();
    // console.log(user, quantity);
    if (quantity == 0 || quantity < 0) {
      return NextResponse.json({
        success: false,
        message: "Quantity cannot be zero",
      });
    }
    await db
      .insert(cart)
      .values({ userId: user, productId: product, quantity })
      .returning();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const DELETE = async (req: Request) => {
  console.log("DELETE");
  try {
    const { userId, productId } = await req.json();
    console.log(userId, productId);
    await db
      .delete(cart)
      .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
    return NextResponse.json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
