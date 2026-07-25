"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";

const navItems = [
	{ href: "#home", label: "home", code: "01." },
	{ href: "#graph", label: "graph", code: "02." },
	{ href: "#tech", label: "tech", code: "03." },
	{ href: "#projects", label: "projects", code: "04." },
	{ href: "#blog", label: "blog", code: "05." },
	{ href: "#experience", label: "experience", code: "06." },
	{ href: "#contact", label: "contact", code: "07." },
	{
		href: "https://core.kevinadiwiguna.dev",
		label: "dashboard",
		code: "08.",
		isExternal: true,
	},
];

const drawerVariants: Variants = {
	closed: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.2,
			ease: "easeIn",
			when: "afterChildren",
		},
	},
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.25,
			ease: [0.16, 1, 0.3, 1],
			staggerChildren: 0.04,
			delayChildren: 0.05,
		},
	},
};

const itemVariants: Variants = {
	closed: { opacity: 0, x: -12 },
	open: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

export function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen((prev) => !prev);
	const closeMenu = () => setIsOpen(false);

	return (
		<>
			<Button variant="ghost" size="icon" onClick={toggleMenu} className="text-muted-foreground hover:text-primary transition-colors font-mono z-50 relative" aria-label="Toggle Navigation Menu">
				<motion.div key={isOpen ? "close" : "open"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
					{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</motion.div>
			</Button>

			<AnimatePresence>
				{isOpen && (
					<motion.div variants={drawerVariants} initial="closed" animate="open" exit="closed" className="fixed inset-0 z-40 h-dvh w-screen bg-black/95 backdrop-blur-2xl flex flex-col justify-between pt-16 p-6 lg:hidden font-mono overflow-y-auto">
						<nav className="flex flex-col space-y-2 pt-2">
							<motion.div variants={itemVariants} className="text-[10px] text-muted-foreground/60 mb-3 font-mono tracking-wider">
								NAVIGATION_TREE
							</motion.div>
							{navItems.map((item) => {
								const isExt = item.isExternal;
								return (
									<motion.div key={item.href} variants={itemVariants}>
										<Link href={item.href} target={isExt ? "_blank" : undefined} rel={isExt ? "noreferrer" : undefined} onClick={closeMenu} className="group flex items-center justify-between py-2.5 px-3 rounded-md border border-transparent hover:border-border/40 hover:bg-zinc-900/80 text-sm text-muted-foreground hover:text-primary transition-all">
											<div className="flex items-center gap-3">
												<span className="text-primary/60 text-xs font-semibold">{item.code}</span>
												<span className="tracking-wide font-medium">{item.label}</span>
											</div>
											<ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
										</Link>
									</motion.div>
								);
							})}
						</nav>

						<motion.div variants={itemVariants} className="pt-6 border-t border-border/40 space-y-2 text-xs text-muted-foreground/60 mt-auto">
							<div className="flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
								<span>SYS_STATUS: ONLINE</span>
							</div>
							<p className="text-[10px]">BUILD: v2.0.26_prod</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
