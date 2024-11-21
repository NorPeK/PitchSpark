import NextAuth from "next-auth"; // Import NextAuth for authentication configuration
import GitHub from "next-auth/providers/github"; // GitHub provider for OAuth login
import { client } from "./sanity/lib/client"; // Sanity client for fetching data (read operations)
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"; // Query to fetch an author by their GitHub ID
import { writeClient } from "./sanity/lib/write-client"; // Sanity client for writing data (create operations)
 


// Exporting NextAuth handlers, sign-in, sign-out, and auth functionalities
/*
handlers: Manages the server-side API routes (/api/auth/*).
signIn: Handles the sign-in flow.
signOut: Handles the sign-out flow.
auth: A helper function to access authentication status.
*/
export const { handlers, signIn, signOut, auth } = NextAuth({
   // Define authentication providers
  providers: [GitHub], // Enables GitHub login for users
  callbacks: {
/**
 * Callback function for signing in a user with GitHub.
 * 
 * This function checks if the user already exists in the database by querying with
 * the GitHub ID. If the user does not exist, it creates a new author document in the
 * Sanity database with the user's GitHub profile information.
 * 
 * @param user.name - The name of the GitHub user.
 * @param user.email - The email of the GitHub user.
 * @param user.image - The profile image URL of the GitHub user.
 * @param profile.id - The GitHub ID of the user.
 * @param profile.login - The GitHub username of the user.
 * @param profile.bio - The bio of the GitHub user, defaults to an empty string if not provided.
 * 
 * @returns {Promise<boolean>} - Returns a promise that resolves to true once the sign-in process is complete.
 */
    async signIn({user: {name , email, image} , profile:{id, login, bio}}) {
      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id})
      // If the user doesn't exist, create a new `author` document in Sanity
      if(!existingUser) {
        await writeClient.create( {
          _type: 'author',
          id: id,
          name: name,
          username: login,
          email: email,
          image: image,
          bio: bio || "",
        });
      }
      return true; // Return true to indicate successful sign-in
    },

    /**
     * Callback function for creating or updating a JSON Web Token (JWT) for a user after
     * signing in with GitHub.
     * 
     * This function adds the author ID to the JWT after a successful sign-in. The author ID
     * is obtained by querying the Sanity database with the GitHub ID.
     * 
     * @param {Object} token - The JWT to be updated.
     * @param {Object} account - The GitHub account information.
     * @param {Object} profile - The GitHub user profile information.
     * 
     * @returns {Promise<Object>} - Returns a promise that resolves to the updated JWT.
     */
    async jwt({token, account, profile}) {
      if(account && profile) {
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

        token.id = user?._id;
      }
      return token;
    },

    /**
     * Callback function for updating the session object after authentication.
     * 
     * This function adds the `id` property from the JWT to the session object.
     * 
     * @param {Object} session - The session object to be updated.
     * @param {Object} token - The JWT to get the author ID from.
     * 
     * @returns {Promise<Object>} - Returns a promise that resolves to the updated session object.
     */
    async session ({session, token}) {
      // Add the Sanity `_id` (from the token) to the session object
      Object.assign(session, {id:token.id});
      return session; // Return the updated session
    }
    
  }
})