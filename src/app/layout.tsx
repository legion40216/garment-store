import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Garment Store",
    template: "%s | Garment Store",
  },
  description: "Seasonal clothing for the whole family.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Renders the toasts that the cart and wishlist hooks trigger. */}
        <Toaster>{children}</Toaster>
      </body>
    </html>
  );
}
