# ADA / WCAG 2.1 AA Accessibility Reference

This boilerplate ships with WCAG 2.1 Level AA compliance built in. This document explains what is implemented, where to find it, and what patterns to follow when building new pages and components.

---

## Standard

**WCAG 2.1 Level AA** is the target. It is the legal baseline for ADA Title III web accessibility lawsuits in the US and aligns with AODA, EN 301 549, and CVAA. Level A is the floor; Level AAA is aspirational but not required.

---

## What's Implemented in This Boilerplate

### 1. Skip Navigation Link — `SC 2.4.1`
**File:** `app/layout.tsx`, `app/globals.css`

```tsx
<a href="#main-content" className="skip-link">Skip to main content</a>
```

Visually hidden until focused (`:focus-visible`). Positioned as the absolute first element in `<body>` so it is the first Tab stop on every page. Targets `<main id="main-content">`.

**Rule:** Never place anything before this link in the DOM. Never remove it.

---

### 2. Page Landmark Structure — `SC 1.3.1`
**File:** `app/layout.tsx`

```
<body>
  <a class="skip-link">   ← first tab stop
  <header>                ← Header component
  <main id="main-content" tabIndex={-1}>
    {children}            ← all page content goes here
  </main>
</body>
```

`tabIndex={-1}` on `<main>` allows the skip link to programmatically move focus to it in all browsers.

**Rule:** Do not add a second `<main>` inside a page component. Use `<section>`, `<article>`, or `<div>`.

---

### 3. Focus Visible Ring — `SC 2.4.7`
**File:** `app/globals.css`

A global `:focus-visible` rule applies a `2px solid #2563eb` outline with `2px offset` to all interactive elements. Uses `:focus-visible` (not `:focus`) so the ring only appears for keyboard users, not mouse clicks.

```css
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

**Rule:** Never suppress `:focus-visible` with `outline: none` on a component unless you replace it with an equally visible custom indicator. Tailwind's `focus:ring-*` utilities satisfy this when applied to individual elements.

---

### 4. Reduced Motion — `SC 2.3.3`
**File:** `app/globals.css`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Collapses all CSS transitions and animations for users who set "Reduce Motion" in their OS. Uses `0.01ms` (not `0`) because some JS code listens for `transitionend` events and `0` can break them.

**Rule:** For JS-driven animations (framer-motion, GSAP, etc.), also check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` inside the component.

---

### 5. Header Navigation — `SC 2.4.8, SC 2.1.1, SC 4.1.2, SC 1.3.1`
**File:** `components/header.tsx`

#### aria-current (SC 2.4.8)
```tsx
import { usePathname } from "next/navigation";
const pathname = usePathname();

<a href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
```
Tells screen readers which link is the current page. `undefined` removes the attribute entirely when inactive (cleaner than `aria-current="false"`).

#### Mobile menu — focus trap (SC 2.1.1, 2.4.3)
When the mobile menu opens:
1. Focus moves to the first focusable element inside the panel
2. `Tab` / `Shift+Tab` cycle within the panel (not outside)
3. `Escape` closes the menu
4. On close, focus returns to the hamburger button (`triggerRef`)

```tsx
const triggerRef = useRef<HTMLButtonElement>(null);
const panelRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!menuOpen) {
    triggerRef.current?.focus();  // return focus on close
    return;
  }
  // ... focus first element, trap Tab, handle Escape
}, [menuOpen]);
```

#### inert attribute (SC 2.4.3)
The mobile panel gets `inert` when closed. This prevents all children from receiving keyboard focus or being read by screen readers when off-screen — no need to set `tabIndex={-1}` on every child link.

```tsx
inert={!menuOpen ? "" : undefined}
```

#### aria-controls + role="dialog" (SC 4.1.2, SC 1.3.1)
```tsx
// Trigger button
<button aria-controls="mobile-menu" aria-expanded={menuOpen}>

// Panel
<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
```

**Rule:** Every modal overlay (drawer, sheet, dialog) must have `role="dialog"` + `aria-modal="true"` + a focus trap + `Escape` to close.

---

### 6. Forms — `SC 1.3.1, SC 3.3.1, SC 3.3.3, SC 4.1.3, SC 2.4.3`
**File:** `app/contact/page.tsx`

#### Labels (SC 1.3.1)
All inputs have an associated `<label>` via matching `htmlFor` / `id`. Never use `placeholder` as a substitute for a label — placeholders disappear on input and have insufficient color contrast.

#### Validation and errors (SC 3.3.1, SC 3.3.3)
```tsx
// aria-invalid signals the invalid state to AT
aria-invalid={!!errors.name}

// aria-describedby links the input to its error message
aria-describedby={errors.name ? "name-error" : undefined}

// role="alert" announces the error immediately when it appears
<p id="name-error" role="alert" className="text-sm text-red-500">
  {errors.name.message}
</p>
```

`aria-describedby` referencing an id that does not exist in the DOM is safe — browsers silently ignore missing references.

#### noValidate (SC 3.3.1)
Add `noValidate` to `<form>` when using custom validation (RHF/zod). Browser-native validation produces inaccessible, unstyled error UI that competes with your custom errors.

#### autoComplete (SC 1.3.5)
Add `autoComplete` attributes to personal data inputs (`name`, `email`, `tel`, etc.). This satisfies SC 1.3.5 (Identify Input Purpose) and helps users with cognitive disabilities.

#### Status messages (SC 4.1.3)
```tsx
// Loading state in button — announced without stealing focus
<span aria-live="polite" aria-atomic="true">
  {isSubmitting ? "Sending…" : "Send message"}
</span>

// Success state — role="status" implies aria-live="polite"
<div role="status">...</div>
```

