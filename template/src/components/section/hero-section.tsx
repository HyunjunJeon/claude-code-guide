"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig, Highlight } from "@/lib/config";
import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";
import Link from "next/link";

const heroConfig = siteConfig.hero;

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16 overflow-hidden bg-[#0F0F0F]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <BlurFade delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#333] bg-[#1A1A1A]/50 px-4 py-2 text-sm text-[#888] backdrop-blur-sm mb-8">
            <Icons.terminal className="size-4 text-[#22C55E]" />
            <span className="font-mono text-xs">{heroConfig.badge}</span>
          </div>
        </BlurFade>

        {/* Title */}
        <BlurFade delay={0.2}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-mono">
            <span className="text-[#E8E8E8]">{heroConfig.title}</span>
            <br />
            <Highlight>{heroConfig.titleHighlight}</Highlight>
          </h1>
        </BlurFade>

        {/* Description */}
        <BlurFade delay={0.3}>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#888] mb-8">
            {heroConfig.description}
          </p>
        </BlurFade>

        {/* CTA Buttons */}
        <BlurFade delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={heroConfig.cta.primary.href}>
              <Button
                size="lg"
                className="min-w-[160px] bg-[#22C55E] hover:bg-[#4ADE80] text-[#0F0F0F] font-mono font-semibold"
              >
                {heroConfig.cta.primary.text}
                <Icons.arrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </BlurFade>

        {/* Terminal Preview */}
        <BlurFade delay={0.5}>
          <div className="mt-12 mx-auto max-w-2xl">
            <div className="rounded-lg border border-[#333] bg-[#0A0A0A] overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-[#333]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <span className="flex-1 text-center text-xs text-[#555] font-mono">
                  claude-code-guide
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-5 font-mono text-sm">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-[#22C55E] font-semibold">user</span>
                  <span className="text-[#555]">@</span>
                  <span className="text-[#22D3EE] font-semibold">
                    claude-code
                  </span>
                  <span className="text-[#555]">:</span>
                  <span className="text-[#60A5FA]">~</span>
                  <span className="text-[#888]">$</span>
                  <TypingAnimation
                    text={heroConfig.terminalCommand}
                    duration={60}
                    className="text-[#D8D8D8] ml-1"
                  />
                </div>

                {/* Module list output */}
                <div className="space-y-1 text-[#888] text-xs">
                  {siteConfig.modules.slice(0, 5).map((mod) => (
                    <div key={mod.slug} className="flex gap-3">
                      <span className="text-[#555] w-5">{mod.number}</span>
                      <span className="text-[#22C55E]">{mod.title}</span>
                    </div>
                  ))}
                  <div className="text-[#555]">... +5 more modules</div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
