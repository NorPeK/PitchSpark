import type { Metadata } from "next"; // Metadata type for SEO
import localFont from "next/font/local"; // Utility for loading local fonts
import "./globals.css"; // Global CSS file
import "easymde/dist/easymde.min.css"; // CSS for a Markdown editor
import { Toaster } from "@/components/ui/toaster"; // Notification system

// Load WorkSans font family
const workSans = localFont({
  src: [
    {
      path: './fonts/WorkSans-Black.ttf',
      weight: '900',
      style: 'normal'
    },{
      path: './fonts/WorkSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },{
      path: './fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'normal'
    },{
      path: './fonts/WorkSans-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },{
      path: './fonts/WorkSans-Regular.ttf',
      weight: '500',
      style: 'normal'
    },{
      path: './fonts/WorkSans-Medium.ttf',
      weight: '400',
      style: 'normal'
    },{
      path: './fonts/WorkSans-Thin.ttf',
      weight: '300',
      style: 'normal'
    },{
      path: './fonts/WorkSans-Light.ttf',
      weight: '200',
      style: 'normal'
    },{
      path: './fonts/WorkSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal'
    }
  ],
  variable: '--font-work-sans',
})


// Metadata for the app (used for SEO)
export const metadata: Metadata = {
  title: "Pitch Spark", // Website title
  description: "Pitch, Vote and Spark", // Website description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
