import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slate - Kanban Board",
  description: "A beautiful drag-and-drop Kanban board for organizing your tasks",
  keywords: ["kanban", "task management", "productivity", "drag and drop"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
