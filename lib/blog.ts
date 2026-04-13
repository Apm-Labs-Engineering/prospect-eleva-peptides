import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blogs");

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const slug = filename.replace(/\.md$/, "");

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.excerpt,
    };
  });
}

export async function getPostBySlug(slug: string, directory = postsDirectory) {
  console.log(directory);
  const filePath = path.join(directory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.excerpt || data.description,
    contentHtml,
  };
}
