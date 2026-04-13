import {
  IconBrandInstagram,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1f19] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="font-serif text-2xl font-bold tracking-wide text-white">ELEVA</div>
              <div className="text-[10px] font-semibold tracking-[0.25em] text-[#239e76] uppercase">Peptides</div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Physician-prescribed peptide therapy for energy, recovery, and longevity.
              Science-backed. Doctor-supervised.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/elevapeptides"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eleva Peptides on Instagram"
                className="rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-[#239e76]"
              >
                <IconBrandInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/60 no-underline transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Free Physician Consultation</li>
              <li>Peptide Therapy</li>
              <li>Energy & Recovery</li>
              <li>Weight Optimization</li>
              <li>Longevity & Anti-Aging</li>
              <li>Telemedicine</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://booking.elevapeptides.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#239e76] px-4 py-2 font-semibold text-white no-underline transition-colors hover:bg-[#1d8264]"
                >
                  Book Free Consult
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-[#239e76]" />
                <a href="mailto:hello@elevapeptides.com" className="text-white/60 no-underline hover:text-white">
                  hello@elevapeptides.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#239e76]" />
                <span>Available via telemedicine nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {year} Eleva Peptides. All rights reserved.</p>
          <p>*Free consultation. Results vary. Physician prescription required. Not a guarantee of treatment.</p>
        </div>
      </div>
    </footer>
  );
}
