import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

	await prisma.blogs.update({
		where: { id: post.id },
		data: { views: { increment: 1 } },
	});

	return (
		<div className="">
			<Link href="/blogs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-terminal-green transition-colors font-mono text-sm">
				<ArrowLeft size={16} />
				RETURN_TO_BLOGS
			</Link>

			<article className="space-y-8">
				<div className="space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">{post.title}</h1>

					<div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-500">
						<span className="flex items-center gap-2">
							<Calendar size={14} />
							{new Date(post.createdAt).toLocaleDateString()}
						</span>
						<span className="flex items-center gap-2">
							<Eye size={14} />
							{post.views + 1} VIEWS
						</span>
					</div>
				</div>

				{post.image && (
					<div className="relative aspect-video w-full rounded-lg overflow-hidden border border-zinc-800">
						<Image src={post.image} alt={post.title} fill className="object-cover" />
					</div>
				)}
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

				<div className="prose prose-invert prose-p:text-zinc-400 prose-headings:text-white prose-pre:bg-zinc-950 prose-pre:border-zinc-800 prose-pre:border prose-a:text-terminal-green max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
			</article>
		</div>
	);
}
