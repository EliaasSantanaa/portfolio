import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Skills } from "@/components/skills";
import { Repositories } from "@/components/repositories";
import { Contact } from "@/components/contact";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Stats />
        <Skills />
        <Repositories />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}
