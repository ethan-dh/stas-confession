"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseServer = async () => {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name) => (await cookieStore.get(name))?.value,
      set: async (name, value, options) =>
        cookieStore.set(name, value, options),
      remove: async (name, options) => cookieStore.set(name, "", options),
    },
  });
};
