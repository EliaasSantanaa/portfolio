"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Elias Santana Santos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">
            Full Stack Developer
          </p>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 text-balance">
          Desenvolvedor Full Stack com experiência na criação de aplicações web
          modernas e escaláveis. Atuo em toda a stack, com foco em interfaces
          intuitivas, arquiteturas robustas, performance e deploy em cloud.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Button
            size="lg"
            className="group"
            onClick={() =>
              window.open("https://github.com/EliaasSantanaa", "_blank")
            }
          >
            <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            GitHub
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group bg-transparent"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/elias-santana-santos",
                "_blank"
              )
            }
          >
            <Linkedin className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            LinkedIn
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group bg-transparent"
            onClick={() => scrollToSection("contact")}
          >
            <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Contato
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full p-1">
            <div className="w-1.5 h-3 bg-primary rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
