import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Eleva Peptides",
  description: "Educational articles on peptide therapy, longevity, energy optimization, and physician-prescribed wellness from the Eleva Peptides team.",
  keywords: "peptide therapy blog, longevity, anti-aging, energy recovery, telemedicine",
  openGraph: {
    title: "Blog | Eleva Peptides",
    description: "Science-backed insights on peptide therapy, longevity, and feeling your best after 30.",
    type: "website",
    url: "https://elevapeptides.vercel.app/blog",
  },
  alternates: {
    canonical: "https://elevapeptides.vercel.app/blog",
  },
};

/*
 * ADA / WCAG 2.1 AA — Blog List Accessibility Notes
 *
 * SC 1.3.1  Info & Relationships — <section> with aria-labelledby creates a
 *                                   named landmark; <h2> inside <Link> gives
 *                                   each article link a clear, descriptive label
 * SC 2.4.4  Link Purpose          — link text is the post title (unambiguous);
 *                                   <Link> wraps only the heading, not the
 *                                   whole card, avoiding over-large click targets
 * SC 1.3.1  Date markup           — <time> conveys semantic date to AT
 */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col pt-16">
      {/* Hero */}
      <section className="bg-[#0c2b23] py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#239e76]">The Journal</p>
          <h1 id="blog-heading" className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-bold">
            Education & Insights
          </h1>
          <p className="text-lg text-white/70">
            Science-backed articles on peptide therapy, longevity, and feeling your best.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section
        aria-labelledby="blog-heading"
        className="bg-[#e2f3ed]/30 py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.slug} className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <h2 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0c2b23]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#0c2b23] no-underline hover:text-[#239e76] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time dateTime={post.date} className="mb-3 block text-xs text-gray-400">
                  {post.date}
                </time>
                <p className="text-sm leading-relaxed text-gray-600">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#239e76] no-underline hover:underline"
                >
                  Read article →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
