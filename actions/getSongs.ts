import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

// Function to retrieve songs
const getSongs = async (): Promise<Song[]> => {
  // Create a Supabase client instance
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Retrieve songs data from the database
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  // If there is an error, log the error message
  if (error) {
    console.log(error.message);
  }

  // Return the retrieved data as an array or an empty array if no data is present
  return (data as any) || [];
};

export default getSongs;
