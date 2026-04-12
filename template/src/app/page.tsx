import { HeroSection } from "@/components/section/hero-section";
import { Footer } from "@/components/section/footer";
import { siteConfig } from "@/lib/config";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Module Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F0F0F]">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0.6}>
            <div className="text-center mb-12">
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-[#22C55E] mb-3">
                10 Modules
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#E8E8E8]">
                단계별 학습 가이드
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.modules.map((mod, idx) => (
              <BlurFade key={mod.slug} delay={0.7 + idx * 0.05}>
                <Link
                  href={`/modules/${mod.slug}`}
                  className="group block p-5 rounded-lg border border-[#333] bg-[#1A1A1A] hover:border-[#22C55E] hover:shadow-[0_4px_20px_rgba(34,197,94,0.15)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#555] bg-[#252525] px-2 py-1 rounded shrink-0">
                      {mod.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-mono text-sm font-semibold text-[#D8D8D8] group-hover:text-[#22C55E] transition-colors truncate">
                        {mod.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#888] leading-relaxed line-clamp-2">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
