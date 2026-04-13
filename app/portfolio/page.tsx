import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { IconArrowRight } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Gallery | Eleva Peptides",
  description:
    "Visual content and educational resources from Eleva Peptides — your source for physician-prescribed peptide therapy.",
};

const galleryItems = [
  {
    src: "/images/post1-dark.jpg",
    alt: "Your Body Is Telling You Something — Eleva Peptides",
    caption: "The signals are there. Are you listening?",
  },
  {
    src: "/images/post2-light.jpg",
    alt: "What Exactly Are Peptides — Eleva Education",
    caption: "Precision signals your body already knows how to read.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* Hero */}
      <section className="bg-[#0c2b23] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">Resources</p>
          <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-5xl font-bold">
            Education & Content
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/70">
            Understanding peptide therapy is the first step. Here&apos;s what we&apos;re sharing with the world.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#e2f3ed]/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {galleryItems.map((item) => (
              <div
                key={item.alt}
                className="group overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0c2b23]/0 transition-all duration-300 group-hover:bg-[#0c2b23]/40" />
                </div>
                <div className="bg-white p-6">
                  <p className="text-sm font-medium text-[#0c2b23]">{item.caption}</p>
                </div>
              </div>
            ))}

            {/* Coming Soon cards */}
            <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-[#239e76]/30 bg-white p-8 text-center">
              <div>
                <div className="mb-3 text-4xl text-[#239e76]/40">+</div>
                <p className="font-semibold text-[#0c2b23]">More Content Coming Soon</p>
                <p className="mt-2 text-sm text-gray-500">
                  Follow us on Instagram for the latest updates and education.
                </p>
                <a
                  href="https://www.instagram.com/elevapeptides"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-[#239e76] no-underline hover:underline"
                >
                  @elevapeptides
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c2b23] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
            Ready to Learn More?
          </h2>
          <p className="mb-8 text-white/70">
            Read our blog for in-depth educational content, or book your free consult to talk with a physician directly.
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
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-8 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:border-white/60"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
