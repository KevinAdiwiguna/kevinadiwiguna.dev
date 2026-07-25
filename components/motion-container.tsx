"use client";
import { motion } from "motion/react";

const mainVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.8 },
	},
};

export const MotionContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.main variants={mainVariants} initial="hidden" animate="visible" className="min-w-0 py-6 lg:py-10">
			{children}
		</motion.main>
	);
};
