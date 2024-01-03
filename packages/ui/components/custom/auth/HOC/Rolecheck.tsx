"use client";
import React from "react";
import { userRoles } from "@repo/drizzle/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function RolecheckSuAdmin(Component: React.ComponentType<any>) {
  return async function Rolecheck(props: any) {
    try {
      const supabase = createClientComponentClient();
      const router = useRouter();
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        // Handle user authentication error or user not found
        return <div className="">You are not authenticated.</div>;
      }

      const userId = user.id;

      const { data: role, error: roleError } = await supabase
        .from("profiles")
        .select("userrole")
        .eq("id", userId);

      if (roleError || !role || role.length === 0) {
        // Handle role fetch error or no roles found
        return <div className="">You are not authorized to view this page.</div>;
      }

      const userRole = role[0]?.userrole; // Access userrole property with nullish coalescing

      if (userRole === userRoles.enumValues[0]) {
        console.log(userRole);
        console.log(userRoles.enumValues[0]);
        return <Component {...props} />;
      } else {
        return <div className="">You are not authorized to view this page.</div>;
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error:", error);
      return <div className="">An unexpected error occurred.</div>;
    }
  };
}
