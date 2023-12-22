import { NavbarSite } from "@repo/ui/components";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MainSite = async () => {
  const cookieStore = cookies();
  const supabse_auth = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_NAME;
  const user = cookieStore.has("sb-" + supabse_auth + "-auth-token");
  if (user) {
    redirect("/dashboard");
  } else {
    return (
      <main>
        <NavbarSite />
        <section>
          <h1 className="text-3xl font-bold text-center mx-auto ">
            This will be our main website page
          </h1>
        </section>
      </main>
    );
  }
};

export default MainSite;
