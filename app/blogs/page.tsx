import type { Metadata } from "next";
import { Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBlogsData } from "@/hooks/blog";
import { BlogCard } from "@/components/ui/blog-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Blog",
	description: "Technical articles, software engineering insights, system architecture breakdowns, and development notes by Ida Bagus Kevin Adiwiguna.",
	keywords: ["blog", "technical writing", "software engineering", "system design", "development", "Ida Bagus Kevin Adiwiguna", "Kevin Adiwiguna", "Lombok", "Universitas Mataram", "Unram"],
	openGraph: {
		title: "Blog | Ida Bagus Kevin Adiwiguna",
		description: "Technical articles, software engineering insights, system architecture breakdowns, and development notes.",
		type: "website",
		url: "https://kevinadiwiguna.dev/blogs",
	},
};
export default async function BlogPage() {
	const posts = await getAllBlogsData();

	return (
		<div className="space-y-8 font-mono">
			<header className="space-y-4">
				<div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wider">
					<span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
					<span>&gt; cat ./blog/posts.log</span>
				</div>

				<div className="flex items-center justify-between border-b border-border/40 pb-4">
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
						BLOG<span className="text-primary animate-pulse">_</span>
					</h1>

					<Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border/60">
						POSTS: {posts.length.toString().padStart(2, "0")}
					</Badge>
				</div>

				<p className="text-xs sm:text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">Thoughts, technical breakdowns, system architectures, and software engineering notes. Written in markdown for easy parsing.</p>
			</header>

			{posts.length === 0 ? (
				<Card className="border-dashed border-border/60 bg-background/50">
					<CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-3">
						<div className="p-3 rounded-full bg-muted/40 border border-border/40 text-muted-foreground">
							<Terminal className="h-6 w-6" />
						</div>
						<div className="space-y-1">
							<p className="text-xs font-semibold text-primary">NO_ARTICLES_FOUND: Log directory empty.</p>
							<p className="text-[11px] text-muted-foreground">No technical write-ups or articles published at this moment.</p>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{posts.map((post) => (
						<BlogCard key={post.id} blog={post} />
					))}
				</div>
			)}
		</div>
	);
}
