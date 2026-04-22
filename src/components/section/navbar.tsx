"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar({ lang = "ko" }: { lang?: "ko" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prefix nav links with current language
  const navLinks = siteConfig.nav.links.map((link) => ({
    ...link,
    href: `/${lang}${link.href}`,
  }));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#333] bg-[#0F0F0F]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Icons.terminal className="size-5 text-[#22C55E]" />
          <span className="font-mono text-sm font-semibold text-[#E8E8E8]">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-xs font-mono text-[#888] hover:text-[#22C55E] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#888]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <Icons.close className="size-5" />
          ) : (
            <Icons.menu className="size-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t border-[#333] bg-[#0F0F0F]",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="block text-sm font-mono text-[#888] hover:text-[#22C55E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
