import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, User } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;

	const post = await prisma.blogs.findUnique({
		where: { slug: slug },
	});

	if (!post) notFound();

	await prisma.blogs.update({
		where: { id: post.id },
		data: { views: { increment: 1 } },
	});

	return (
		<div className="">
			<Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-terminal-green transition-colors font-mono text-sm">
				<ArrowLeft size={16} />
				RETURN_TO_LOGS
			</Link>

			<article className="space-y-8">
				<div className="space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">{post.title}</h1>

					<div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-500">
						<span className="flex items-center gap-2">
							<User size={14} className="text-terminal-green" />
							{post.published}
						</span>
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

				<div className="prose prose-invert prose-p:text-zinc-400 prose-headings:text-white prose-pre:bg-zinc-950 prose-pre:border-zinc-800 prose-pre:border prose-a:text-terminal-green max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
			</article>
		</div>
	);
}
