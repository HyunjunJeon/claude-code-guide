"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const MODULES: Record<string, { path: string; name: string }> = {
  "/01": { path: "/modules/01-slash-commands", name: "슬래시 명령어" },
  "/02": { path: "/modules/02-memory", name: "메모리" },
  "/03": { path: "/modules/03-skills", name: "스킬" },
  "/04": { path: "/modules/04-subagents", name: "서브에이전트" },
  "/05": { path: "/modules/05-mcp", name: "MCP" },
  "/06": { path: "/modules/06-hooks", name: "훅" },
  "/07": { path: "/modules/07-plugins", name: "플러그인" },
  "/08": { path: "/modules/08-checkpoints", name: "체크포인트" },
  "/09": { path: "/modules/09-advanced-features", name: "고급 기능" },
  "/10": { path: "/modules/10-cli", name: "CLI 레퍼런스" },
};

interface CommandBarProps {
  onRevealNext: () => void;
  onRevealAll: () => void;
  onRevealUpTo: (n: number) => void;
  onShowTree: () => void;
  onSearch: (query: string) => string | null;
  totalSections: number;
}

export function CommandBar({
  onRevealNext,
  onRevealAll,
  onRevealUpTo,
  onShowTree,
  onSearch,
  totalSections,
}: CommandBarProps) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "info" | "error" | "success";
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Clear message after timeout
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  // Global "/" shortcut to focus command bar
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
        setValue("/");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showMsg = useCallback(
    (text: string, type: "info" | "error" | "success" = "info") => {
      setMessage({ text, type });
    },
    []
  );

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      const lower = trimmed.toLowerCase();

      // Module navigation
      if (MODULES[lower]) {
        showMsg(`→ ${MODULES[lower].name} 로딩...`, "success");
        router.push(MODULES[lower].path);
        return;
      }

      // Section number jump
      const numMatch = lower.match(/^(\d+)$/);
      if (numMatch && totalSections > 0) {
        const n = parseInt(numMatch[1], 10);
        if (n > 0 && n <= totalSections) {
          onRevealUpTo(n);
          return;
        }
      }

      switch (lower) {
        case "/help":
          showMsg(
            "/01~/10 모듈 | /tree 목차 | /all 전체 | /find 키워드 | Space 다음 | /home 홈 | /clear | 숫자 섹션이동"
          );
          break;
        case "/home":
          router.push("/");
          break;
        case "/tree":
          onShowTree();
          break;
        case "/all":
          onRevealAll();
          break;
        case "/ls":
          showMsg(
            Object.entries(MODULES)
              .map(([k, v]) => `${k} ${v.name}`)
              .join(" | ")
          );
          break;
        case "/clear":
          onRevealUpTo(0);
          break;
        case "/back":
          router.back();
          break;
        default:
          // Search: /find keyword
          if (lower.startsWith("/find ") || lower.startsWith("/search ")) {
            const query = trimmed.replace(/^\/(find|search)\s+/i, "");
            const result = onSearch(query);
            if (result) {
              showMsg(result, "success");
            } else {
              showMsg(`'${query}' 검색 결과 없음`, "error");
            }
          } else {
            showMsg(`command not found: ${trimmed} → /help`, "error");
          }
      }
    },
    [
      router,
      totalSections,
      onRevealAll,
      onRevealUpTo,
      onShowTree,
      onSearch,
      showMsg,
    ]
  );

  return (
    <div className="border-t border-[#333] bg-[#1A1A1A] relative z-10">
      {/* Message output */}
      {message && (
        <div
          className="px-4 py-2 font-mono text-xs border-b border-[#333]"
          style={{
            color:
              message.type === "error"
                ? "#FF5F56"
                : message.type === "success"
                  ? "#27C93F"
                  : "#888",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-2.5">
        <span className="font-mono text-[#22C55E] font-bold text-sm">$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) {
              execute(value);
              setValue("");
            } else if (e.key === "Escape") {
              setValue("");
              inputRef.current?.blur();
            }
          }}
          placeholder="/01~/10 이동 | /find 검색 | /tree 목차 | Space 다음 | /help"
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-[#D8D8D8] placeholder:text-[#555] caret-[#22C55E]"
        />
      </div>
    </div>
  );
}
