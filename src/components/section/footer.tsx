import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-[#333] bg-[#0F0F0F] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icons.terminal className="size-4 text-[#555]" />
            <span className="font-mono text-xs text-[#555]">
              © {new Date().getFullYear()} {siteConfig.footer.copyright}
            </span>
          </div>
          <div className="flex items-center gap-6">
            {siteConfig.footer.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-xs text-[#888] hover:text-[#22C55E] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#22C55E] transition-colors"
              aria-label="GitHub"
            >
              <Icons.github className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
