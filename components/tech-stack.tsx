"use client";

import { motion } from "motion/react";
import { Terminal, Database, Layout, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
	{
		title: "LANGUAGES",
		icon: Terminal,
		skills: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "C++", "HTML5", "CSS3", "SQL", "Bash", "GraphQL"],
	},
	{
		title: "FRONTEND",
		icon: Layout,
		skills: ["React", "Next.js", "Vue.js", "Svelte", "Tailwind CSS", "Framer Motion", "Zustand", "Redux", "Sass", "Material UI", "Chakra UI", "Three.js", "WebRTC"],
	},
	{
		title: "BACKEND_&_DB",
		icon: Database,
		skills: ["Node.js", "Express", "NestJS", "Django", "FastAPI", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Drizzle ORM", "Supabase", "Firebase", "Elasticsearch"],
	},
	{
		title: "TOOLS_&_DEVOPS",
		icon: Wrench,
		skills: ["Git", "Docker", "Kubernetes", "AWS", "Google Cloud", "Cloudflare", "Vercel", "Linux", "Nginx", "GitHub Actions", "Terraform", "Jest", "Cypress"],
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function TechStack() {
	return (
		<section className="py-20 border-t border-border" id="tech">
			<div className="space-y-8">
				<div className="flex items-center gap-2 text-primary font-mono text-sm">
					<span className="animate-pulse">❯</span>
					<span>cat ~/.skills</span>
				</div>

				<h2 className="text-3xl font-bold tracking-tight">
					TECH_<span className="text-primary">STACK</span>
				</h2>

				<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{CATEGORIES.map((category) => {
						const Icon = category.icon;

						return (
							<motion.div key={category.title} variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-colors">
								<div className="flex items-center gap-3 mb-6">
									<Icon className="text-primary h-5 w-5" />
									<h3 className="font-mono font-bold tracking-widest text-sm text-foreground">{category.title}</h3>
								</div>

								<div className="flex flex-wrap gap-2">
									{category.skills.map((skill) => (
										<Badge key={skill} variant="outline" className="font-mono text-xs py-1 px-2.5 font-normal text-muted-foreground border-border bg-background hover:text-primary hover:border-primary/40 transition-colors cursor-default">
											{skill}
										</Badge>
									))}
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
