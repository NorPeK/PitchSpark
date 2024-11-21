import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names into a single string.
 * Utilizes `clsx` to conditionally join class names,
 * and `twMerge` to handle Tailwind-specific merging.
 * 
 * @param inputs - A list of class values that can be strings,
 * arrays, or objects representing class names.
 * @returns A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/**
 * Formats a date string into a localized string
 * representing the date in the format: "Month Day, Year"
 *
 * @param date - The date string to format
 * @returns The formatted date string
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Takes a response from a Next.js server action and
 * returns a new value with any Date objects converted
 * to strings. This is necessary because when a server
 * action returns a response with a Date object, Next.js
 * will convert it to a string, but the client-side code
 * will receive a Date object. This utility ensures that
 * the client-side code receives a string.
 *
 * @param response - The response from the server action
 * @returns The response with any Date objects converted to strings
 */
export function parseServerActionResponse<T>(response:T) {
  return JSON.parse(JSON.stringify(response));
}
