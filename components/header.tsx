"use client";

/*
 * ADA / WCAG 2.1 AA — Header Accessibility Notes
 *
 * SC 2.4.8  Current Location    — aria-current="page" on the active nav link
 * SC 2.1.1  Keyboard            — mobile menu: focus trap, Escape to close,
 *                                  focus returns to trigger on close
 * SC 1.3.1  Landmarks           — role="dialog" + aria-modal on mobile overlay
 * SC 2.4.3  Focus Order         — inert attribute hides off-screen menu from tab order
 * SC 4.1.2  Name, Role, Value   — aria-controls links the hamburger button to the panel
 */

import { NAV_LINKS } from "@/constants/common";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      triggerRef.current?.focus();
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    const focusableSelectors =
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const getFocusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
        (el) => !el.closest("[inert]"),
      );
    getFocusables()[0]?.focus();
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setMenuOpen(false); return; }
      if (e.key !== "Tab") return;
      const focusables = getFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <React.Fragment>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-200 ${
          scrolled
            ? "bg-[#0c2b23] border-b border-[#194f3e] shadow-lg"
            : "bg-[#0c2b23]/95"
        }`}
      >
        <a
          href="/"
          aria-label="Eleva Peptides — home"
          className="flex flex-col leading-tight no-underline"
        >
          <span className="font-serif text-[20px] font-bold tracking-wide text-white">ELEVA</span>
          <span className="text-[9px] font-semibold tracking-[0.25em] text-[#239e76] uppercase">Peptides</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm font-medium tracking-[0.02em] text-white/80 no-underline transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://booking.elevapeptides.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[#239e76] px-5 py-2 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#1d8264]"
          >
            Book Free Consult
          </a>
        </nav>

        <button
          ref={triggerRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent md:hidden"
        >
          {menuOpen ? (
            <IconX className="h-6 w-6 text-white" stroke={2.25} />
          ) : (
            <IconMenu2 className="h-6 w-6 text-white" stroke={2.25} />
          )}
        </button>
      </header>

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-[#0c2b23] px-6 pb-8 pt-20 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`border-b border-white/10 py-3 font-serif text-[24px] font-bold text-white no-underline transition-all duration-300 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 0.06 + 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto">
          <a
            href="https://booking.elevapeptides.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-lg bg-[#239e76] p-3.5 text-center text-[15px] font-semibold text-white no-underline transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "0.35s" }}
          >
            Book Free Consult
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
