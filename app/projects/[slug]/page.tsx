import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, GitBranch, ExternalLink, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;

	const project = await prisma.project.findUnique({
		where: { slug: slug },
		include: { technologies: true, categories: true },
	});

	if (!project) notFound();

	const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});

	return (
		<div className="space-y-8 font-mono">
			<div>
				<Link href="/projects" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
					<ArrowLeft className="h-4 w-4" />
					<span>&gt; cd ../projects</span>
				</Link>
			</div>

			<header className="space-y-4">
				<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/80">
					<Badge variant="outline" className={cn("text-[10px] font-mono border-border/60", project.status === "COMPLETED" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-amber-400 border-amber-500/30 bg-amber-500/10")}>
						[{project.status}]
					</Badge>

					<div className="flex items-center gap-1.5 text-muted-foreground">
						<Calendar className="h-3.5 w-3.5 text-primary/70" />
						<span>{formattedDate}</span>
					</div>
				</div>

				<div className="space-y-2 border-b border-border/40 pb-6">
					<h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
						{project.title}
						<span className="text-primary animate-pulse">_</span>
					</h1>

					{project.shortDescription && <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-sans">{project.shortDescription}</p>}
				</div>

				{((project.technologies && project.technologies.length > 0) || (project.categories && project.categories.length > 0)) && (
					<div className="flex flex-wrap gap-1.5 pt-1">
						{project.categories?.map((cat) => (
							<Badge key={cat.id} variant="outline" className="text-[10px] border-primary/30 text-primary bg-primary/5">
								<Tag className="h-2.5 w-2.5 mr-1" />
								{cat.name}
							</Badge>
						))}
						{project.technologies?.map((tech) => (
							<Badge key={tech.id} variant="secondary" className="text-[10px] border border-border/30 bg-muted/30 text-muted-foreground">
								{tech.name}
							</Badge>
						))}
					</div>
				)}

				<div className="flex flex-wrap gap-3 pt-2">
					{project.githubUrl && (
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 border-border/60 hover:border-primary/60 hover:text-primary text-xs gap-2 font-mono")}>
							<GitBranch className="h-4 w-4" />
							<span>SOURCE_CODE</span>
						</a>
					)}
					{project.liveUrl && (
						<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "default", size: "sm" }), "h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold gap-2 font-mono")}>
							<ExternalLink className="h-4 w-4" />
							<span>LIVE_DEMO</span>
						</a>
					)}
				</div>
			</header>

			{project.image && (
				<div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border/40 bg-muted/20">
					<Image src={project.image} alt={project.title} fill className="object-cover" priority />
				</div>
			)}

			<article className="prose prose-invert max-w-none font-sans text-sm sm:text-base leading-relaxed border-t border-border/30 pt-6 prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border/40" dangerouslySetInnerHTML={{ __html: project.content }} />
		</div>
	);
}
