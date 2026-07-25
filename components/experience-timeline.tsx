"use client";

import { motion } from "motion/react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export interface Experience {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	company: string;
	role: string;
	startDate: Date;
	endDate: Date | null;
	description: string;
	techUsed: string[];
}

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
	if (!experiences || experiences.length === 0) return null;

	return (
		<section id="experience" className="py-20 border-t border-border">
			<div className="flex items-center gap-2 text-primary font-mono text-sm mb-2">
				<span className="animate-pulse">❯</span>
				<span>systemctl status career.service</span>
			</div>

			<h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12">
				PROFESSIONAL_<span className="text-primary">TIMELINE</span>
			</h2>

			<div className="relative space-y-10 before:absolute before:inset-y-0 before:left-[11px] before:w-[1px] before:bg-border">
				{experiences.map((exp, index) => {
					const startDateStr = exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : "";
					const endDateStr = exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "PRESENT";

					return (
						<motion.div key={exp.id} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }} viewport={{ once: true }} className="relative pl-8 group">
							<div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center transition-colors group-hover:border-primary">
								<div className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
							</div>

							<div className="space-y-1">
								<span className="text-xs font-mono text-primary font-semibold tracking-wider">
									{startDateStr} — {endDateStr}
								</span>

								<h3 className="text-lg font-bold tracking-tight text-foreground">
									{exp.role} <span className="text-muted-foreground font-normal">@ {exp.company}</span>
								</h3>
							</div>

							<p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">{exp.description}</p>

							{exp.techUsed && exp.techUsed.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-4">
									{exp.techUsed.map((tech) => (
										<Badge key={tech} variant="outline" className="font-mono text-[10px] py-0.5 px-2 font-normal border-border bg-background/80 text-muted-foreground transition-colors hover:text-primary hover:border-primary/40 cursor-default">
											{tech}
										</Badge>
									))}
								</div>
							)}
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
