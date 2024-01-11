import { db } from "@repo/drizzle/db";
import { profiles, userRoles } from "@repo/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  console.log("GET");
  const users = await db.select().from(profiles);
  return NextResponse.json({ success: true, users });
};

export const DELETE = async (req: NextRequest) => {
  console.log("DELETE");
  try {
    const { id, actionType } = await req.json();
    if (actionType === "ban") {
      await db
        .update(profiles)
        .set({ userrole: userRoles.enumValues[3] })
        .where(eq(profiles.id, id));
      return NextResponse.json({ success: true, message: "User banned" });
    } else if (actionType === "delete") {
      await db.delete(profiles).where(eq(profiles.id, id));
      return NextResponse.json({ success: true, message: "User deleted" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
