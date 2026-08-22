import { ArrowUpRight, Check, Copy, Github, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "#/components/Reveal";
import { SectionHeading } from "#/components/SectionHeading";
import { Button } from "#/components/ui/button";
import { profile } from "#/lib/content";

const rows = [
	{
		icon: Github,
		label: profile.github,
		href: profile.githubUrl,
		external: true,
	},
	{
		icon: Phone,
		label: profile.phone,
		href: `tel:${profile.phone.replace(/\s+/g, "")}`,
	},
];

function CopyEmail() {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
		} catch {
			// fallback for blocked / non-secure contexts
			const ta = document.createElement("textarea");
			ta.value = profile.email;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand("copy");
			} catch {
				/* best effort */
			}
			ta.remove();
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1600);
	};

	return (
		<Button
			type="button"
			onClick={copy}
			variant="outline"
			aria-label={copied ? "Email copied" : "Copy email address"}
			className="group h-auto justify-between rounded-xl border-line bg-transparent px-5 py-4 text-sm font-normal text-ink-dim hover:border-line-strong hover:bg-transparent hover:text-ink"
		>
			<span className="flex items-center gap-3">
				<Mail size={16} className="text-ink-faint" />
				{profile.email}
			</span>
			{copied ? (
				<Check size={14} className="shrink-0 text-signal" />
			) : (
				<Copy
					size={14}
					className="shrink-0 text-ink-faint transition-colors group-hover:text-ink"
				/>
			)}
		</Button>
	);
}

export function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-5xl px-6 py-32 md:py-40">
			<SectionHeading title="Contact" />

			<Reveal>
				<p className="max-w-2xl text-balance text-2xl font-light leading-snug text-ink md:text-3xl">
					I'm currently open to Senior Full-stack Software Engineering
					opportunities and selected freelance engagements. If you're building
					something interesting, let's talk.
				</p>
			</Reveal>

			<Reveal delay={100} className="mt-12">
				<div className="grid gap-3 sm:grid-cols-3">
					<CopyEmail />
					{rows.map(({ icon: Icon, label, href, external }) => (
						<Button
							key={label}
							asChild
							variant="outline"
							className="group h-auto justify-between rounded-xl border-line bg-transparent px-5 py-4 text-sm font-normal text-ink-dim hover:border-line-strong hover:bg-transparent hover:text-ink"
						>
							<a
								href={href}
								{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
							>
								<span className="flex items-center gap-3">
									<Icon size={16} className="text-ink-faint" />
									{label}
								</span>
								<ArrowUpRight
									size={14}
									className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
								/>
							</a>
						</Button>
					))}
				</div>
			</Reveal>
		</section>
	);
}
