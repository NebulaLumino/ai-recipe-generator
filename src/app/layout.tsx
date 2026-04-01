import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "AI Recipe Generator",
  description: "Generate creative recipes from ingredients or cuisine preferences",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
        {children}
      </body>
    </html>
  );
}
