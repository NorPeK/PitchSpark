import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
// Import the StartupCard component to display individual startups.
// StartupTypeCard is a TypeScript type used to enforce the shape of each startup's data.

import SearchForm from "../../components/SearchForm";
// Import the SearchForm component, which allows users to search for startups.

import { STARTUPS_QUERY } from "@/sanity/lib/queries";
// Import the GROQ query to fetch startup data from Sanity CMS.

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// Import `sanityFetch`, a custom utility for fetching data from Sanity.
// `SanityLive` is a component to enable real-time updates for the page.

import { auth } from "@/auth";
// Import the `auth` function to fetch the current user's session information.

  /**
   * This is the default export for the Home page. It's an asynchronous function because it fetches data.
   * `searchParams` is a dynamic parameter that contains the query string passed to the page.
   *
   * The function fetches startup data from Sanity CMS, filters it based on the search query,
   * and renders a list of `StartupCard` components. It also renders a search form and a "No results" message
   * if no startups are found. Finally, it enables real-time updates for the page using the `SanityLive` component.
   *
   * @param {Object} searchParams - A dynamic parameter that contains the query string passed to the page.
   * @param {string} searchParams.query - The search query to filter startups. If no query is provided, set `search` to `null`.
   * @returns {JSX.Element} A JSX element containing the search form, list of startups, and Sanity Live component.
   */
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  // This is the default export for the Home page. It's an asynchronous function because it fetches data.
  // `searchParams` is a dynamic parameter that contains the query string passed to the page.

  const query = (await searchParams).query;
  // Extract the `query` parameter from the `searchParams` object. It will be used to filter startups.

  const params = { search: query || null };
  // Prepare the parameters for the GROQ query. If no `query` is provided, set `search` to `null`.

  const session = await auth();
  // Fetch the user's session to determine if the user is logged in.
  // This can be useful if you want to customize the UI or restrict access based on authentication.

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  // Use `sanityFetch` to fetch startup data from Sanity CMS using the `STARTUPS_QUERY` query.
  // Pass the `params` object to include the search query.

  return (
    <>
      {/* Hero Section */}
      <section className="pink_container">
        {/* Main heading */}
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          And Spark with Everyone!
        </h1>

        {/* Subheading */}
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, And Get a Notice in Virtual Competitions.
        </p>

        {/* Search form */}
        <SearchForm query={query} />
        {/* Render the SearchForm component with the current query as a prop. */}
      </section>

      {/* Startups Section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {/* Show dynamic heading based on whether there is a search query */}
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        {/* List of Startup Cards */}
        <ul className="mt-7 card_grid">
          {/* Check if there are any startups to display */}
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
              // Map over the `posts` array and render a `StartupCard` for each startup.
              // Use `post?._id` as the unique key for each card.
            ))
          ) : (
            <p className="no-results">No startups found</p>
            // Display a "No results" message if no startups are available.
          )}
        </ul>
      </section>

      {/* Sanity Live Component */}
      <SanityLive />
      {/* Enables real-time updates for the page by subscribing to changes in Sanity CMS */}
    </>
  );
}
