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
    /* SC 1.3.1 — <section> + aria-labelledby creates a named page region */
    <section
      aria-labelledby="blog-heading"
      className="min-h-svh flex flex-col justify-center items-center px-20 pt-28 md:pt-40 pb-8"
    >
      <h1 id="blog-heading" className="text-4xl font-bold mb-8 text-center">
        Blog
      </h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border-b border-gray-800 pb-6">
            {/* SC 2.4.4 — <Link> inside <h2> (not wrapping it) gives a discrete,
                descriptive link label without wrapping block-level content */}
            <h2 className="text-2xl font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            {/* SC 1.3.1 — <time> with dateTime provides a machine-readable date */}
            <time dateTime={post.date} className="text-gray-400 text-sm mt-1 block">
              {post.date}
            </time>
            <p className="text-gray-300 mt-2">{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
