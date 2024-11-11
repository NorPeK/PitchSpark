import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const workSans = localFont({
  src: [
    {
      path: './fonts/WorkSans-black.ttf',
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
      path: './fonts/WorkSans-light.ttf',
      weight: '200',
      style: 'normal'
    },{
      path: './fonts/WorkSans-Extralight.ttf',
      weight: '100',
      style: 'normal'
    }
  ],
  variable: '--font-work-sans',
})


export const metadata: Metadata = {
  title: "Pitch Spark",
  description: "Pitch, Vote and Spark",
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
      </body>
    </html>
  );
}