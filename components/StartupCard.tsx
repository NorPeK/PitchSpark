import { cn, formatDate } from "@/lib/utils";
// Utility functions:
// - `cn`: a utility for combining class names (e.g., `clsx`).
// - `formatDate`: Formats `_createdAt` into a user-friendly date string.

import { EyeIcon } from "lucide-react";
// Icon for showing the number of views.

import Link from "next/link";
// Next.js `Link` for client-side navigation.

import Image from "next/image";
// Next.js optimized image component.

import { Button } from "./ui/button";
// Button component for consistent styling and functionality.

import { Author, Startup } from "@/sanity/types";
// Import TypeScript types for `Author` and `Startup` from Sanity.

import { Skeleton } from "./ui/skeleton";
// Skeleton loader component for placeholders.

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author};
// Define a custom type `StartupTypeCard`:
// - Based on `Startup` but excludes (`Omit`) the `author` field.
// - Instead, it replaces the `author` field with an optional `Author` object.

/**
 * A card component to display a single startup's information.
 *
 * This component receives a `post` prop with the following properties:
 * - `_createdAt`: The date the startup was created.
 * - `views`: The number of times the startup has been viewed.
 * - `author`: The author of the startup.
 * - `title`: The title of the startup.
 * - `category`: The category of the startup.
 * - `_id`: The ID of the startup.
 * - `image`: The image of the startup.
 * - `description`: A short description of the startup.
 *
 * The component displays the startup's information in a card layout, with the
 * author's name and image, the startup's title and category, the number of views,
 * and a link to the startup's details page.
 */
const StartupCard = ({ post }: { post: StartupTypeCard }) => {

  const {_createdAt, views, author, title , category, _id , image, description} = post
  // Destructure the startup fields from the `post` prop:
// - `_createdAt`: The creation date of the startup.
// - `views`: The number of views the startup has.
// - `author`: The startup author's details (optional).
// - `title`: The title of the startup.
// - `category`: The startup's category.
// - `_id`: The unique identifier for the startup.
// - `image`: URL for the startup's thumbnail or main image.
// - `description`: The startup's description.

  return (
    <li className="startup-card group">
        <div className="flex-between">
            <p className="startup_card_date">
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary"/>
                <span className="text-16-medium">{views}</span>
            </div>
        </div>

        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}`}>
                    <p className="text-16-medium line-clamp-1">
                        {author?.name}
                    </p>
                </Link>

                <Link href={`/startup/${_id}`}>
                    <h3 className="text-26-semibold line-clamp-1">
                        {title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src={author?.image!} alt={author?.name!} width={48} height={48} className="rounded-full" />
            </Link>
        </div>

        <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">
                {description}
            </p>

            <img src={image} alt="placeholder" className="startup-card_img"/>
        </Link>

        <div className="flex-between gap-3 mt-5">
            <Link href={`/query=${category?.toLowerCase()}`}>
                <p className="text-16-medium">{category}</p>
            </Link>
            <Button className="startup-card_btn" asChild>
                <Link href={`startup/${_id}`}>
                    Details
                </Link>
            </Button>

        </div>
    </li>
  )
};

/**
 * A skeleton component for rendering a list of startup cards while data is being fetched.
 * Displays 5 cards with a skeleton animation.
 */
export const StartupCardSkeleton = () => (
    <>
        {[0,1,2,3,4].map((index: number) => (
            <li key={cn('skeleton', index)}>
                <Skeleton className="startup-card_skeleton"/>
            </li>
        ))}
    </>
)

export default StartupCard