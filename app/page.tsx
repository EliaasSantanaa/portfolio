import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Skills } from "@/components/skills"
import { Repositories } from "@/components/repositories"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Skills />
      <Repositories />
      <Contact />
    </main>
  )
}
