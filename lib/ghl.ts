import { MachineSpirit } from "@/lib/MachineSpirit";
import {
  GHLAddNotePayload,
  GHLAddNoteResponse,
  GHLCreateContactPayload,
  GHLCreateContactResponse,
} from "@/types/ghl";

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

const logger = new MachineSpirit("ghl");

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function ghlHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: GHL_API_VERSION,
  };
}

function isConfigured(): boolean {
  return !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

/** Split a full name string into { firstName, lastName }.
 *  "Jane" → { firstName: "Jane" }
 *  "Jane Smith"  → { firstName: "Jane", lastName: "Smith" }
 *  "Jane Ann Smith" → { firstName: "Jane", lastName: "Ann Smith" }
 */
export function splitName(fullName: string): {
  firstName: string;
  lastName?: string;
} {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  const [first, ...rest] = parts;
  return { firstName: first, lastName: rest.join(" ") };
}

// ---------------------------------------------------------------------------
// createContact
// ---------------------------------------------------------------------------

/**
 * Creates a contact in GHL.
 *
 * Returns the created contact, or null if GHL is not configured or the
 * request fails (errors are logged but never thrown — GHL is non-critical).
 *
 * @example
 * const contact = await createContact({
 *   name: "Jane Smith",
 *   email: "jane@example.com",
 *   source: "Website Contact Form",
 *   tags: ["website-lead"],
 * });
 */
export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  source?: string;
  tags?: string[];
  customFields?: GHLCreateContactPayload["customFields"];
}): Promise<GHLCreateContactResponse | null> {
  if (!isConfigured()) return null;

  const { firstName, lastName } = splitName(data.name);

  const payload: GHLCreateContactPayload = {
    locationId: process.env.GHL_LOCATION_ID!,
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    source: data.source ?? "Website",
    tags: data.tags,
    customFields: data.customFields,
  };

  try {
    const res = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: "POST",
      headers: ghlHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      logger.error("GHL createContact failed", {
        properties: { status: res.status, body: await res.text() },
      });
      return null;
    }

    const result: GHLCreateContactResponse = await res.json();
    logger.success("GHL contact created", {
      properties: { contactId: result.contact.id },
    });
    return result;
  } catch (error) {
    logger.error("GHL createContact threw", { error });
    return null;
  }
}

// ---------------------------------------------------------------------------
// addNote
// ---------------------------------------------------------------------------

/**
 * Attaches a plain-text note to an existing GHL contact.
 *
 * Returns the created note, or null if GHL is not configured or the
 * request fails.
 *
 * @example
 * const note = await addNote(contact.contact.id, "Message: Hello!");
 */
export async function addNote(
  contactId: string,
  body: string,
): Promise<GHLAddNoteResponse | null> {
  if (!isConfigured()) return null;

  const payload: GHLAddNotePayload = { body };

  try {
    const res = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
      method: "POST",
      headers: ghlHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      logger.error("GHL addNote failed", {
        properties: { status: res.status, body: await res.text() },
      });
      return null;
    }

    const result: GHLAddNoteResponse = await res.json();
    logger.success("GHL note added", {
      properties: { contactId, noteId: result.note.id },
    });
    return result;
  } catch (error) {
    logger.error("GHL addNote threw", { error });
    return null;
  }
}
