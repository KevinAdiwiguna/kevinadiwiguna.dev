"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sidebarVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5, ease: "easeOut" as const },
	},
};

export const Navigation = () => {
	return (
		<motion.aside variants={sidebarVariants} initial="hidden" animate="visible" className="hidden lg:flex sticky top-0 h-screen flex-col justify-center gap-8 py-10 border-r border-border/40 pr-6">
			<Link href="/" className="font-mono text-xs font-bold text-primary tracking-wider hover:opacity-80 transition-opacity block">
				&gt; KEVIN ADIWIGUNA_
			</Link>

			<nav className="flex flex-col space-y-4 font-mono text-xs">
				<Link href="/#home" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">01.</span> home
				</Link>
				<Link href="/#graph" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">02.</span> graph
				</Link>
				<Link href="/#tech" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">03.</span> tech
				</Link>

				<Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">04.</span> projects
				</Link>
				<Link href="/blogs" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">05.</span> blogs
				</Link>

				<Link href="/#experience" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">06.</span> experience
				</Link>
				<Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">07.</span> contact
				</Link>
				<Link href="https://core.kevinadiwiguna.dev" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
					<span className="text-primary/50">08.</span> dashboard
				</Link>
			</nav>

			<div className="font-mono text-[10px] text-muted-foreground/60 space-y-1 pt-4 border-t border-border/20">
				<div className="flex items-center gap-2">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
					<span>STATUS: ONLINE</span>
				</div>
				<p>v1.6.1_prod</p>
			</div>
		</motion.aside>
	);
};
