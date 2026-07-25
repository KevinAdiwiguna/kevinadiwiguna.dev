"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
	const [text, setText] = useState("");
	const fullText = "Software Dev. | Tech Enthusiast.";
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index < fullText.length) {
			const timeout = setTimeout(() => {
				setText((prev) => prev + fullText[index]);
				setIndex((prev) => prev + 1);
			}, 300);
			return () => clearTimeout(timeout);
		}
	}, [index, fullText]);

	return (
		<section id="home" className="relative min-h-[80vh] flex flex-col justify-center py-20 overflow-hidden">
			<div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
				<div className="mb-4">
					<Badge variant="outline" className="border-primary/40 text-primary font-mono gap-2 py-1 px-3">
						<span className="animate-pulse">❯</span>
						<span>whoami</span>
					</Badge>
				</div>

				<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
					KEVIN <span className="text-primary">ADIWIGUNA</span>
				</h1>

				<div className="h-10 text-xl md:text-2xl text-muted-foreground font-mono">
					{text}
					<span className="text-primary animate-pulse">|</span>
				</div>

				<p className="max-w-2xl text-muted-foreground mt-6 leading-relaxed">Building high-performance, futuristic web applications with Next.js, TypeScript, and clean architecture. Focused on scalable solutions and immersive user experiences.</p>

				<div className="flex flex-wrap gap-4 mt-10">
					<Button variant="default" className="font-mono font-bold rounded-sm px-8 py-6">
						VIEW_PROJECTS
					</Button>
					<Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-mono rounded-sm px-8 py-6">
						READ_BLOG
					</Button>
				</div>
			</motion.div>
		</section>
	);
}
