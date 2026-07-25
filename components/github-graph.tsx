"use client";

import { useSyncExternalStore } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

const emptySubscribe = () => () => {};
function useIsClient() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);
}

export function GithubGraph() {
	const isClient = useIsClient();

	return (
		<section className="py-20 border-t border-border" id="graph">
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-100px" }} className="space-y-8">
				<div className="flex items-center gap-2 text-primary font-mono text-sm">
					<span className="animate-pulse">❯</span>
					<span>git log --activity</span>
				</div>

				<h2 className="text-3xl font-bold tracking-tight">
					CONTRIBUTION_<span className="text-primary">GRAPH</span>
				</h2>

				<div className="p-6 rounded-lg border border-border bg-card/50 flex justify-center items-center min-h-[160px] overflow-x-auto">
					{isClient ? (
						<GitHubCalendar
							username="kevinadiwiguna"
							blockSize={12}
							blockMargin={4}
							fontSize={12}
							theme={{
								light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
								dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
							}}
						/>
					) : (
						<div className="w-full h-32 bg-muted/40 animate-pulse rounded-md flex items-center justify-center font-mono text-xs text-muted-foreground">Loading contribution graph...</div>
					)}
				</div>
			</motion.div>
		</section>
	);
}
