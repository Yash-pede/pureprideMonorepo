"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClientComponentClient({
    supabaseKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
  });
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  });

  return (
    <div>
      {user?.last_sign_in_at || null}
      <pre>
        <code>{JSON.stringify({ user }, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Profile;
