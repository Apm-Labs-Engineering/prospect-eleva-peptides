"use client";

/*
 * ADA / WCAG 2.1 AA — Contact Form Accessibility Notes
 *
 * SC 1.3.1  Info & Relationships — labels are programmatically associated via htmlFor/id
 * SC 3.3.1  Error Identification  — aria-invalid marks invalid fields; role="alert" announces errors
 * SC 3.3.3  Error Suggestion      — error messages explain what is wrong
 * SC 4.1.3  Status Messages       — role="status" on success
 * SC 2.4.3  Focus Order           — focus moves to success heading on submit
 */

import { MachineSpirit } from "@/lib/MachineSpirit";
import { fetcher } from "@/lib/utils";
import { ContactForm, contactFormSchema } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "@/components/footer";
import {
  IconMail,
  IconBrandInstagram,
  IconClock,
  IconCircleCheck,
} from "@tabler/icons-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isErrorSubmitting, setIsErrorSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const logger = new MachineSpirit("contact-form");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    if (isSuccess) successHeadingRef.current?.focus();
  }, [isSuccess]);

  const { errors } = form.formState;

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
      logger.error(`Failed to send contact form`, { error, properties: { data } });
      setIsErrorSubmitting(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col pt-16">
      {/* Hero */}
      <section className="bg-[#0c2b23] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Contact</p>
          <h1 className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-bold">
            Let&apos;s Talk
          </h1>
          <p className="text-lg text-white/70">
            Questions, concerns, or not sure if peptide therapy is right for you?<br />
            We&apos;re happy to help.
          </p>
        </div>
      </section>

      {/* 2-column layout */}
      <section className="bg-[#e2f3ed]/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-3">

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-[#0c2b23] p-8 text-white">
                <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-2xl font-bold">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
                      <IconMail className="h-4 w-4" /> Email
                    </div>
                    <a
                      href="mailto:hello@elevapeptides.com"
                      className="text-sm text-white/80 no-underline hover:text-white"
                    >
                      hello@elevapeptides.com
                    </a>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
                      <IconBrandInstagram className="h-4 w-4" /> Instagram
                    </div>
                    <a
                      href="https://www.instagram.com/elevapeptides"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/80 no-underline hover:text-white"
                    >
                      @elevapeptides
                    </a>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
                      <IconClock className="h-4 w-4" /> Response Time
                    </div>
                    <p className="text-sm text-white/80">Within 24 hours, typically faster.</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
                      <IconCircleCheck className="h-4 w-4" /> Telemedicine
                    </div>
                    <p className="text-sm text-white/80">Available nationwide — all consultations are remote.</p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="mb-4 text-sm font-semibold text-white">
                    Ready to speak with a physician?
                  </p>
                  <a
                    href="https://booking.elevapeptides.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md bg-[#239e76] px-5 py-3 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-[#1d8264]"
                  >
                    Book Free Consult
                  </a>
                  <p className="mt-3 text-xs text-white/40 text-center">
                    No credit card. No commitment.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              {isSuccess ? (
                <div role="status" className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
                  <h2
                    ref={successHeadingRef}
                    tabIndex={-1}
                    className="mb-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0c2b23] outline-none"
                  >
                    Message sent!
                  </h2>
                  <p className="text-gray-500">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    In the meantime, feel free to{" "}
                    <a
                      href="https://booking.elevapeptides.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#239e76] no-underline hover:underline"
                    >
                      book your free consultation
                    </a>{" "}
                    directly.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                  <h2 className="mb-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0c2b23]">
                    Send Us a Message
                  </h2>
                  <p className="mb-8 text-sm text-gray-500">
                    Not ready to book a call yet? That&apos;s okay. Send us a message and we&apos;ll get back to you.
                  </p>

                  <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    {isErrorSubmitting && (
                      <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                      <input
                        id="name"
                        {...form.register("name")}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#239e76] focus:ring-2 focus:ring-[#239e76]/10"
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        id="email"
                        {...form.register("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#239e76] focus:ring-2 focus:ring-[#239e76]/10"
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        id="message"
                        {...form.register("message")}
                        rows={6}
                        placeholder="What questions do you have about peptide therapy?"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className="resize-none rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#239e76] focus:ring-2 focus:ring-[#239e76]/10"
                      />
                      {errors.message && (
                        <p id="message-error" role="alert" className="text-sm text-red-500">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-disabled={isSubmitting}
                      className="rounded-md bg-[#0c2b23] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#194f3e] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span aria-live="polite" aria-atomic="true">
                        {isSubmitting ? "Sending…" : "Send Message"}
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
