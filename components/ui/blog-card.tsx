"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export interface FeaturedBlog {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	readTime: number;
	views: number;
	updatedAt: Date;
	createdAt: Date;
	tags: {
		name: string;
	}[];
	categories: {
		name: string;
	}[];
}

const MotionCard = motion.create(Card);

export function BlogCard({ blog }: { blog: FeaturedBlog }) {
	return (
		<MotionCard initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} viewport={{ once: true }} className="group relative bg-card/50 border-border hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between overflow-hidden">
			<CardHeader className="p-6 pb-3 space-y-3">
				{/* Metadata: Date, Read Time, Views */}
				<div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
					<span className="flex items-center gap-1.5">
						<Calendar className="h-3.5 w-3.5 text-primary/80" />
						{format(new Date(blog.createdAt), "yyyy-MM-dd")}
					</span>
					<span className="flex items-center gap-1.5">
						<Clock className="h-3.5 w-3.5 text-primary/80" />
						{blog.readTime || 5} min read
					</span>
					<span className="flex items-center gap-1.5">
						<Eye className="h-3.5 w-3.5 text-primary/80" />
						{blog.views}
					</span>
				</div>

				{/* Title */}
				<CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{blog.title}</CardTitle>
			</CardHeader>

			{/* Content: Excerpt */}
			<CardContent className="px-6 py-0">
				<p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{blog.excerpt || "Decrypting the future of web development, one byte at a time."}</p>
			</CardContent>

			{/* Footer: Hashtag Badges */}
			<CardFooter className="p-6 pt-4 relative z-10 flex flex-wrap gap-2">
				{blog.tags?.map((tag) => (
					<Badge key={tag.name} variant="outline" className="font-mono text-[10px] py-0.5 px-2 font-normal border-border bg-background/80 text-primary/80 transition-colors hover:text-primary hover:border-primary/40 cursor-default">
						#{tag.name}
					</Badge>
				))}
			</CardFooter>

			{/* Clickable Overlay Link */}
			<Link href={`/blogs/${blog.slug}`} className="absolute inset-0 z-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
				<span className="sr-only">Read {blog.title}</span>
			</Link>
		</MotionCard>
	);
}
