import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
await _geist
await _geistMono

export const metadata: Metadata = {
  title: "Elias Santana Santos | Full Stack Developer Portfolio",
  description:
    "Portfólio profissional de Elias Santana Santos - Desenvolvedor Full Stack especializado em React, Next.js e tecnologias modernas.",
  keywords: ["desenvolvedor", "full stack", "react", "next.js", "portfólio", "web developer"],
  authors: [{ name: "Elias Santana Santos" }],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
