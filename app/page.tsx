import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { ContactForm } from "@/components/contact-form";
import { GithubGraph } from "@/components/github-graph";
import { FeaturedSections } from "@/components/featured-sections";

import { get2BlogsData } from "@/hooks/blog";
import { get2ProjectData } from "@/hooks/project";
import { getAllExperienceData } from "@/hooks/experience";
import { ExperienceTimeline } from "@/components/experience-timeline";

export default async function Home() {
	const projects = await get2ProjectData();
	const blogs = await get2BlogsData();
	const experience = await getAllExperienceData();

	return (
		<>
			<div className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
				<div className="flex items-center gap-2.5">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
					</span>
					<div className="space-y-0.5">
						<p className="font-semibold text-foreground flex items-center gap-1.5">AVAILABLE FOR REMOTE WORK</p>
						<p className="text-[11px] text-muted-foreground">Open to freelance contracts & open-source / community contributions.</p>
					</div>
				</div>
			</div>
			<Hero />
			<GithubGraph />
			<TechStack />
			<FeaturedSections projects={projects} blogs={blogs} />
			<ExperienceTimeline experiences={experience} />
			<ContactForm />
		</>
	);
}
