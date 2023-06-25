import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Function to retrieve liked songs
const getLikedSongs = async (): Promise<Song[]> => {
  // Create a Supabase client instance
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Get the user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Retrieve liked songs data from the database
  const { data } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  // If no data is returned, return an empty array
  if (!data) return [];

  // Map the retrieved data to the Song type
  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
