import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { default: "buildwithvickyvs.ai", template: "%s | buildwithvickyvs.ai" },
  description: "Vicky's digital lab — AI tools, projects, games, devlogs, and experiments.",
  keywords: ["developer", "AI", "portfolio", "FastAPI", "Next.js"],
  authors: [{ name: "Vicky VS" }],
  openGraph: {
    type: "website",
    url: "https://buildwithvickyvs.ai",
    title: "buildwithvickyvs.ai",
    description: "Vicky's digital lab — AI tools, projects, and experiments.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0f1623",
              color: "#cbd5e1",
              border: "1px solid rgba(20,184,166,0.25)",
              fontSize: "0.875rem",
            },
          }}
        />
      </body>
    </html>
  );
}
