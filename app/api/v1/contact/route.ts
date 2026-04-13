import { MachineSpirit } from "@/lib/MachineSpirit";
import { contactFormSchema } from "@/types/contact";
import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "./queries";
import { addNote, createContact } from "@/lib/ghl";

const logger = new MachineSpirit("contact-routes");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid contact format",
          issues: validationResult.error.issues,
        },
        { status: 422 },
      );
    }

    const { name, email, message } = validationResult.data;

    // Run email + GHL contact creation in parallel.
    // GHL is non-critical: its failure is logged but never surfaces to the
    // client. The email response determines the HTTP status.
    const [emailResult, ghlContact] = await Promise.all([
      sendContactEmail(validationResult.data),
      createContact({
        name,
        email,
        source: "Website Contact Form",
        tags: ["website-lead"],
      }),
    ]);

    // If GHL contact was created, attach the message as a note.
    // Fire-and-forget — no need to await before responding.
    if (ghlContact?.contact.id && message) {
      addNote(ghlContact.contact.id, message).catch(() => {
        // Already logged inside addNote; swallow here so it never rejects.
      });
    }

    return NextResponse.json(emailResult, { status: 201 });
  } catch (error) {
    logger.error("Failed to send contact", { error });
    return NextResponse.json(
      { error: "Failed to send contact", details: error },
      { status: 500 },
    );
  }
}
