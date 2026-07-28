import type { Metadata } from "next";
import localFont from "next/font/local";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const display = localFont({
  src: "./fonts/CormorantUpright-Regular.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const body = localFont({
  src: "./fonts/LouizeTrial-Regular.otf",
  weight: "400",
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Macchi Group",
  description:
    "Boutique Southwest Florida real estate — Naples, Bonita Springs, Fort Myers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Loader />
        <SmoothScroll />
        {children}
        <Footer />
      </body>
    </html>
  );
}
