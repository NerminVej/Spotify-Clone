import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Song } from "@/types";

import getSongs from "./getSongs";

// Function to retrieve songs by title
const getSongsByTitle = async (title: string): Promise<Song[]> => {
  // Create a Supabase client instance
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // If no title is provided, retrieve all songs
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  // Retrieve songs data from the database based on the provided title
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  // If there is an error, log the error message
  if (error) {
    console.log(error.message);
  }

  // Return the retrieved data as an array or an empty array if no data is present
  return (data as any) || [];
};

export default getSongsByTitle;
