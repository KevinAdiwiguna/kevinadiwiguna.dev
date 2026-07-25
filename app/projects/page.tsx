import { Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllProjectData } from "@/hooks/project";
import { ProjectCard } from "@/components/ui/project-card";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
	const projects = await getAllProjectData();

	return (
		<div className="space-y-8 font-mono">
			<header className="space-y-3">
				<div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wider">
					<span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
					<span>&gt; ls ./projects --all</span>
				</div>

				<div className="flex items-center justify-between border-b border-border/40 pb-4">
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
						PROJECTS<span className="text-primary animate-pulse">_</span>
					</h1>

					<Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border/60">
						TOTAL: {projects.length.toString().padStart(2, "0")}
					</Badge>
				</div>

				<p className="text-xs sm:text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">Archive of digital artifacts, open-source tools, and client solutions. Filter by technology or search for specific keywords.</p>
			</header>

			{projects.length === 0 ? (
				<Card className="border-dashed border-border/60 bg-background/50">
					<CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-3">
						<div className="p-3 rounded-full bg-muted/40 border border-border/40 text-muted-foreground">
							<Terminal className="h-6 w-6" />
						</div>
						<div className="space-y-1">
							<p className="text-xs font-semibold text-primary">NO_DATA_FOUND: Database currently empty.</p>
							<p className="text-[11px] text-muted-foreground">No public repositories or active deployments indexed at this moment.</p>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</div>
	);
}
