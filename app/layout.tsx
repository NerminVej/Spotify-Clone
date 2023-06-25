import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

// Set font with Figtree
const font = Figtree({ subsets: ["latin"] });

// Metadata for the page
export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrieve user's songs by user ID
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        {/* Providers */}
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            {/* Sidebar */}
            <Sidebar songs={userSongs}>{children}</Sidebar>

            {/* Player */}
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
