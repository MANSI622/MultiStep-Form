"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Multi-Step Form",
//   description: "A multi-step form example using Next.js and Tailwind CSS",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
        <header className="p-4 bg-gray-200 dark:bg-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Multi-Step Form</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              Toggle Dark Mode
            </button>
          </div>
        </header>
        <main className="p-4">{children}</main>
        <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center">
          &copy; {new Date().getFullYear()} Multi-Step Form
        </footer>
      </body>
    </html>
  );
}
