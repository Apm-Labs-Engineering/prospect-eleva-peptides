// GoHighLevel v2 API Types
// Docs: https://highlevel.stoplight.io/docs/integrations/

// ---------------------------------------------------------------------------
// Create Contact
// POST https://services.leadconnectorhq.com/contacts/
// ---------------------------------------------------------------------------

export interface GHLCreateContactPayload {
  /** Required. GHL Location (sub-account) ID. */
  locationId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** Where the contact came from, e.g. "Website Contact Form" */
  source?: string;
  /** Tags to apply immediately on creation */
  tags?: string[];
  customFields?: GHLCustomField[];
}

export interface GHLCustomField {
  /** Custom field ID from your GHL location settings */
  id: string;
  field_value: string;
}

export interface GHLContact {
  id: string;
  locationId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
  dateAdded?: string;
}

export interface GHLCreateContactResponse {
  contact: GHLContact;
}

// ---------------------------------------------------------------------------
// Add Note
// POST https://services.leadconnectorhq.com/contacts/{contactId}/notes
// ---------------------------------------------------------------------------

export interface GHLAddNotePayload {
  body: string;
  userId?: string;
}

export interface GHLNote {
  id: string;
  body: string;
  contactId: string;
  dateAdded: string;
}

export interface GHLAddNoteResponse {
  note: GHLNote;
}
