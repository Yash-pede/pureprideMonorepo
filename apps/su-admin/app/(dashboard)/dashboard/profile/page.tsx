import { ProfilePage } from "@repo/ui/components";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Profile = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: user } = await supabase.auth.getUser();
  return <ProfilePage user={user} />;
};

export default Profile;
