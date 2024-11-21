import { auth } from "@/auth";
// Import the `auth` function to retrieve the current user's session.

import { client } from "@/sanity/lib/client";
// Import the Sanity client to fetch user data from the CMS.

import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
// Import the GROQ query to fetch an author (user) by their Sanity ID.

import { notFound } from "next/navigation";
// Utility from Next.js to render a 404 page if no user is found.

import Image from "next/image";
// Import Next.js's optimized Image component for displaying user profile pictures.

import UserStartups from "@/components/UserStartups";
// Import the `UserStartups` component, which fetches and renders a list of startups created by the user.

import { Suspense } from "react";
// React's Suspense API for lazy-loading components.

import { StartupCardSkeleton } from "@/components/StartupCard";
// Skeleton placeholder UI while the user's startups are being fetched.

export const experimental_ppr = true;
// Enable experimental PPR (Progressive Rendering) for server-side rendering optimizations.

/**
 * Dynamic user profile page for `/user/:id` route.
 * Fetches user details from Sanity CMS based on the dynamic `id` route parameter
 * and displays the user's profile information and their startups.
 */
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Extract the `id` parameter from the route (e.g., `/user/:id`).
  const id = (await params).id;

  // Fetch the session to determine the currently logged-in user.
  const session = await auth();

  // Fetch the user data from Sanity CMS using the `AUTHOR_BY_ID_QUERY` query.
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  // If no user is found in the CMS, render a 404 page.
  if (!user) return notFound();

  return (
    <>
      {/* Profile Section */}
      <section className="profile_container">
        {/* Profile Card */}
        <div className="profile_card">
          {/* User's Name */}
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          {/* User's Profile Picture */}
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          {/* User's Username */}
          <p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>

          {/* User's Bio */}
          <p className="mt-1 text-center text-14-normal">
            {user?.bio ? `@${user?.bio}` : "No bio available"}
          </p>
        </div>

        {/* User's Startups Section */}
        <div className="flex-1 flex flex-col gap-5 lg:-m5-5">
          {/* Section Heading */}
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
            {/* If the logged-in user's ID matches the profile ID, show "Your Startups".
                Otherwise, show "All Startups". */}
          </p>

          {/* List of Startups */}
          <ul className="card_grid-sm">
            {/* Use Suspense for lazy-loading the user's startups */}
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
              {/* Render the `UserStartups` component to display the user's startups.
                  Pass the user's ID (`id`) as a prop to fetch their startups. */}
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
// Export the `page` component as the default export.
