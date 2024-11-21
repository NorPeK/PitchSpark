# Pitch Spark

Visit the live application here: [Pitch Spark](https://pitch-spark-tau.vercel.app/)

---

## About the Application

Pitch Spark is an interactive platform for entrepreneurs and innovators to pitch their startup ideas, gain visibility, and connect with others. Users can submit their ideas, vote on others’ pitches, and participate in a collaborative ecosystem designed to spark innovation.

---

## Key Features

- **Submit detailed startup pitches**: Includes titles, descriptions, categories, and markdown-supported content.
- **Browse all startups**: Search by query and filter by categories.
- **View individual startup pages**: Pitch details, author profiles, and editor picks.
- **Dynamic user profiles**: Showcasing startups created by individual users.
- **Polished UI**: Responsive layouts, markdown editing, and real-time updates.

---

## Technology Stack

### Frontend Framework
**React 19**:  
We’ve utilized the latest features of React, including:
- **React Server Components (RSC)**: For improved server-side rendering.
- **Enhanced React Suspense**: Lazy-loading components like skeleton loaders.
- **Concurrent Features**: Seamless user experience during intensive data fetching.

### Backend Framework
**Next.js 15**:  
Built with the App Router to enable server-side rendering and file-based routing. Key features include:
- **App Router**: Organizing pages, layouts, and dynamic routes efficiently.
- **Partial-Pre Rendering (PPR)**: Faster page loads by progressively rendering content.
- **useActionState**: Server-side form handling and state management in client components.
- **Middleware and Dynamic Routing**: Dynamic routes like `/user/[id]` and `/startup/[id]` power the app.

### CMS and Database
**Sanity CMS**:  
Manages and fetches startup and user data dynamically. Sanity’s GROQ (Graph-Relational Object Queries) enables flexible querying of structured content.

### Styling and UI
**Tailwind CSS**:  
For responsive and modern UI designs, ensuring a consistent look across all devices.

- **Custom UI Components**: Built reusable components like `Input`, `Textarea`, `Button`, and more for consistent styling and functionality.

### Markdown Support
**MDEditor (@uiw/react-md-editor)**:  
Provides a powerful markdown editor for users to draft their startup pitches with live previews.

---

## Utilities and Enhancements

- **Zod**: Schema-based form validation and error handling.
- **Lucide Icons**: Clean and customizable icons for UI enhancements (e.g., EyeIcon, Send).
- **Toast Notifications**: Feedback mechanism for actions like form submission, success, and error handling.

### Hosting
**Vercel**:  
Deployed on Vercel for fast and reliable performance with CI/CD integration.

---

## New Features of React 19 and Next.js 15 Used

### React 19
- **Server Components**: Reduced client-side JavaScript payload, improving performance.
- **React Suspense**: Lazy-loading user startups and displaying skeleton loaders during data fetching.

### Next.js 15
- **App Router**: Layouts, server components, and dynamic routes.
- **useActionState**: Server-side form submissions with robust error handling.
- **Progressive Rendering**: Faster content delivery on critical pages.
- **Dynamic Metadata**: SEO optimization based on fetched data.

---

## Features

- **Startup Submission**: Users can create startups with markdown-supported content and a custom image.
- **Real-Time Updates**: Automatically sync changes with Sanity CMS using real-time listeners.
- **User Profiles**: Displays user information, bio, and startups they've created.
- **Search and Filter**: Search startups by title, category, or author with dynamic query handling.
- **Dynamic Routing**: Routes like `/startup/[id]` and `/user/[id]` efficiently manage pages.
- **Responsive Design**: Built with mobile-first principles using Tailwind CSS.

---


## Acknowledgments

A special thanks to **JS Mastery** for their guidance and tutorials, which were instrumental in the creation of this application.

Feel free to contribute or provide feedback. Let’s innovate together with **Pitch Spark**!
