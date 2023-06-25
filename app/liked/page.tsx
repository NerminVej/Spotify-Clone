import Image from "next/image";

import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";

import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  // Fetch the liked songs
  const songs = await getLikedSongs();

  // Render the liked songs page
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header>
        <div className="mt-20">
          <div
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
          >
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              {/* Render the playlist image */}
              <Image
                className="object-cover"
                fill
                src="/images/liked.png"
                alt="Playlist"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              {/* Render the playlist label */}
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              {/* Render the playlist title */}
              <h1
                className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      {/* Render the liked songs content */}
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
