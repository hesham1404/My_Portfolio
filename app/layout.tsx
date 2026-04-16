import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Sali Hesham A — Frontend Developer",
  description:
    "Frontend Developer based in Nagercoil, Tamil Nadu. I build clean, fast, and responsive web experiences with React, Next.js, and Tailwind CSS.",
  keywords: [
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Mohamed Sali Hesham",
    "Hesham",
    "Web Developer",
    "Nagercoil",
    "Tamil Nadu",
  ],
  authors: [{ name: "Mohamed Sali Hesham A" }],
  openGraph: {
    title: "Mohamed Sali Hesham A — Frontend Developer",
    description:
      "Frontend Developer building clean, fast, and responsive web experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Sali Hesham A — Frontend Developer",
    description:
      "Frontend Developer building clean, fast, and responsive web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
