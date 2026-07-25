"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { sendContactEmail } from "@/hooks/send-email";

const contactSchema = z.object({
	name: z.string().min(2, "Name required"),
	email: z.string().email("Invalid email address"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormState = {
	name: string;
	email: string;
	message: string;
};

type FormErrors = {
	name?: string;
	email?: string;
	message?: string;
};

export function ContactForm() {
	const [formData, setFormData] = useState<FormState>({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});

		const validation = contactSchema.safeParse(formData);

		if (!validation.success) {
			const fieldErrors: FormErrors = {};
			validation.error.issues.forEach((issue) => {
				const path = issue.path[0] as keyof FormErrors;
				fieldErrors[path] = issue.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await sendContactEmail(formData);

			if (response.success) {
				toast.add({
					title: "TRANSMISSION_SUCCESSFUL",
					description: "Message delivered directly to adiwigunakevin@gmail.com",
					type: "success",
				});
				setFormData({ name: "", email: "", message: "" });
			} else {
				toast.add({
					title: "TRANSMISSION_FAILED",
					description: response.error || "Please try again later.",
					type: "error",
				});
			}
		} catch {
			toast.add({
				title: "SYSTEM_ERROR",
				description: "An unexpected error occurred during transmission.",
				type: "error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="contact" className="py-20 border-t border-border">
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="max-w-2xl">
				{/* SSH Heading */}
				<div className="flex items-center gap-2 text-primary font-mono text-sm mb-8">
					<span className="animate-pulse">❯</span>
					<span>ssh contact@adiwiguna.dev</span>
				</div>

				<h2 className="text-3xl font-bold tracking-tight mb-10">
					ESTABLISH_<span className="text-primary">CONNECTION</span>
				</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label htmlFor="name" className="block font-mono text-xs text-muted-foreground uppercase">
							Identifier (Name)
						</label>
						<Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="YOUR_NAME" className="font-mono text-sm rounded-sm bg-background/50 focus-visible:ring-primary" />
						{errors.name && <p className="font-mono text-xs text-destructive">{errors.name}</p>}
					</div>

					<div className="space-y-2">
						<label htmlFor="email" className="block font-mono text-xs text-muted-foreground uppercase">
							Return_Address (Email)
						</label>
						<Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="EMAIL@DOMAIN.COM" className="font-mono text-sm rounded-sm bg-background/50 focus-visible:ring-primary" />
						{errors.email && <p className="font-mono text-xs text-destructive">{errors.email}</p>}
					</div>

					<div className="space-y-2">
						<label htmlFor="message" className="block font-mono text-xs text-muted-foreground uppercase">
							Packet_Payload (Message)
						</label>
						<Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="SYSTEM_MESSAGE_HERE..." className="font-mono text-sm rounded-sm bg-background/50 focus-visible:ring-primary resize-none" />
						{errors.message && <p className="font-mono text-xs text-destructive">{errors.message}</p>}
					</div>

					<Button type="submit" disabled={isSubmitting} className="font-mono font-bold rounded-sm px-8 py-6 gap-2">
						{isSubmitting ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								SENDING...
							</>
						) : (
							<>
								EXECUTE_SEND
								<Send className="h-4 w-4" />
							</>
						)}
					</Button>
				</form>
			</motion.div>
		</section>
	);
}
