"use client";

import { useEffect, useRef, useState, useId } from "react";
import DOMPurify from "dompurify";

interface MermaidDiagramProps {
  chart: string;
  fontSize?: number;
  fullWidth?: boolean;
}

export function MermaidDiagram({ chart, fontSize = 13, fullWidth = false }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const uniqueId = useId().replace(/:/g, "-");
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#1A1A1A",
            primaryTextColor: "#D8D8D8",
            primaryBorderColor: "#333333",
            lineColor: "#22C55E",
            secondaryColor: "#252525",
            tertiaryColor: "#333333",
            noteTextColor: "#D8D8D8",
            noteBkgColor: "#1A1A1A",
            noteBorderColor: "#333333",
            actorTextColor: "#D8D8D8",
            actorBkg: "#1A1A1A",
            actorBorder: "#333333",
            signalColor: "#D8D8D8",
            signalTextColor: "#D8D8D8",
          },
          fontFamily: "JetBrains Mono, monospace",
          fontSize,
          securityLevel: "loose",
        });

        const id = `mmd${uniqueId}${Math.random().toString(36).slice(2, 6)}`;
        const { svg: rendered } = await mermaid.render(id, chart.trim());

        if (!cancelled) {
          const sanitized = DOMPurify.sanitize(rendered, {
            USE_PROFILES: { svg: true, svgFilters: true },
            ADD_TAGS: ["foreignObject"],
          });
          setSvg(sanitized);
        }
      } catch (e) {
        if (!cancelled) {
          setError((e as Error).message || "Mermaid render error");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId, fontSize, fullWidth]);

  // After SVG is inserted into DOM, resize it for fullWidth mode
  useEffect(() => {
    if (!fullWidth || !svg || !svgContainerRef.current) return;
    const svgEl = svgContainerRef.current.querySelector("svg");
    if (svgEl) {
      svgEl.setAttribute("width", "100%");
      svgEl.removeAttribute("height");
      svgEl.style.maxWidth = "none";
    }
  }, [svg, fullWidth]);

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-[#333] bg-[#1A1A1A] p-4">
        <div className="text-xs text-[#FF5F56] font-mono mb-2">
          Diagram Error
        </div>
        <pre className="text-xs text-[#888] overflow-x-auto whitespace-pre-wrap">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="my-4 rounded-lg border border-[#333] bg-[#1A1A1A] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#252525] border-b border-[#333]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-2 font-mono text-[0.65rem] text-[#555]">
          diagram
        </span>
      </div>
      <div className={`p-4 overflow-x-auto ${fullWidth ? "[&_svg]:w-full [&_svg]:max-w-none" : "flex justify-center [&_svg]:max-w-full"}`}>
        {svg ? (
          <div ref={svgContainerRef} dangerouslySetInnerHTML={{ __html: svg }} /> /* sanitized by DOMPurify above */
        ) : (
          <span className="text-[#555] font-mono text-xs animate-pulse py-4">
            Loading diagram...
          </span>
        )}
      </div>
    </div>
  );
}
