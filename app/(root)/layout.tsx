import Navbar from "../../components/Navbar";
// Import the `Navbar` component, which provides navigation functionality for the app.

/**
 * The Layout component wraps all pages and provides a consistent layout.
 *
 * The component is responsible for rendering the Navbar component at the top of every page.
 * The `children` prop is automatically passed by Next.js for all nested routes or pages.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    // The Layout component receives `children` as a prop, which represents the page content.
    // The `children` prop is automatically passed by Next.js for all nested routes or pages.

    return (
        <main className="font-work-sans">
            {/* Set the main font for the app to Work Sans */}
            
            <Navbar />
            {/* Render the Navbar component at the top of every page */}
            
            {children}
            {/* Render the page-specific content (passed as `children`) below the Navbar */}
        </main>
    );
}
