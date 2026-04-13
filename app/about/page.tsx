import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  IconLeaf,
  IconMicroscope,
  IconUserCheck,
  IconShieldCheck,
  IconArrowRight,
  IconCircleCheck,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "About | Eleva Peptides",
  description:
    "Learn about Eleva Peptides — our physician-led approach to peptide therapy, our commitment to science-backed treatment, and why we believe declining health after 30 isn't inevitable.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-[#0c2b23] via-[#194f3e] to-[#0c2b23]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">About Eleva</p>
          <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-5xl font-bold md:text-6xl">
            We Believe Biology<br />Can Be Fixed.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/75">
            Eleva Peptides exists because too many people are told their declining health is
            just &ldquo;getting older.&rdquo; We&apos;re here to show them it doesn&apos;t have to be.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Our Story</p>
              <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23]">
                The Problem We Set Out to Solve
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Most people accept the slow fade — the energy that never quite returns, the recovery that takes longer than it used to, the weight that won&apos;t budge despite doing everything right. They call it aging. We call it a signal problem.
                </p>
                <p>
                  Your body produces peptides naturally. These short chains of amino acids are the biological signals that govern energy production, cellular repair, metabolism, and cognitive function. But after 30, production declines — and with it, performance.
                </p>
                <p>
                  Eleva Peptides was built on a single conviction: that physician-prescribed peptide therapy, delivered through a real doctor-patient relationship, could give people their biology back. Not a supplement. Not a shortcut. A prescription — from a physician who actually listens.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/post2-light.jpg"
                  alt="What are peptides — Eleva education"
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#e2f3ed]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Our Values</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23]">
              What Drives Everything We Do
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: IconShieldCheck,
                title: "Physician Integrity",
                desc: "Every patient works with a licensed physician. No protocol goes out without medical oversight. This is non-negotiable.",
              },
              {
                icon: IconLeaf,
                title: "Naturally Occurring",
                desc: "Peptides are what your body already makes. We restore what biology takes away — we don't replace it with something foreign.",
              },
              {
                icon: IconMicroscope,
                title: "Precision Over Protocol",
                desc: "No one-size-fits-all plans. Your physician builds a protocol for your biology, your goals, and your life.",
              },
              {
                icon: IconUserCheck,
                title: "Radical Honesty",
                desc: "If peptide therapy isn't right for you, your physician will tell you. We'd rather lose a patient than mislead one.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0c2b23]">
                  <v.icon className="h-6 w-6 text-[#239e76]" />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0c2b23]">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="bg-[#0c2b23] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">How It Works</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
              Telemedicine. Nationwide.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Eleva operates entirely via telemedicine, which means your consultation, your protocol, and your follow-up all happen from home.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "30-minute free consultation with your physician",
              "Physician reviews your complete health history",
              "Custom protocol prescribed for your biology",
              "Medication shipped directly to your door",
              "Ongoing physician monitoring and check-ins",
              "Protocol adjustments based on your results",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <IconCircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#239e76]" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e2f3ed]/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23]">
            Ready to See What&apos;s Possible?
          </h2>
          <p className="mb-8 text-gray-600">
            Your first step is a free 30-minute call with a physician. No commitment. No pitch. Just a real conversation about what your body needs.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://booking.elevapeptides.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#0c2b23] px-8 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#194f3e]"
            >
              Book Free Consult
              <IconArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-[#0c2b23]/30 px-8 py-3.5 text-sm font-semibold text-[#0c2b23] no-underline transition-colors hover:border-[#0c2b23]"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
