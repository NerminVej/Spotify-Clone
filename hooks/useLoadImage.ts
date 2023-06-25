import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null; // If no song is provided, return null
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path); // Get the public URL of the song's image from the Supabase storage

  return imageData.publicUrl; // Return the public URL of the image
};

export default useLoadImage;
