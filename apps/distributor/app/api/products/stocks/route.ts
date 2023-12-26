import { db } from "@repo/drizzle/db";
import { productBatches } from "@repo/drizzle/schema";
import { NextResponse } from "next/server";

interface GroupedStocks {
  [productId: string]: {
    quantity: number;
  };
}

export async function GET() {
  console.log("GET");
  try {
    const stocks = await db.select().from(productBatches);

    // Grouping by productId and summing up quantities
    const groupedStocks: GroupedStocks = stocks.reduce((acc, item) => {
      const { productId, quantity } = item;

      if (productId) {
        return {
          ...acc,
          [productId]: {
            quantity: (acc[productId]?.quantity ?? 0) + (quantity ?? 0),
          },
        };
      }

      return acc;
    }, {} as GroupedStocks);

    // Converting the result to an array
    const finalStocks = Object.keys(groupedStocks || {}).map((productId) => ({
      productId,
      quantity: groupedStocks[productId]?.quantity ?? 0,
    }));

    return NextResponse.json({ success: true, stocks: finalStocks });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
