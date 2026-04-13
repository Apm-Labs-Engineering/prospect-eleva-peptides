import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  IconFlame,
  IconScale,
  IconBrain,
  IconHeartRateMonitor,
  IconShieldCheck,
  IconStethoscope,
  IconArrowRight,
  IconCircleCheck,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Services | Physician-Prescribed Peptide Therapy",
  description:
    "Explore Eleva Peptides' physician-prescribed therapies for energy, weight optimization, mental clarity, recovery, and longevity. Telemedicine available nationwide.",
};

const services = [
  {
    icon: IconFlame,
    title: "Energy & Recovery",
    description:
      "The 2pm crash. The slow recovery that takes days instead of hours. These aren't signs of getting older — they're signals your biology is sending. Peptide therapy restores the cellular energy production and repair mechanisms your body used to handle automatically.",
    benefits: [
      "Faster post-workout recovery",
      "Sustained energy without stimulants",
      "Improved sleep quality",
      "Reduced inflammation",
    ],
  },
  {
    icon: IconScale,
    title: "Weight Optimization",
    description:
      "When diet and exercise aren't moving the needle, the problem is often deeper than calories. Declining peptide production after 30 affects metabolism, insulin sensitivity, and fat storage. Physician-prescribed peptide therapy works at the biological root — not the surface.",
    benefits: [
      "Improved metabolic function",
      "Better insulin sensitivity",
      "Reduced visceral fat",
      "Preserved lean muscle mass",
    ],
  },
  {
    icon: IconBrain,
    title: "Mental Clarity & Focus",
    description:
      "Brain fog, reduced drive, and slower processing aren't inevitable. After 30, the peptides that support neuroplasticity, neurotransmitter production, and cognitive repair decline significantly. Targeted therapy restores the signals your brain needs to operate at its best.",
    benefits: [
      "Sharper mental focus",
      "Improved memory consolidation",
      "Enhanced mood and motivation",
      "Reduced cognitive fatigue",
    ],
  },
  {
    icon: IconHeartRateMonitor,
    title: "Longevity & Anti-Aging",
    description:
      "Aging is inevitable. How fast you age is not. Peptide therapy has become one of the most promising tools in the longevity space — targeting the biological mechanisms that drive cellular decline, inflammation, and tissue degradation.",
    benefits: [
      "Cellular repair and regeneration",
      "Reduced systemic inflammation",
      "Improved skin elasticity",
      "Enhanced immune function",
    ],
  },
  {
    icon: IconStethoscope,
    title: "Free Physician Consultation",
    description:
      "Before anything else, you talk to a real doctor. Our physician will review your health history, listen to your goals, and give you an honest assessment of whether peptide therapy is right for you. No upsell. No pressure. Just clinical judgment.",
    benefits: [
      "30-minute video call with licensed physician",
      "Complete health history review",
      "Honest, unbiased recommendation",
      "No credit card or commitment required",
    ],
  },
  {
    icon: IconShieldCheck,
    title: "Ongoing Physician Monitoring",
    description:
      "Your protocol doesn't end at prescription. Your physician monitors your progress, adjusts your protocol as needed, and remains available for follow-up. This is medicine — not a supplement subscription.",
    benefits: [
      "Regular check-ins with your physician",
      "Protocol adjustments based on results",
      "Lab work review when applicable",
      "Direct physician access",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* Hero */}
      <section className="bg-[#0c2b23] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Our Services</p>
          <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-5xl font-bold md:text-6xl">
            Precision Therapy.<br />Real Physician Care.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Every service at Eleva is designed with one goal: physician-supervised, science-backed treatment that actually works.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e2f3ed]">
                  <s.icon className="h-6 w-6 text-[#0c2b23]" />
                </div>
                <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0c2b23]">
                  {s.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{s.description}</p>
                <ul className="space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                      <IconCircleCheck className="h-4 w-4 shrink-0 text-[#239e76]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c2b23] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
            Not Sure Where to Start?
          </h2>
          <p className="mb-8 text-white/70">
            Your free consultation is exactly that — a conversation with a real physician to figure out
            what your body actually needs.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://booking.elevapeptides.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#239e76] px-8 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#1d8264]"
            >
              Book Free Consult
              <IconArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-8 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:border-white/60"
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
