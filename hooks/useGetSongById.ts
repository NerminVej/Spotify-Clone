import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return; // If no ID is provided, return early
    }

    setIsLoading(true); // Set loading state to true

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single(); // Fetch the song with the specified ID

      if (error) {
        setIsLoading(false); // Set loading state to false
        return toast.error(error.message); // Display an error toast message
      }

      setSong(data as Song); // Set the fetched song data
      setIsLoading(false); // Set loading state to false
    };

    fetchSong(); // Call the fetchSong function
  }, [id, supabaseClient]);

  // Use useMemo to memoize the returned object
  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useSongById;
