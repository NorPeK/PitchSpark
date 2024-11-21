/**
 * Page to submit a new startup.
 *
 * If the user is not signed in, redirects to the root page.
 *
 * @returns A JSX element containing a pink container with a heading and a StartupForm component.
 */


import { auth } from "@/auth"; // Custom authentication function
import StartupForm from "@/components/StartupForm"; // Form component for creating startups
import { redirect } from "next/navigation"; // Utility to handle redirections

// Asynchronous page component (server-side rendering)
const page = async () => {
  // Authenticate the user
  const session = await auth();

  // Redirect to homepage if the user is not authenticated
  if (!session) redirect("/");

  return (
    <>
      {/* Section for the page header */}
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      {/* Render the form for submitting a startup */}
      <StartupForm />
    </>
  );
};

export default page; // Export the page component
