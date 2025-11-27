"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image" // Importando o componente Image
import { useEffect, useState } from "react"

const skillCategories = [
	{
		title: "Frontend",
		skills: [
			"Next.js",
			"React",
			"Angular",
			"Tailwind CSS",
			"TypeScript",
			"JavaScript",
		],
		icons: [
			"nextdotjs",
			"react",
			"angular",
			"tailwindcss",
			"typescript",
			"javascript",
		],
	},
	{
		title: "Backend",
		skills: ["Node.js", "NestJS", "Fastify", "Python", "Flask", "REST APIs"],
		icons: ["nodejs", "nestjs", "fastify", "python", "flask", "postman"],
	},
	{
		title: "Database",
		skills: [
			"Firebase",
			"PostgreSQL",
			"MongoDB",
			"AWS Aurora",
			"Prisma ORM",
		],
		icons: ["firebase", "postgresql", "mongodb", "awslambda", "prisma"],
	},
	{
		title: "DevOps & Tools",
		skills: ["Docker", "Git", "CI/CD", "Vercel", "AWS", "GCP"],
		icons: ["docker", "git", "githubactions", "vercel", "aws", "gcp"],
	},
]

function SkillCarousel({ icons }: { icons: string[] }) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		if (isHovered) return

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % icons.length)
		}, 2000)

		return () => clearInterval(interval)
	}, [icons.length, isHovered])

	const getVisibleIcons = () => {
		const visible = []
		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % icons.length
			visible.push({ icon: icons[index], index })
		}
		return visible
	}

	return (
		<div
			className="relative h-12 mb-4 overflow-hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex items-center justify-center gap-3 h-full">
				{getVisibleIcons().map(({ icon, index }, i) => (
					<div
						key={`${icon}-${index}-${i}`}
						className="transition-all duration-500 ease-in-out transform"
						style={{
							opacity: i === 1 ? 1 : 0.4,
							transform: i === 1 ? "scale(1.1)" : "scale(0.75)",
						}}
					>
						<Image
							src={`https://skillicons.dev/icons?i=${icon}`}
							alt={icon}
							width={40} // Define a largura da imagem
							height={40} // Define a altura da imagem
							className="object-contain transition-transform duration-300 hover:scale-110"
							unoptimized // Desativa a otimização automática para imagens externas
						/>
					</div>
				))}
			</div>

			{/* Carousel indicators */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5">
				{icons.map((_, idx) => (
					<button
						key={idx}
						onClick={() => setCurrentIndex(idx)}
						className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
							idx === currentIndex
								? "bg-primary w-4"
								: "bg-muted-foreground/30"
						}`}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

export function Skills() {
	return (
		<section className="px-4 py-20" id="skills">
			<div className="max-w-6xl mx-auto space-y-12">
				<div className="text-center space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold">
						Skills & Technologies
					</h2>
					<p className="text-muted-foreground text-lg text-balance">
						Tecnologias que domino e utilizo para criar soluções inovadoras
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{skillCategories.map((category, idx) => (
						<Card
							key={category.title}
							className="p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 group relative overflow-hidden"
							style={{
								animationDelay: `${idx * 100}ms`,
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							<div className="relative z-10">
								<h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors text-center">
									{category.title}
								</h3>

								<SkillCarousel icons={category.icons} />

								<div className="flex flex-wrap gap-2 justify-center mt-4">
									{category.skills.map((skill) => (
										<span
											key={skill}
											className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
