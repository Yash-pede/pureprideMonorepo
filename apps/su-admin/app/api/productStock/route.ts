import { db } from "@repo/drizzle/db";
import { productBatches } from "@repo/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  console.log("GET");
  try {
    const allProducts = await db.select().from(productBatches);
    return NextResponse.json({ success: true, allProducts });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      success: false,
      message: err,
    });
  }
};
export const POST = async (req: NextRequest) => {
  console.log("POST");
  try {
    const { id, batchNo, quantity, expiryDate } = await req.json();
    console.log(id);  
    const product = await db.insert(productBatches).values({
     productId: id,
      batchNo: batchNo,
      expiryDate: expiryDate,
      quantity: quantity,
    });
    return NextResponse.json({ success: true, product: product });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      success: false,
      message: err,
    });
  }
};
