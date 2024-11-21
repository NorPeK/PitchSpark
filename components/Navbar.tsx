import React from "react";
import Link from "next/link"; // Next.js Link for client-side navigation
import Image from "next/image"; // Next.js Image for optimized image rendering
import { auth, signOut, signIn } from "@/auth"; // Authentication functions
import { BadgePlus, LogOut } from "lucide-react"; // Icons for UI
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // Avatar UI components

/**
 * The Navbar component is the navigation bar for the app. It dynamically adjusts based on the user’s authentication state (session), offering login, logout, and profile links.
 * The Navbar component renders a navigation bar with a logo, "Create" button, logout button if a user is signed in, and a link to the user's profile page if a user is signed in.
 *
 * 
 * The "use server" directive is used in Next.js to explicitly mark a function or block as a server action. Server actions are an experimental feature in Next.js that allows you to execute server-side logic directly within components or forms in the application.
 * 
 * @returns A JSX element containing the navigation bar.
 */

// Async function because we are fetching session data
const Navbar = async () => {
  const session = await auth()  // Fetch the current session (user authentication state)

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/pitchspark.png" alt="logo" width={60} height={15} />
        </Link>

        {/* Navigation actions */}
        <div className="flex items-center gap-5 text-black">
          {/* This construct checks: If there is a valid session object (session &&).
          If the session object contains a valid user property (session?.user).*/}
          {session && session?.user ? (
            <>
              {/* "Create Startup" link */}
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden text-red-500" />
              </Link>

              {/* Logout button */}
              <form
                action={async () => {
                  "use server"; // Mark this form as a server action
                  await signOut({ redirectTo: "/" }); // Sign out and redirect to home
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              {/* Link to user profile */}
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-12">
                  <AvatarImage
                    src={session?.user?.image || ""} // User's profile image
                    alt={session?.user?.name || ""} // Fallback alt text
                  />
                  <AvatarFallback>AV</AvatarFallback> {/* Fallback avatar text */}
                </Avatar>
              </Link>
            </>
          ) : (
            // If user is not logged in, show login button
            <form
              action={async () => {
                "use server"; // Mark this form as a server action
                await signIn("github"); // Sign in via GitHub
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar