import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "#/components/ui/sheet";
import { useActiveSection } from "#/hooks/useActiveSection";
import { profile } from "#/lib/content";

const links = [
	{ href: "#about", label: "about" },
	{ href: "#experience", label: "experience" },
	{ href: "#skills", label: "skills" },
	{ href: "#projects", label: "projects" },
	{ href: "#contact", label: "contact" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const active = useActiveSection(sectionIds);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
				scrolled
					? "border-b border-line bg-void/85 backdrop-blur"
					: "border-b border-transparent"
			}`}
		>
			<nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm">
				<a href="#top" className="font-mono text-sm tracking-tight text-ink">
					george<span className="text-signal">.</span>yana
					<span className="cursor-blink text-signal">_</span>
				</a>

				<ul className="hidden items-center gap-8 md:flex">
					{links.map((link) => {
						const isActive = active === link.href.slice(1);
						return (
							<li key={link.href}>
								<a
									href={link.href}
									className={`relative transition-colors ${
										isActive ? "text-ink" : "text-ink-dim hover:text-ink"
									}`}
								>
									{link.label}
									{isActive && (
										<span className="absolute -bottom-1.5 left-0 h-px w-full bg-signal" />
									)}
								</a>
							</li>
						);
					})}
				</ul>

				<Button
					asChild
					variant="outline"
					className="hidden rounded-full border-line-strong bg-transparent px-4 text-xs font-normal text-ink-dim hover:border-signal hover:bg-transparent hover:text-signal md:inline-flex"
				>
					<a href={profile.resumeUrl} download>
						résumé ↓
					</a>
				</Button>

				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Toggle menu"
							className="text-ink hover:bg-panel hover:text-signal md:hidden"
						>
							<Menu size={20} />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						className="border-line bg-void text-ink [&_svg]:text-ink"
					>
						<SheetTitle className="sr-only">Navigation</SheetTitle>
						<ul className="flex flex-col gap-1 px-4 pt-4">
							{links.map((link) => (
								<li key={link.href}>
									<SheetClose asChild>
										<a
											href={link.href}
											className="block py-2 text-ink-dim hover:text-signal"
										>
											{link.label}
										</a>
									</SheetClose>
								</li>
							))}
							<li>
								<a
									href={profile.resumeUrl}
									download
									className="mt-2 inline-block text-signal"
								>
									résumé ↓
								</a>
							</li>
						</ul>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
