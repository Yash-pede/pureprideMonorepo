import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabaseServer = createServerComponentClient({ cookies: cookies });
const supabaseClient = createClientComponentClient();

export{
    supabaseClient,supabaseServer
}