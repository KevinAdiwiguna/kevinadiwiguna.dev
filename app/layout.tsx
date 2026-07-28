import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
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

export const viewport: Viewport = {
	themeColor: "black",
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL("https://kevinadiwiguna.dev"),
	title: {
		default: "Ida Bagus Kevin Adiwiguna — Software Engineer",
		template: "%s | Ida Bagus Kevin Adiwiguna",
	},
	description: "Personal portfolio, technical blog, and software projects by Ida Bagus Kevin Adiwiguna (KevinAdiwiguna).",
	keywords: ["Ida Bagus Kevin Adiwiguna", "Kevin Adiwiguna", "KevinAdiwiguna", "Lombok", "Software Engineer", "Web Developer", "Universitas Mataram", "Unram"],
	authors: [{ name: "Ida Bagus Kevin Adiwiguna", url: "https://kevinadiwiguna.dev" }],
	verification: {
		google: "NXt-POVwigbdSbfgpyh3UYH96nLPGd",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, jetbrainsMono.variable, "font-mono")} suppressHydrationWarning>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<Analytics />
				<body className="min-h-full flex flex-col bg-background text-foreground">
					<header className="lg:hidden sticky top-0 z-50 w-full border-b border-border/20 bg-background/10 backdrop-blur-md px-4 py-3 flex items-center justify-between">
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
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "Person",
								name: "Ida Bagus Kevin Adiwiguna",
								alternateName: ["Kevin Adiwiguna", "KevinAdiwiguna"],
								url: "https://kevinadiwiguna.dev",
								jobTitle: "Software Engineer",
								address: {
									"@type": "PostalAddress",
									addressLocality: "Lombok",
									addressCountry: "ID",
								},
								alumniOf: {
									"@type": "CollegeOrUniversity",
									name: "Universitas Mataram",
									alternateName: "UNRAM",
								},
							}),
						}}
					/>
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
