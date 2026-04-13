import Image from "next/image";
/*
 * ADA / WCAG 2.1 AA — Homepage Accessibility Notes
 *
 * SC 1.3.1  Landmarks        — no nested <main>; the root layout provides
 *                               <main id="main-content"> (see layout.tsx)
 * SC 2.4.4  Link Purpose      — external links have aria-label describing
 *                               the destination and "(opens in new tab)"
 * SC 1.1.1  Non-text Content  — the Vercel logo inside the "Deploy Now" link
 *                               is decorative (the link text already names it)
 *                               so it uses alt="" to avoid redundant announcement
 */

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* SC 1.3.1 — <div> not <main>; layout.tsx provides the <main> landmark */}
      <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            {/* SC 2.4.4 — aria-label names the destination; "(opens in new tab)"
                informs users the link opens a new browsing context (SC 2.4.4) */}
            <a
              href="https://vercel.com/templates?framework=next.js"
              aria-label="Next.js Templates on Vercel (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn"
              aria-label="Next.js Learning Center (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-40"
            href="https://vercel.com/new"
            aria-label="Deploy to Vercel (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* SC 1.1.1 — decorative: the adjacent link text already says "Deploy Now" */}
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-40"
            href="https://nextjs.org/docs"
            aria-label="Next.js Documentation (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
