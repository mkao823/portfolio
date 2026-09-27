import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Glow from "@/components/Glow";
import Sidebar from "@/components/Sidebar";

/**
 * Shared shell for /writing and /writing/[slug]: same sticky sidebar
 * layout as the homepage, with nav linking back to homepage sections.
 */
export default function WritingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Glow />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar variant="writing" />
          <main id="content" className="pt-16 lg:w-1/2 lg:py-24">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
