import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/command-palette";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MobileNav } from "@/components/mobile-nav";
import { Navigation } from "@/components/navigation";
import { MotionContainer } from "@/components/motion-container";
import { Aside } from "@/components/asaide";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Kevin Adiwiguna — Software Dev",
	description: "Personal portfolio and technical writing by Kevin Adiwiguna.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, jetbrainsMono.variable, "font-mono")} suppressHydrationWarning>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<body className="min-h-full flex flex-col bg-background text-foreground">
					<header className="lg:hidden sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
						<Link href="/" className="font-mono text-xs font-bold text-primary tracking-wider">
							&gt; KEVIN ADIWIGUNA_
						</Link>

						<MobileNav />
					</header>

					<div className="mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-8 flex-1">
						<div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-6 xl:gap-8 min-h-screen">
							<Navigation />

							<MotionContainer>
								<main className="min-w-0 py-6 lg:py-10 flex flex-col justify-center ">{children}</main>
							</MotionContainer>

							<Aside />
						</div>
					</div>
					<CommandPalette />
					<Toaster />
				</body>
			</ThemeProvider>
		</html>
	);
}
