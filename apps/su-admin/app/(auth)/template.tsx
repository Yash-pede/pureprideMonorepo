import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface TemplateProps {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<TemplateProps> = ({ children }) => {
  const cookieStore = cookies();
  const supabse_auth = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_NAME;
  const user = cookieStore.has("sb-" + supabse_auth + "-auth-token");
  if (user) {
    redirect("/dashboard");
  } else {
    return (
      <div className="flex justify-center items-start md:items-center m-3 mt-[22%] md:mt-0 h-screen">
        <div className="w-full sm:w-96">{children} </div>
      </div>
    );
  }
};

export default AuthTemplate;
