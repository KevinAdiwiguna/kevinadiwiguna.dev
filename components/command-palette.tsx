"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileCode, Book, Home, User, Terminal as TerminalIcon, LayoutDashboard } from "lucide-react";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = (command: () => void) => {
		setOpen(false);
		command();
	};

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." className="font-mono" />

			<CommandList className="font-mono">
				<CommandEmpty>No results found.</CommandEmpty>

				<CommandGroup heading="Navigation" className="text-muted-foreground">
					<CommandItem onSelect={() => runCommand(() => router.push("/"))} className="cursor-pointer">
						<Home className="mr-2 h-4 w-4 text-primary" />
						<span>Home</span>
					</CommandItem>
					<CommandItem onSelect={() => runCommand(() => router.push("/projects"))} className="cursor-pointer">
						<FileCode className="mr-2 h-4 w-4 text-primary" />
						<span>Projects</span>
					</CommandItem>
					<CommandItem onSelect={() => runCommand(() => router.push("/blog"))} className="cursor-pointer">
						<Book className="mr-2 h-4 w-4 text-primary" />
						<span>Blog</span>
					</CommandItem>
				</CommandGroup>

				<CommandGroup heading="System" className="text-muted-foreground">
					<CommandItem
						onSelect={() =>
							runCommand(() => {
								window.location.href = "https://core.kevinadiwiguna.dev/kevinadiwiguna";
							})
						}
						className="cursor-pointer"
					>
						<LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
						<span>Dashboard</span>
					</CommandItem>
					<CommandItem onSelect={() => runCommand(() => console.log("Toggle Theme"))} className="cursor-pointer">
						<TerminalIcon className="mr-2 h-4 w-4 text-primary" />
						<span>Toggle Terminal Theme</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>

			<div className="border-t border-border bg-muted/50 px-4 py-2.5 font-mono text-[10px] text-muted-foreground flex items-center justify-end gap-3">
				<span className="flex items-center gap-1">
					<kbd className="rounded border bg-background px-1.5 py-0.5 text-foreground shadow-xs">ESC</kbd> to close
				</span>
				<span className="flex items-center gap-1">
					<kbd className="rounded border bg-background px-1.5 py-0.5 text-foreground shadow-xs">↵</kbd> to select
				</span>
			</div>
		</CommandDialog>
	);
}
