import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-dark-dimmed", // Always dark for terminal aesthetic
  },
  keepBackground: true,
  defaultLang: "text",
};

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypePrettyCode, prettyCodeOptions],
  ],
} as const;
