import { db } from "@repo/drizzle/db";
import { profiles, userRoles } from "@repo/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  const result = await db
    .select()
    .from(profiles)
    .where(eq(profiles.email, email));

  console.log(result[0].userrole);
  if (result[0].userrole !== userRoles.enumValues[0]) {
    return NextResponse.json({
      success: false,
      message: "You are not a SuperAdmin",
    });
  } else {
    return NextResponse.json({
      success: true,
      message: "Welcome, you are logged in as SuperAdmin",
    });
  }
};
