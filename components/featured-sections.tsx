"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ui/project-card";
import { BlogCard } from "./ui/blog-card";

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

export interface FeaturedBlog {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	readTime: number;
	views: number;
	updatedAt: Date;
	tags: {
		name: string;
	}[];
	categories: {
		name: string;
	}[];
}

interface FeaturedSectionsProps {
	projects: FeaturedProject[];
	blogs: FeaturedBlog[];
}

const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" as const },
	},
};

export function FeaturedSections({ projects, blogs }: FeaturedSectionsProps) {
	return (
		<>
			{projects && projects.length > 0 && (
				<motion.section id="projects" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-8 border-t border-border pt-20 pb-20">
					<div className="flex items-center justify-between gap-4 flex-wrap">
						<div className="space-y-1">
							<div className="flex items-center gap-2 text-primary font-mono text-sm">
								<span className="animate-pulse">❯</span>
								<span>ls ./projects --limit 2</span>
							</div>
							<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
								FEATURED_<span className="text-primary">PROJECTS</span>
							</h2>
						</div>

						<Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors gap-2">
							<Link href="/projects">
								VIEW_ALL <ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</motion.section>
			)}

			{blogs && blogs.length > 0 && (
				<motion.section id="blogs" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-8 border-t border-border pt-20 pb-20">
					<div className="flex items-center justify-between gap-4 flex-wrap">
						<div className="space-y-1">
							<div className="flex items-center gap-2 text-primary font-mono text-sm">
								<span className="animate-pulse">❯</span>
								<span>head -n 2 ./logs/blog.txt</span>
							</div>
							<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
								LATEST_<span className="text-primary">POSTS</span>
							</h2>
						</div>

						<Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors gap-2">
							<Link href="/blog">
								READ_MORE <ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</Button>
					</div>

					<div className="grid grid-cols-1 gap-6">
						{blogs.map((post) => (
							<BlogCard key={post.id} blog={post} />
						))}
					</div>
				</motion.section>
			)}
		</>
	);
}
