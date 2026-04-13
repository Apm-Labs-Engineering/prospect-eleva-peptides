import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} | TODO`,
    description: post.description,
    alternates: {
      canonical: `https://TODO/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/*
 * ADA / WCAG 2.1 AA — Blog Post Accessibility Notes
 *
 * SC 1.3.1  Info & Relationships — <article> is a proper landmark; <time>
 *                                   provides a machine-readable date
 * SC 2.4.2  Page Titled          — generateMetadata sets a descriptive title
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return (
    <div className="min-h-svh flex flex-col justify-center items-center px-4 md:px-20 pt-28 md:pt-32 pb-8">
      <article className="max-w-5xl w-full mx-auto py-16 px-6 bg-black/80 backdrop-blur-md rounded-xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          {post.title}
        </h1>
        {/* SC 1.3.1 — <time> with dateTime exposes a machine-readable date to AT */}
        <time dateTime={post.date} className="text-gray-400 text-sm mb-8 block">
          {post.date}
        </time>
        <div
          className="prose prose-invert
                     prose-headings:text-[var(--primary)] prose-headings:font-bold
                     prose-p:text-gray-300 prose-p:leading-relaxed
                     prose-a:text-yellow-400 hover:prose-a:text-yellow-500
                     prose-blockquote:border-l-4 prose-blockquote:border-yellow-500 prose-blockquote:text-gray-200 prose-blockquote:italic
                     prose-code:bg-gray-900 prose-code:text-yellow-400 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                     prose-img:rounded-lg prose-img:shadow-xl
                     prose-ul:list-disc prose-ul:ml-6
                     prose-ol:list-decimal prose-ol:ml-6
                     space-y-6"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
