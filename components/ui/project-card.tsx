"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GitBranch, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export interface FeaturedProject {
	id: string;
	title: string;
	slug: string;
	shortDescription: string;
	githubUrl: string | null;
	liveUrl: string | null;
	isFeatured: boolean;
	updatedAt: Date;
	technologies: {
		name: string;
	}[];
}

const MotionCard = motion.create(Card);

export function ProjectCard({ project }: { project: FeaturedProject }) {
	return (
		<MotionCard initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} viewport={{ once: true }} className="group relative bg-card/50 border-border hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between overflow-hidden">
			<CardHeader className="p-6 pb-3 space-y-0 flex-row items-start justify-between">
				<CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{project.title}</CardTitle>

				<div className="relative z-10 flex items-center gap-3 text-muted-foreground pt-1">
					{project.githubUrl && (
						<motion.a whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" aria-label="GitHub Repository">
							<GitBranch className="h-4 w-4" />
						</motion.a>
					)}
					{project.liveUrl && (
						<motion.a whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" aria-label="Live Demo">
							<ExternalLink className="h-4 w-4" />
						</motion.a>
					)}
				</div>
			</CardHeader>

			<CardContent className="px-6 py-0">
				<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{project.shortDescription}</p>
			</CardContent>

			<CardFooter className="p-6 pt-6 relative z-10 flex flex-wrap gap-2">
				{project.technologies?.slice(0, 4).map((tech) => (
					<Badge key={tech.name} variant="outline" className="font-mono text-[10px] py-0.5 px-2 font-normal border-border bg-background/80 text-muted-foreground transition-colors hover:text-primary hover:border-primary/40 cursor-default">
						{tech.name}
					</Badge>
				))}
			</CardFooter>

			<Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
				<span className="sr-only">View {project.title} details</span>
			</Link>
		</MotionCard>
	);
}
