"use client";
import React, { useEffect, useState } from "react";
import ThemeSwitcher from "./utils/ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@repo/shared/images";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
const NavbarSite = () => {
  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: userSession, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user session:", error);
        return;
      }

      setUser(userSession?.session?.user || null);
    };

    checkUserSession();
  }, [supabase.auth]);

  return (
    <nav className="flex px-2 w-full items-center justify-between py-2 md:py-4 border-b-[1px] dark:border-b-slate-700/40 ">
      <Link href={"/"}>
        <Image src={logo} width={130} height={130} alt="purepride Logo" />
      </Link>
      <section className="flex justify-center gap-4 items-center mx-3">
        <ThemeSwitcher />
        <div className="flex space-x-7">
          {user ? (
            <>
              <Button
                variant="btn-primary"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => {
                  router.replace("/auth");
                }}
              >
                SignUp
              </Button>
              <Button
                variant="btn-primary"
                onClick={() => {
                  router.replace("/auth");
                }}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </section>
    </nav>
  );
};

export default NavbarSite;
