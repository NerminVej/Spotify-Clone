import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return ""; // If no song is provided, return an empty string
  }

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path); // Get the public URL of the song from the Supabase storage

  return songData.publicUrl; // Return the public URL of the song
};

export default useLoadSongUrl;
