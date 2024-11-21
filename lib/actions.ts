"use server"; // Enable server-side functionality

import { auth } from "@/auth"; // Custom authentication handler
import { parseServerActionResponse } from "./utils"; // Utility for parsing responses
import slugify from "slugify"; // Generates URL-friendly slugs
import { writeClient } from "@/sanity/lib/write-client"; // Sanity client for creating documents


/**
 * Creates a new startup pitch entry in the database.
 * This file contains server-side functions for performing actions like creating a pitch (startup). It uses the auth function to verify the user's session and interacts with Sanity CMS to store data.
 * @param {any} state - The current state of the form submission process.
 * @param {FormData} form - The form data containing the startup details excluding the pitch.
 * @param {string} pitch - The pitch content for the startup.
 * @returns {Promise<any>} A promise that resolves to the response of the server action, 
 *                         indicating success or error status.
 *
 * This function authenticates the user and then extracts the title, description,
 * category, and link from the form data. It generates a slug from the title and 
 * constructs a startup object, which is then saved to the database. If the user is 
 * not authenticated, an error response is returned. Any errors during the creation 
 * process are caught and logged, and an error response is returned.
 */
// Create a new startup pitch
export const createPitch = async (state: any, form: FormData, pitch: string) => {
    // Authenticate the user
    const session = await auth();
  
    // If user is not signed in, return an error response
    if (!session)
      return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR",
      });
  
    // Extract form fields (FormData) excluding "pitch"
    const { title, description, category, link } = Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "pitch") // Exclude "pitch" from form data
    );
  
    // Generate a slug from the title (URL-friendly identifier)
    const slug = slugify(title as string, { lower: true, strict: true });
  
    try {
      // Construct the startup object to be saved in Sanity
      const startup = {
        title,
        description,
        category,
        image: link,
        slug: {
          _type: "slug",
          current: slug, // Slug value
        },
        author: {
          _type: "reference",
          _ref: session?.id, // Reference to the authenticated user
        },
        pitch, // Content of the pitch
      };
  
      // Write the startup data to Sanity
      const result = await writeClient.create({ _type: "startup", ...startup });
  
      // Return a success response
      return parseServerActionResponse({
        ...result,
        error: "not signed in",
        status: "SUCCESS",
      });
    } catch (error) {
      console.log(error); // Log any errors
  
      // Return an error response
      return parseServerActionResponse({
        error: JSON.stringify(error), // Convert error object to JSON
        status: "ERROR",
      });
    }
  };