import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

// Function to retrieve songs by user ID
const getSongsByUserId = async (): Promise<Song[]> => {
  // Create a Supabase client instance
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Retrieve the session data from Supabase authentication
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  // If there is an error retrieving the session, log the error message and return an empty array
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  // Retrieve songs data from the database based on the user ID in the session data
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  // If there is an error, log the error message
  if (error) {
    console.log(error.message);
  }

  // Return the retrieved data as an array or an empty array if no data is present
  return (data as any) || [];
};

export default getSongsByUserId;
