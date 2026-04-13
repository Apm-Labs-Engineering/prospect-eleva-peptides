"use client";

/*
 * ADA / WCAG 2.1 AA — Contact Form Accessibility Notes
 *
 * SC 1.3.1  Info & Relationships — labels are programmatically associated via
 *                                   htmlFor/id; errors linked via aria-describedby
 * SC 3.3.1  Error Identification  — aria-invalid marks invalid fields;
 *                                   role="alert" announces errors immediately
 * SC 3.3.3  Error Suggestion      — error messages explain what is wrong
 * SC 4.1.3  Status Messages       — role="status" on success; aria-live on
 *                                   the button label announces loading state
 * SC 2.4.3  Focus Order           — focus moves to success heading on submit
 */

import { MachineSpirit } from "@/lib/MachineSpirit";
import { fetcher } from "@/lib/utils";
import { ContactForm, contactFormSchema } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isErrorSubmitting, setIsErrorSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const logger = new MachineSpirit("contact-form");

  // SC 2.4.3 — ref for focus management after successful submission
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // SC 2.4.3 — Move focus to the success heading when the form is replaced.
  // Without this, focus is left stranded on the removed submit button.
  useEffect(() => {
    if (isSuccess) {
      successHeadingRef.current?.focus();
    }
  }, [isSuccess]);

  const { errors } = form.formState;

  if (isSuccess) {
    return (
      // SC 4.1.3 — role="status" announces this region to screen readers when
      // it appears (equivalent to aria-live="polite" + aria-atomic="true").
      <div
        role="status"
        className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24"
      >
        <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* tabIndex={-1} makes the heading programmatically focusable (SC 2.4.3) */}
          <h1
            ref={successHeadingRef}
            tabIndex={-1}
            className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 outline-none"
          >
            Message sent!
          </h1>
          <p className="text-sm text-gray-500">
            Thanks for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          Get in touch
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>

        {/* noValidate: RHF + zod handle validation; browser native validation
            would produce duplicate/unstyled error UI (SC 3.3.1) */}
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* SC 3.3.1 — role="alert" causes screen readers to announce this
              immediately when it appears after a failed submission */}
          {isErrorSubmitting && (
            <p role="alert" className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              {...form.register("name")}
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              /* SC 3.3.1 — aria-invalid signals the invalid state to AT */
              aria-invalid={!!errors.name}
              /* SC 1.3.1 — aria-describedby links the input to its error
                 message. Safe to reference an id that may not exist yet. */
              aria-describedby={errors.name ? "name-error" : undefined}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
            {errors.name && (
              /* SC 3.3.1 — role="alert" announces the error when it appears */
              <p id="name-error" role="alert" className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              {...form.register("email")}
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              {...form.register("message")}
              rows={5}
              placeholder="How can we help you?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
            {errors.message && (
              <p
                id="message-error"
                role="alert"
                className="text-sm text-red-500"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* SC 4.1.3 — aria-live="polite" + aria-atomic announces the label
                change ("Sending…") to screen readers without interrupting speech */}
            <span aria-live="polite" aria-atomic="true">
              {isSubmitting ? "Sending…" : "Send message"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );

  async function onSubmit(data: ContactForm) {
    setIsSubmitting(true);
    setIsErrorSubmitting(false);

    try {
      await fetcher("/api/v1/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setIsSuccess(true);
    } catch (error) {
      logger.error(`Failed to send contact form`, {
        error,
        properties: { data },
      });
      setIsErrorSubmitting(true);
    } finally {
      setIsSubmitting(false);
    }
  }
}
