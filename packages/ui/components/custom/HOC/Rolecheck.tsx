"use client";
import { userRoles } from "@repo/drizzle/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function Rolecheck(Component: React.ComponentType<any>) {
  return async function Rolecheck(props: any) {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const { data:{user}, error } = await supabase.auth.getUser();
    const userId = user?.id
    const { data: role } = await supabase.from("profiles").select("userrole").eq("id", userId);
    if (role && role[0].userrole === userRoles.enumValues[0]) {
      return <Component {...props} />;
    } else {
      router.push("/auth");
    }
  };
}
