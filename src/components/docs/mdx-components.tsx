import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";
import { rewriteLink } from "@/lib/rewrite-links";
import { MermaidDiagram } from "@/components/docs/mermaid-diagram";

/**
 * Extract text content from React children (handles nested elements).
 */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/**
 * Check if a <pre> block contains a mermaid code block.
 * With format:"md", mermaid blocks render as <pre><code class="language-mermaid">...</code></pre>
 */
function isMermaidBlock(children: ReactNode): string | null {
  if (!isValidElement(children)) return null;
  const childProps = children.props as { className?: string; children?: ReactNode };
  const className = childProps.className || "";
  if (className.includes("language-mermaid")) {
    return extractText(children);
  }
  return null;
}

/* Terminal-styled code block wrapper — intercepts mermaid blocks */
function CodeBlock({ children, ...props }: React.ComponentProps<"pre"> & { "data-language"?: string }) {
  // Check if this is a mermaid code block (rehype-pretty-code uses data-language)
  const lang = props["data-language"];
  if (lang === "mermaid") {
    const chart = extractText(children);
    if (chart) return <MermaidDiagram chart={chart} />;
  }

  // Also check children for language-mermaid class (fallback)
  const mermaidChart = isMermaidBlock(children);
  if (mermaidChart) {
    return <MermaidDiagram chart={mermaidChart} />;
  }

  return (
    <div className="terminal-code-wrapper my-4 rounded-lg border border-[#333] overflow-hidden shadow-lg">
      {/* Traffic light dots */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border-b border-[#333]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
      </div>
      <pre
        {...props}
        className="overflow-x-auto p-4 text-sm leading-relaxed bg-[#0A0A0A] font-mono"
      >
        {children}
      </pre>
    </div>
  );
}

/* Inline code */
function InlineCode({ children, ...props }: React.ComponentProps<"code">) {
  // If inside a pre, don't double-wrap
  return (
    <code
      {...props}
      className="px-1.5 py-0.5 rounded bg-[#1A1A1A] text-[#D8D8D8] text-[0.85em] font-mono"
    >
      {children}
    </code>
  );
}

/* Tables with terminal styling */
function Table({ children, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-[#333]">
      <table
        {...props}
        className="w-full text-sm font-mono border-collapse"
      >
        {children}
      </table>
    </div>
  );
}

function Th({ children, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      {...props}
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider bg-[#1A1A1A] text-[#D8D8D8] border-b border-[#333]"
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      {...props}
      className="px-4 py-3 text-[#D8D8D8] border-b border-[#333]/30"
    >
      {children}
    </td>
  );
}

function Tr({ children, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      {...props}
      className="hover:bg-[rgba(34,197,94,0.05)] transition-colors"
    >
      {children}
    </tr>
  );
}

/* Headings with anchor styling */
function H1({ children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      className="text-2xl font-bold font-mono text-[#22C55E] mt-8 mb-4 pb-2 border-b border-[#333]"
    >
      {children}
    </h1>
  );
}

function H2({ children, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className="text-xl font-semibold font-mono text-[#D8D8D8] mt-8 mb-3 pb-2 border-b border-[#333]"
    >
      {children}
    </h2>
  );
}

function H3({ children, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className="text-lg font-semibold font-mono text-[#D8D8D8] mt-6 mb-2"
    >
      {children}
    </h3>
  );
}

/* Blockquote as terminal-styled callout */
function Blockquote({ children, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      {...props}
      className="my-4 p-4 rounded-lg bg-[#1A1A1A] border border-[#333] border-l-4 border-l-[#22C55E] text-[#D8D8D8]"
    >
      {children}
    </blockquote>
  );
}

/* Links — created per-module to rewrite relative paths */
function createAnchor(moduleSlug?: string, lang: "ko" = "ko") {
  return function Anchor({ children, href, ...props }: React.ComponentProps<"a">) {
    const resolved = href ? rewriteLink(href, moduleSlug, lang) : href;
    const isExternal = resolved?.startsWith("http");
    return (
      <a
        {...props}
        href={resolved}
        className="text-[#22C55E] hover:text-[#4ADE80] underline underline-offset-2 transition-colors"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  };
}

/* Paragraph */
function P({ children, ...props }: React.ComponentProps<"p">) {
  return (
    <p {...props} className="my-3 leading-7 text-[#D8D8D8]">
      {children}
    </p>
  );
}

/* Lists */
function Ul({ children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul {...props} className="my-3 ml-6 list-disc text-[#D8D8D8] space-y-1">
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol {...props} className="my-3 ml-6 list-decimal text-[#D8D8D8] space-y-1">
      {children}
    </ol>
  );
}

function Li({ children, ...props }: React.ComponentProps<"li">) {
  return (
    <li {...props} className="leading-7">
      {children}
    </li>
  );
}

/* Horizontal rule */
function Hr(props: React.ComponentProps<"hr">) {
  return <hr {...props} className="my-8 border-[#333]" />;
}

/* Strong/Bold */
function Strong({ children, ...props }: React.ComponentProps<"strong">) {
  return (
    <strong {...props} className="font-semibold text-[#E8E8E8]">
      {children}
    </strong>
  );
}

/* Images — rewrite relative paths to /images/{moduleSlug}/filename */
function createImg(moduleSlug?: string) {
  return function Img({ src, alt, ...props }: React.ComponentProps<"img">) {
    let resolved = typeof src === "string" ? src : "";
    // Rewrite relative image paths to public/images/{module}/
    if (moduleSlug && resolved && !resolved.startsWith("http") && !resolved.startsWith("/")) {
      resolved = `/images/${moduleSlug}/${resolved}`;
    }
    return (
      <img
        {...props}
        src={resolved}
        alt={alt || ""}
        className="my-4 rounded-lg border border-[#333] max-w-full"
      />
    );
  };
}

/** Create MDX components with module-aware link rewriting */
export function createMdxComponents(moduleSlug?: string, lang: "ko" = "ko"): MDXComponents {
  return {
    pre: CodeBlock,
    code: InlineCode,
    table: Table,
    th: Th,
    td: Td,
    tr: Tr,
    h1: H1,
    h2: H2,
    h3: H3,
    blockquote: Blockquote,
    a: createAnchor(moduleSlug, lang),
    img: createImg(moduleSlug),
    p: P,
    ul: Ul,
    ol: Ol,
    li: Li,
    hr: Hr,
    strong: Strong,
  };
}

/** Default components (no module context) */
export const mdxComponents: MDXComponents = createMdxComponents();
