"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { PagerBar } from "./pager-bar";
import { PromptLine } from "./prompt-line";

interface Section {
  id: string;
  title: string;
  element: HTMLElement;
}

interface TerminalContentProps {
  children: ReactNode;
  modulePath?: string;
}

export function TerminalContent({
  children,
  modulePath = "~",
}: TerminalContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  // Parse rendered content into sections by H1/H2 elements
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll("h1, h2");
    const parsed: Section[] = [];

    headings.forEach((heading, idx) => {
      parsed.push({
        id: heading.id || `section-${idx}`,
        title: heading.textContent || `Section ${idx + 1}`,
        element: heading as HTMLElement,
      });
    });

    setSections(parsed);
  }, [children]);

  // Scroll tracking: update percentage + detect current section
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        if (!scrollEl) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollEl;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll > 0) {
          setScrollPct(Math.min(Math.round((scrollTop / maxScroll) * 100), 100));
        }

        if (sections.length > 0) {
          let active = 0;
          for (let i = sections.length - 1; i >= 0; i--) {
            const rect = sections[i].element.getBoundingClientRect();
            const containerRect = scrollEl.getBoundingClientRect();
            if (rect.top <= containerRect.top + 100) {
              active = i;
              break;
            }
          }
          setCurrentSection(active);
        }
      });
    }

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [sections]);

  // Scroll to next section (Space key)
  const scrollToNextSection = useCallback(() => {
    const next = Math.min(currentSection + 1, sections.length - 1);
    sections[next]?.element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentSection, sections]);

  // Search handler
  const handleSearch = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      const results: number[] = [];

      sections.forEach((sec, idx: number) => {
        const text = sec.element.parentElement?.textContent || "";
        if (
          text.toLowerCase().includes(q) ||
          sec.title.toLowerCase().includes(q)
        ) {
          results.push(idx);
        }
      });

      if (results.length > 0) {
        sections[results[0]]?.element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        const el = sections[results[0]]?.element;
        if (el) {
          el.style.outline = "2px solid #22C55E";
          setTimeout(() => { el.style.outline = ""; }, 3000);
        }
        return `검색 결과 ${results.length}건`;
      }
      return null;
    },
    [sections]
  );

  // Keyboard: Space for next section
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === " ") {
        e.preventDefault();
        scrollToNextSection();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [scrollToNextSection]);

  return (
    <div className="flex flex-col h-full">
      {/* Prompt line */}
      <div className="px-6 pt-4 lg:px-8">
        <PromptLine path={modulePath} />
      </div>

      {/* Scrollable content area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 lg:px-8">
        <div ref={contentRef} className="doc-content-area">
          {children}
        </div>
      </div>

      {/* Status bar (less-style) */}
      <PagerBar
        current={currentSection + 1}
        total={sections.length}
        scrollPct={scrollPct}
        onSearch={handleSearch}
      />
    </div>
  );
}
