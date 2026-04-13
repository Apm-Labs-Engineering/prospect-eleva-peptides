"use client";

/*
 * ADA / WCAG 2.1 AA — Header Accessibility Notes
 *
 * SC 2.4.8  Current Location    — aria-current="page" on the active nav link
 * SC 2.1.1  Keyboard            — mobile menu: focus trap, Escape to close,
 *                                  focus returns to trigger on close
 * SC 1.3.1  Landmarks           — role="dialog" + aria-modal on mobile overlay,
 *                                  aria-label on both <nav> elements
 * SC 2.4.3  Focus Order         — inert attribute hides off-screen menu from
 *                                  tab order when closed; overlay is first in
 *                                  DOM order so focus flows naturally when open
 * SC 4.1.2  Name, Role, Value   — aria-controls links the hamburger button to
 *                                  the panel it toggles; aria-expanded already
 *                                  present and reflects open/closed state
 */

import { NAV_LINKS } from "@/constants/common";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Refs for focus management (SC 2.4.3)
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // SC 2.1.1, 2.4.3 — Focus trap: when the mobile menu opens, move focus
  // inside the panel and confine Tab/Shift+Tab to it. Escape closes the menu
  // and returns focus to the trigger button.
  useEffect(() => {
    if (!menuOpen) {
      // Return focus to the button that opened the menu (SC 2.4.3)
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

    // Autofocus first item when menu opens
    getFocusables()[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <React.Fragment>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-6 transition-all duration-200 ${
          scrolled
            ? "border-b border-gray-200 shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "border-b border-transparent shadow-none"
        }`}
      >
        <a
          href="/"
          aria-label="YourBrand — home"
          className="font-serif text-[20px] font-bold tracking-[-0.5px] text-gray-900 no-underline"
        >
          YourBrand
        </a>

        {/* SC 1.3.1 — aria-label distinguishes this nav from the mobile one */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              /* SC 2.4.8 — aria-current="page" identifies the active route */
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm font-medium tracking-[0.01em] text-gray-700 no-underline transition-colors duration-150 hover:text-gray-900"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/get-started"
            aria-current={pathname === "/get-started" ? "page" : undefined}
            className="rounded-md bg-gray-900 px-[18px] py-2 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-gray-800"
          >
            Get Started
          </a>
        </nav>

        {/* SC 4.1.2 — aria-controls links this button to the panel it toggles */}
        <button
          ref={triggerRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent md:hidden"
        >
          {menuOpen ? (
            <X className="h-6 w-6 text-gray-900" strokeWidth={2.25} />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" strokeWidth={2.25} />
          )}
        </button>
      </header>

      {/*
       * SC 1.3.1 — role="dialog" + aria-modal tells screen readers this is a
       *   modal overlay; aria-label gives it an accessible name.
       * SC 2.4.3 — inert hides all children from keyboard and AT when closed,
       *   preventing users from accidentally tabbing into off-screen content.
       *   The focus trap (useEffect above) handles navigation when open.
       */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-white px-6 pb-8 pt-20 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* SC 1.3.1 — aria-label distinguishes this nav from the desktop one */}
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`border-b border-gray-100 py-2.5 font-serif text-[24px] font-bold text-gray-900 no-underline transition-all duration-300 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{
                transitionDelay: `${i * 0.06 + 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto">
          <a
            href="/get-started"
            onClick={() => setMenuOpen(false)}
            aria-current={pathname === "/get-started" ? "page" : undefined}
            className={`block rounded-lg bg-gray-900 p-3.5 text-center text-[15px] font-semibold text-white no-underline transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDelay: "0.35s",
            }}
          >
            Get Started
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
