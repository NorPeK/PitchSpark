/*
This dynamic route fetches and displays details about a specific "startup." It uses the id parameter for data fetching.
*/


import { formatDate } from "@/lib/utils"; // Utility to format dates
import { client } from "@/sanity/lib/client"; // Sanity client for data fetching
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"; // Sanity queries
import { notFound } from "next/navigation"; // Handles 404 pages
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it"; // Markdown rendering library
import { Suspense } from "react"; // React's suspense for lazy-loading components
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader for fallback UI
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

// Initialize Markdown renderer
const md = markdownit();

// Experimental Next.js feature flag
export const experimental_ppr = true;

/**
 * Page to display a specific startup's details.
 *
 * @param {Object} params
 * @param {string} params.id - The id of the startup to display.
 *
 * @returns {JSX.Element} A JSX element containing the startup's details.
 */
// Dynamic page component (server-side rendering)
const page = async ({ params }: { params: { id: string } }) => {
    // Extract ID from route parameters
    const id = params.id;
  
    // Fetch startup details and editor's picks concurrently
    const [post, { select: editorPosts }] = await Promise.all([
      client.fetch(STARTUP_BY_ID_QUERY, { id }), // Fetch startup details
      client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editors-picks" }), // Fetch editor's picks
    ]);
  
    // Show 404 page if no startup is found
    if (!post) return notFound();
  
    // Parse pitch content as HTML
    const parsedContent = md.render(post?.pitch || "");

    return (
        <>
          {/* Header section */}
          <section className="pink_container !min-h-[230px]">
            <p className="tag">{formatDate(post?._createdAt)}</p>
            <h1 className="heading">{post.title}</h1>
            <p className="sub-heading !max-w-5xl">{post.description}</p>
          </section>
    
          {/* Startup details */}
          <section className="section_container">
            <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
            
            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
              <div className="flex-between gap-5">
                {/* Author details */}
                <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                  <Image src={post.author.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />
                  <div>
                    <p className="text-20-medium">{post.author.name}</p>
                    <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                  </div>
                </Link>
                <p className="category-tag">{post.category}</p>
              </div>
    
              {/* Render parsed pitch content */}
              <h3 className="text-30-bold">Pitch Details</h3>
              {parsedContent ? (
                <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }} />
              ) : (
                <p className="no-result">No details provided</p>
              )}
            </div>
            <hr className="divider" />
    
            {/* Editor's Picks */}
            {editorPosts?.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <p className="text-30-semibold">Editor Picks</p>
                <ul className="mt-7 card_grid-sm">
                  {editorPosts.map((post: StartupTypeCard, i: number) => (
                    <StartupCard key={i} post={post} />
                  ))}
                </ul>
              </div>
            )}
    
            {/* View component with lazy-loading */}
            <Suspense fallback={<Skeleton className="view_skeleton" />}>
              <View id={id} />
            </Suspense>
          </section>
        </>
      );
}

export default page