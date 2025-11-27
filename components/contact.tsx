"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react"

export function Contact() {
  const handleWhatsAppMessage = () => {
    const phone = "5511949913854"
    const message = encodeURIComponent("Olá Elias! Vi seu portfólio e gostaria de conversar.")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const handleEmail = () => {
    const mailtoLink =
      "mailto:eliaassantana00@gmail.com?subject=Contato via Portfólio&body=Olá Elias! Vi seu portfólio e gostaria de conversar."
    window.location.href = mailtoLink
  }

  return (
    <section className="px-4 py-20" id="contact">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Let&apos;s Connect</h2>
          <p className="text-muted-foreground text-lg text-balance">
            Interessado em trabalhar juntos? Vamos conversar sobre seu próximo projeto
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card hover:shadow-xl transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Elias Santana Santos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sempre aberto a novas oportunidades e colaborações. Entre em contato através das redes sociais ou
                  envie um e-mail.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://github.com/EliaasSantanaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>github.com/EliaasSantanaa</span>
                </a>

                <a
                  href="mailto:eliaassantana00@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>eliaassantana00@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/elias-santana-santos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>linkedin.com/in/elias-santana-santos</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <Button size="lg" className="w-full group" onClick={handleWhatsAppMessage}>
                <MessageSquare className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                WhatsApp
              </Button>

              <Button size="lg" variant="outline" className="w-full group bg-transparent" onClick={handleEmail}>
                <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Enviar E-mail
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Elias Santana Santos. Desenvolvido com Next.js e Tailwind CSS.</p>
        </div>
      </div>
    </section>
  )
}
