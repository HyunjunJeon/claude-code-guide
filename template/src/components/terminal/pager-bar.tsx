"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface PagerBarProps {
  current: number;
  total: number;
  scrollPct?: number;
  onSearch: (query: string) => string | null;
}

export function PagerBar({
  current,
  total,
  scrollPct,
  onSearch,
}: PagerBarProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Derive filename from URL
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const fileName =
    lastSegment && lastSegment !== "modules"
      ? `${lastSegment}.md`
      : "README.md";

  const pct =
    scrollPct ?? (total > 0 ? Math.round((current / total) * 100) : 0);

  // Clear message after timeout
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // Focus input when entering search mode
  useEffect(() => {
    if (searchMode) inputRef.current?.focus();
  }, [searchMode]);

  // Global keyboard shortcuts: / for search, q for back
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setSearchMode(true);
        setSearchValue("");
      } else if (e.key === "q" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.back();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const executeSearch = useCallback(() => {
    if (searchValue.trim()) {
      const result = onSearch(searchValue.trim());
      setMessage(result ?? `Pattern not found: ${searchValue}`);
    }
    setSearchMode(false);
    setSearchValue("");
  }, [searchValue, onSearch]);

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between px-6 py-1.5 bg-[#1A1A1A] border-t border-[#333] font-mono text-[0.7rem] shrink-0 lg:px-8">
      {searchMode ? (
        <div className="flex items-center gap-1 flex-1">
          <span className="text-[#22C55E]">/</span>
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") executeSearch();
              if (e.key === "Escape") {
                setSearchMode(false);
                setSearchValue("");
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-[0.7rem] font-mono text-[#D8D8D8] caret-[#22C55E]"
            placeholder="search..."
          />
        </div>
      ) : message ? (
        <span className="text-[#888] flex-1">{message}</span>
      ) : (
        <>
          <span className="text-[#888]">
            <span className="text-[#D8D8D8]">{fileName}</span>
            <span className="text-[#555]"> | </span>
            Section {current}/{total}
          </span>
          <span className="text-[#555]">
            {pct >= 100 ? (
              <span className="text-[#22C55E]">(END)</span>
            ) : (
              `${pct}%`
            )}
            <span className="text-[#444]"> — </span>
            Space 다음 · / 검색 · q 뒤로
          </span>
        </>
      )}
    </div>
  );
}
