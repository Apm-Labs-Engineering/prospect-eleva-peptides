import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  IconCircleCheck,
  IconHeartRateMonitor,
  IconFlame,
  IconBrain,
  IconScale,
  IconShieldCheck,
  IconStethoscope,
  IconClock,
  IconStar,
  IconArrowRight,
  IconLeaf,
  IconMicroscope,
  IconUserCheck,
} from "@tabler/icons-react";

/*
 * ADA / WCAG 2.1 AA — Homepage Accessibility Notes
 * SC 1.3.1  Landmarks — no nested <main>; layout.tsx provides <main id="main-content">
 */

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center pt-16">
        <Image
          src="/images/hero-bg.jpg"
          alt="Eleva Peptides — peptide therapy background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2b23]/95 via-[#0c2b23]/88 to-[#0c2b23]/95" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#239e76]/40 bg-[#239e76]/10 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#239e76]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Free Physician Consultation</span>
          </div>
          <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Your Body Is Telling You Something.{" "}
            <span className="text-[#239e76]">Are You Listening?</span>
          </h1>
          <p className="mb-4 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            You&apos;ve tried the coffee. The supplements. The recovery drinks.
          </p>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            Most people blame age. We call it biology — and biology can be fixed.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://booking.elevapeptides.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#239e76] px-8 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-[#1d8264]"
            >
              Book Free Consult
              <IconArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-8 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/40">
            *Free consultation. Results vary. Physician prescription required. Not a guarantee of treatment.
          </p>
        </div>
      </section>

      {/* ── Signal Strip ── */}
      <section className="bg-[#194f3e] py-5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-4 w-4 text-[#239e76]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-4 w-4 text-[#239e76]" />
              <span>No sales pitch</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-4 w-4 text-[#239e76]" />
              <span>Just a real doctor who listens</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-4 w-4 text-[#239e76]" />
              <span>Telemedicine — nationwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="bg-[#e2f3ed]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">What We Treat</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23] md:text-5xl">
              Precision Medicine for How You Actually Feel
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Peptide therapy targets specific biological pathways with physician oversight and zero guesswork.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: IconFlame,
                title: "Energy & Recovery",
                desc: "Slow recovery and the 2pm crash aren't normal — they're a signal. Peptide therapy restores the cellular energy production your body used to take for granted.",
              },
              {
                icon: IconScale,
                title: "Weight Optimization",
                desc: "When diet and exercise aren't moving the needle, the problem is often hormonal. Physician-prescribed peptides work at the biological level to restore your metabolism.",
              },
              {
                icon: IconBrain,
                title: "Mental Clarity & Longevity",
                desc: "Brain fog, lower drive, and reduced clarity after 30 aren't inevitable. Targeted peptides restore the signals your brain needs to stay sharp and focused.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-[#e2f3ed] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e2f3ed]">
                  <s.icon className="h-6 w-6 text-[#0c2b23]" />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0c2b23]">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{s.desc}</p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#239e76] no-underline hover:gap-2 transition-all"
                >
                  Learn more <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Eleva ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Why Eleva</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23] md:text-5xl">
              Not a Supplement. Not a Shortcut.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: IconStethoscope,
                title: "Real Physician Oversight",
                desc: "Every patient works directly with a licensed physician who reviews your health history and prescribes only what's right for you.",
              },
              {
                icon: IconLeaf,
                title: "Naturally Occurring",
                desc: "Peptides are short chains of amino acids your body already produces. After 30, production declines. We restore what biology takes away.",
              },
              {
                icon: IconMicroscope,
                title: "Precision Medicine",
                desc: "Unlike hormones, peptides target specific biological pathways. No guesswork. No one-size-fits-all. Just what your body actually needs.",
              },
              {
                icon: IconUserCheck,
                title: "No Commitment Needed",
                desc: "Your free 30-minute consultation comes with no credit card, no commitment, and no sales pitch. Just an honest conversation with a doctor.",
              },
            ].map((v) => (
              <div key={v.title} className="flex flex-col gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0c2b23]">
                  <v.icon className="h-6 w-6 text-[#239e76]" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0c2b23]">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="bg-[#0c2b23] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">About Eleva</p>
              <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-4xl font-bold text-white md:text-5xl">
                It&apos;s Not Aging.<br />It&apos;s a Signal Problem.
              </h2>
              <p className="mb-4 text-white/75 leading-relaxed">
                Your body produces peptides naturally. But after 30, production starts to decline. That&apos;s when you start noticing slower recovery, lower energy, harder time keeping weight off, and less mental clarity.
              </p>
              <p className="mb-8 text-white/75 leading-relaxed">
                At Eleva Peptides, we believe that decline isn&apos;t inevitable. With physician-prescribed peptide therapy, we restore those signals at the biological level — safely, scientifically, and under the supervision of a real doctor.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-md bg-[#239e76] px-7 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#1d8264]"
                >
                  Our Approach
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://booking.elevapeptides.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3 text-sm font-semibold text-white no-underline transition-colors hover:border-white/60 hover:bg-white/10"
                >
                  Book Free Consult
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/post2-light.jpg"
                  alt="What are peptides — Eleva Peptides education"
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#239e76] p-4 shadow-xl md:-left-8">
                <div className="text-2xl font-bold text-white">30 min</div>
                <div className="text-xs text-white/80">Free Physician Call</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-[#e2f3ed]/40 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">How It Works</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23] md:text-5xl">
              Start in 3 Simple Steps
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: IconClock,
                title: "Book Your Free Call",
                desc: "Schedule a free 30-minute consultation with our physician. No credit card. No commitment. Just a conversation.",
              },
              {
                step: "02",
                icon: IconHeartRateMonitor,
                title: "Get Your Protocol",
                desc: "Your doctor reviews your health history and goals, then prescribes the exact peptide protocol right for your biology.",
              },
              {
                step: "03",
                icon: IconShieldCheck,
                title: "Feel the Difference",
                desc: "Your medication ships to your door. Your physician monitors your progress. You start feeling like yourself again.",
              },
            ].map((s) => (
              <div key={s.step} className="relative rounded-2xl bg-white p-8 shadow-sm">
                <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-[#0c2b23] text-xs font-bold text-white">
                  {s.step}
                </div>
                <div className="mb-4 mt-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e2f3ed]">
                  <s.icon className="h-6 w-6 text-[#0c2b23]" />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0c2b23]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://booking.elevapeptides.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#0c2b23] px-8 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-[#194f3e]"
            >
              Start with a Free Consult
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Patient Stories</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23] md:text-5xl">
              Real People. Real Results.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "I was skeptical at first — I'd tried everything. But within 6 weeks on my protocol, my energy was back and I was sleeping through the night for the first time in years.",
                name: "Michael T.",
                location: "Patient",
                rating: 5,
              },
              {
                quote: "The physician actually listened. Not a sales pitch, not a generic plan — a real conversation about my goals. The weight I'd been fighting for two years finally started moving.",
                name: "Sarah K.",
                location: "Patient",
                rating: 5,
              },
              {
                quote: "I kept thinking the brain fog and slow recovery was just part of getting older. Turns out it was a signal problem. Wish I'd found Eleva two years ago.",
                name: "James R.",
                location: "Patient",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border-l-4 border-[#239e76] bg-[#e2f3ed]/30 p-8"
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4 fill-[#239e76] text-[#239e76]" />
                  ))}
                </div>
                <p className="mb-2 text-4xl font-serif text-[#239e76] leading-none">&ldquo;</p>
                <p className="mb-6 text-sm leading-relaxed text-gray-700">{t.quote}</p>
                <div>
                  <div className="font-semibold text-[#0c2b23]">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            {/* TODO: Replace with verified patient testimonials */}
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#e2f3ed]/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">FAQ</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0c2b23] md:text-5xl">
              Common Questions
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "What exactly are peptides?",
                a: "Peptides are short chains of amino acids — the same building blocks that make up every protein in your body. Think of them as precision signals your body already knows how to read. Unlike supplements, they target specific biological pathways with physician oversight.",
              },
              {
                q: "Is peptide therapy safe?",
                a: "Yes. All protocols at Eleva are prescribed and monitored by a licensed physician. Peptides are naturally occurring in the body, and physician-supervised therapy ensures the right peptides at the right doses for your specific biology.",
              },
              {
                q: "What is the free consultation?",
                a: "It's a free 30-minute call with our physician. He'll review your health history, understand your goals, and tell you honestly whether peptide therapy is the right fit — with no credit card, no commitment, and no sales pitch.",
              },
              {
                q: "How is this different from supplements or hormones?",
                a: "Unlike supplements, peptides require a prescription and physician oversight. Unlike hormone therapy, peptides target specific pathways rather than replacing hormone levels wholesale — resulting in precise, targeted effects with fewer side effects.",
              },
              {
                q: "Is Eleva available in my state?",
                a: "Eleva operates via telemedicine and is available to patients nationwide. Your consultation and follow-ups happen remotely, and medication is shipped directly to your door.",
              },
              {
                q: "How soon will I see results?",
                a: "Results vary based on your protocol and goals. Many patients notice improvements in energy and sleep within the first 4–6 weeks. Your physician will set realistic expectations based on your specific health profile.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl bg-white p-7 shadow-sm">
                <h3 className="mb-3 font-semibold text-[#0c2b23]">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c2b23] via-[#194f3e] to-[#0c2b23]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            Your First Step Is a Free 30-Minute Call.
          </h2>
          <p className="mb-8 text-lg text-white/75">
            No credit card. No commitment. No sales pitch.<br />
            Just a real doctor who actually listens.
          </p>
          <a
            href="https://booking.elevapeptides.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#239e76] px-10 py-4 text-base font-semibold text-white no-underline transition-colors hover:bg-[#1d8264]"
          >
            Book Your Free Consultation
            <IconArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs text-white/40">
            *Free consultation. Results vary. Physician prescription required.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
