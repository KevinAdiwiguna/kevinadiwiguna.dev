"use client";
import { CodeXml, Globe, Mail, Terminal } from "lucide-react";
import { motion } from "motion/react";

const rightSidebarVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.8 },
	},
};

export const Aside = () => {
	return (
		<motion.aside variants={rightSidebarVariants} initial="hidden" animate="visible" className="hidden lg:flex sticky top-0 h-screen flex-col items-center justify-center gap-8 py-10 border-l border-border/40 pl-6">
			<div className="h-16 w-px bg-border/40" />

			<div className="flex flex-col items-center gap-5">
				<a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="Source Code (GitHub)">
					<CodeXml className="h-4 w-4" />
				</a>
				<a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="Network (LinkedIn)">
					<Globe className="h-4 w-4" />
				</a>
				<a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="Terminal Feed (Twitter/X)">
					<Terminal className="h-4 w-4" />
				</a>
				<a href="mailto:contact@kevin.dev" className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="Email Direct">
					<Mail className="h-4 w-4" />
				</a>
			</div>

			<div className="h-16 w-px bg-border/40" />
		</motion.aside>
	);
};
