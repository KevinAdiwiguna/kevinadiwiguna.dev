"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message too short"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export async function sendContactEmail(data: ContactFormValues) {
    const validatedFields = contactSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, error: "Invalid form input." };
    }

    const { name, email, message } = validatedFields.data;

    try {
        const { error } = await resend.emails.send({
            from: "Portfolio Contact Form <contact@kevinadiwiguna.dev>",
            to: ["me@kevinadiwiguna.dev"],
            subject: `[Portfolio] New Transmission from ${name}`,
            replyTo: email,
            html: `
        <div style="font-family: monospace; padding: 20px; background-color: #09090b; color: #f4f4f5; border-radius: 8px;">
          <h2 style="color: #22c55e;">NEW_TRANSMISSION_RECEIVED</h2>
          <hr style="border-color: #27272a; margin: 16px 0;" />
          <p><strong>Identifier (Name):</strong> ${name}</p>
          <p><strong>Return Address (Email):</strong> ${email}</p>
          <p><strong>Message Payload:</strong></p>
          <div style="background-color: #18181b; padding: 12px; border-radius: 4px; border: 1px solid #27272a;">
            ${message.replace(/\n/g, "<br />")}
          </div>
        </div>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error("Server Action Error:", err);
        return { success: false, error: "Failed to send transmission." };
    }
}
