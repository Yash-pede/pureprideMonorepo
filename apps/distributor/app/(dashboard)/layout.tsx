import React from "react";
import { Navbar, Sidebar } from "@repo/ui/components";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userRoles } from "@repo/drizzle/schema";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  try {
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const userEmail = (await supabase.auth.getUser()).data.user?.email;
    const { data: role } = await supabase
      .from("profiles")
      .select("userrole")
      .eq("email", userEmail);
    if (!(role && role[0]?.userrole === userRoles.enumValues[2])) {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    redirect("/auth");
  }
  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar appName="distributor"/>
      </div>

      <div className="flex-1 overflow-auto dark:border-neutral-700/70 border-l-[1px] w-full relative">
        <Navbar  appName="distributor"/>
        <main className="p-3">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
