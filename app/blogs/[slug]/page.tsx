import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const resolvedParams = await params;
	const post = await prisma.blogs.findUnique({
		where: { slug: resolvedParams.slug },
		select: { title: true, excerpt: true, image: true, tags: true },
	});

	if (!post) {
		return {
			title: "Blog Post Not Found",
		};
	}

	const keywords = post.tags?.map((tag: { name: string }) => tag.name) || [];

	return {
		title: post.title,
		description: post.excerpt || "Technical blog post and article.",
		keywords: ["blog", "article", "Ida Bagus Kevin Adiwiguna", "Kevin Adiwiguna", "Lombok", "Universitas Mataram", "Unram", ...keywords],
		openGraph: {
			title: post.title,
			description: post.excerpt || "Technical blog post and article.",
			type: "article",
			url: `https://kevinadiwiguna.dev/blogs/${resolvedParams.slug}`,
			images: post.image ? [{ url: post.image, alt: post.title }] : [],
		},
	};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;

	const post = await prisma.blogs.findUnique({
		where: { slug: slug },
		select: {
			id: true,
			slug: true,
			title: true,
			content: true,
			image: true,
			excerpt: true,
			published: true,
			readTime: true,
			views: true,
			createdAt: true,
			updatedAt: true,
			tags: true,
			categories: true,
		},
	});

	if (!post) notFound();

	// Increment views counter
	await prisma.blogs.update({
		where: { id: post.id },
		data: { views: { increment: 1 } },
	});

	const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});

	return (
		<div className="space-y-8 font-mono">
			{/* Back Link */}
			<div>
				<Link href="/blogs" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
					<ArrowLeft className="h-4 w-4" />
					<span>&gt; cd ../blogs</span>
				</Link>
			</div>

			{/* Header Section */}
			<header className="space-y-4">
				<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/80">
					<Badge variant="outline" className={cn("text-[10px] font-mono border-border/60", post.published ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-amber-400 border-amber-500/30 bg-amber-500/10")}>
						[{post.published ? "PUBLISHED" : "DRAFT"}]
					</Badge>

					<div className="flex items-center gap-1.5 text-muted-foreground">
						<Calendar className="h-3.5 w-3.5 text-primary/70" />
						<span>{formattedDate}</span>
					</div>

					{post.readTime && (
						<div className="flex items-center gap-1.5 text-muted-foreground">
							<Clock className="h-3.5 w-3.5 text-primary/70" />
							<span>{post.readTime} MIN_READ</span>
						</div>
					)}

					<div className="flex items-center gap-1.5 text-muted-foreground">
						<Eye className="h-3.5 w-3.5 text-primary/70" />
						<span>{post.views + 1} VIEWS</span>
					</div>
				</div>

				<div className="space-y-2 border-b border-border/40 pb-6">
					<h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
						{post.title}
						<span className="text-primary animate-pulse">_</span>
					</h1>

					{post.excerpt && <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-sans">{post.excerpt}</p>}
				</div>

				<div className="space-y-4 pt-2 font-mono">
					{post.categories && post.categories.length > 0 && (
						<div className="space-y-2">
							<h5 className="text-[11px] font-semibold text-muted-foreground/80 tracking-wider">&gt; CATEGORIES</h5>
							<div className="flex flex-wrap gap-1.5">
								{post.categories.map((category: { id: string; name: string }) => (
									<Badge key={category.id} variant="outline" className="text-[10px] font-mono border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
										{category.name}
									</Badge>
								))}
							</div>
						</div>
					)}

					{post.tags && post.tags.length > 0 && (
						<div className="space-y-2">
							<h5 className="text-[11px] font-semibold text-muted-foreground/80 tracking-wider">&gt; TAGS</h5>
							<div className="flex flex-wrap gap-1.5">
								{post.tags.map((tag: { id: string; name: string }) => (
									<Badge key={tag.id} variant="secondary" className="text-[10px] font-mono font-normal border border-border/30 bg-muted/30 text-muted-foreground hover:border-border/60 transition-colors px-2 py-0.5">
										#{tag.name}
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			</header>

			{post.image && (
				<div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border/40 bg-muted/20">
					<Image src={post.image} alt={post.title} fill className="object-cover" priority />
				</div>
			)}

			<article className="prose prose-invert max-w-none font-sans text-sm sm:text-base leading-relaxed border-t border-border/30 pt-6 prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border/40" dangerouslySetInnerHTML={{ __html: post.content }} />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.title,
						image: post.image,
						genre: post.categories.map((c: { name: string }) => c.name),
						keywords: post.tags.map((t: { name: string }) => t.name),
						url: `https://kevinadiwiguna.dev/blogs/${post.slug}`,
						datePublished: post.createdAt,
						dateModified: post.updatedAt,
						author: {
							"@type": "Person",
							name: "Ida Bagus Kevin Adiwiguna",
							url: "https://kevinadiwiguna.dev",
						},
						description: post.excerpt,
						articleBody: post.content,
					}),
				}}
			/>
		</div>
	);
}
