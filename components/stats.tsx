"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Stats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="px-4 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">GitHub Statistics</h2>
          <p className="text-muted-foreground text-lg">
            Métricas que demonstram minha jornada no desenvolvimento
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="https://github-readme-stats-eosin-gamma-81.vercel.app/api?username=EliaasSantanaa&show_icons=true&theme=dark&hide_border=true&bg_color=1a1b26&title_color=60a5fa&icon_color=60a5fa&text_color=c0caf5"
                alt="GitHub Stats"
                fill
                unoptimized // Desativa a otimização para esta imagem
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="https://github-readme-stats-eosin-gamma-81.vercel.app/api/top-langs/?username=EliaasSantanaa&layout=compact&theme=dark&hide_border=true&bg_color=1a1b26&title_color=60a5fa&text_color=c0caf5"
                alt="Top Languages"
                fill
                unoptimized // Desativa a otimização para esta imagem
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
