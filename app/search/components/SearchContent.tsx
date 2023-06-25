"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    // Render message when no songs are found
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song: Song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            {/* Render media item for each song */}
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          {/* Render like button for each song */}
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
