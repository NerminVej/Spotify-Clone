import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  // Initialize useRouter and useUser hooks
  const router = useRouter();
  const { isLoading, user } = useUser();

  // Initialize useOnPlay hook
  const onPlay = useOnPlay(songs);

  // Redirect to homepage if user is not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  // Render "No liked songs" message if there are no songs
  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No liked songs.
      </div>
    );
  }

  // Render the liked songs list
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