#### Focus after submission (SC 2.4.3)
When the form is replaced by a success view, move focus to the success heading:
```tsx
const successHeadingRef = useRef<HTMLHeadingElement>(null);
useEffect(() => {
  if (isSuccess) successHeadingRef.current?.focus();
}, [isSuccess]);

// In JSX:
<h1 ref={successHeadingRef} tabIndex={-1}>Message sent!</h1>
```

---

### 7. Blog / Content Pages — `SC 1.3.1, SC 2.4.4`
**Files:** `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`

```tsx
// Section with named region (SC 1.3.1)
<section aria-labelledby="blog-heading">
  <h1 id="blog-heading">Blog</h1>

// Link inside heading — not heading inside link (SC 2.4.4)
<h2><Link href={...}>{post.title}</Link></h2>

// Machine-readable dates (SC 1.3.1)
<time dateTime={post.date}>{post.date}</time>
```

**Rule:** Wrap `<Link>` inside `<h2>`, not the reverse. Wrapping a heading inside an `<a>` creates an interactive element containing a block-level element, which produces confusing screen-reader announcements.

---

### 8. Images — `SC 1.1.1`
**File:** `app/page.tsx`

| Context | Alt text |
|---|---|
| Informative image | Descriptive text: `alt="Next.js logo"` |
| Decorative image (inside a labelled link) | Empty: `alt=""` + `aria-hidden="true"` |
| Image conveying data | Full description or `aria-describedby` pointing to a caption |
| Icon-only button | No `<img>` — use `aria-label` on the `<button>` instead |

---

### 9. External Links — `SC 2.4.4`
```tsx
<a
  href="https://..."
  aria-label="Next.js Documentation (opens in new tab)"
  target="_blank"
  rel="noopener noreferrer"
>
  Documentation
</a>
```

Always add `rel="noopener noreferrer"` on `target="_blank"` links. Append `"(opens in new tab)"` to the `aria-label` when the visible text alone does not communicate the behavior.

---

## Checklist for New Pages

Copy this into a PR description when building a new page.

```
[ ] No <main> element in the page component (layout.tsx provides it)
[ ] Page has a unique, descriptive <title> via metadata export
[ ] Every interactive element reachable by Tab in logical order
[ ] All images have alt text (empty alt for decorative images)
[ ] All form inputs have associated <label> elements
[ ] Form errors use aria-invalid + aria-describedby + role="alert"
[ ] External links have aria-label with "(opens in new tab)"
[ ] Any modal/dialog has role="dialog" + aria-modal + focus trap + Escape
[ ] Dynamic content changes (toasts, alerts) use role="alert" or role="status"
[ ] Color is not the only means of conveying information
[ ] Text contrast meets 4.5:1 (normal) or 3:1 (large, ≥18pt or ≥14pt bold)
```

---

## Checklist for New Components

```
[ ] Semantic HTML element chosen (button not div, nav not div, etc.)
[ ] aria-label or visible label present when element has no visible text
[ ] aria-expanded on toggles (dropdowns, accordions, menus)
[ ] aria-controls links trigger to the region it controls
[ ] aria-current="page" on nav links (use usePathname)
[ ] focus-visible ring not suppressed without replacement
[ ] No animation without respecting prefers-reduced-motion
[ ] inert on off-screen interactive content (drawers, modals when closed)
```

---

## Testing

### Automated (catches ~30–40% of issues)
- **axe DevTools** browser extension — free, runs in DevTools
- **Lighthouse** Accessibility audit — built into Chrome DevTools
- **eslint-plugin-jsx-a11y** — catches many issues at lint time (recommended addition)

### Manual keyboard test
1. Unplug / ignore mouse
2. Tab through the entire page — every interactive element must be reachable
3. Activate all controls with `Enter` / `Space`
4. Open/close any menus — verify focus trap and Escape behavior
5. Submit forms with both valid and invalid data — verify error announcement

### Screen reader test
- **macOS / iOS:** VoiceOver (`Cmd + F5` to enable)
- **Windows:** NVDA (free) with Firefox, or Narrator with Edge
- **Android:** TalkBack

Minimum test: navigate the homepage, a blog post, and the contact form end-to-end with VoiceOver or NVDA.

---

## WCAG 2.1 AA Success Criteria Reference

| SC | Name | Where implemented |
|---|---|---|
| 1.1.1 | Non-text Content | Image alt text (page.tsx, all `<Image>`) |
| 1.3.1 | Info & Relationships | Semantic HTML, landmarks, labels, time |
| 1.3.5 | Identify Input Purpose | autoComplete on form inputs |
| 1.4.3 | Contrast (Minimum) | Design tokens — verify with contrast checker |
| 2.1.1 | Keyboard | Focus trap, all controls keyboard-operable |
| 2.3.3 | Animation from Interactions | prefers-reduced-motion (globals.css) |
| 2.4.1 | Bypass Blocks | Skip link (layout.tsx + globals.css) |
| 2.4.2 | Page Titled | metadata exports on every page |
| 2.4.3 | Focus Order | Skip link → header → main; focus management on modals/success states |
| 2.4.4 | Link Purpose | Descriptive aria-labels on external/ambiguous links |
| 2.4.7 | Focus Visible | :focus-visible ring (globals.css) |
| 2.4.8 | Location | aria-current="page" in header nav |
| 3.1.1 | Language of Page | lang="en" on <html> (layout.tsx) |
| 3.3.1 | Error Identification | aria-invalid + role="alert" (contact/page.tsx) |
| 3.3.2 | Labels or Instructions | <label> elements on all form inputs |
| 3.3.3 | Error Suggestion | Descriptive zod error messages |
| 4.1.2 | Name, Role, Value | aria-controls, aria-expanded, aria-label |
| 4.1.3 | Status Messages | role="alert", role="status", aria-live |
