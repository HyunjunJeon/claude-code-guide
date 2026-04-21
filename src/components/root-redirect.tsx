"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ko");
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#D8D8D8] flex items-center justify-center px-6">
      <div className="text-center font-mono">
        <p className="text-sm text-[#888] mb-3">Redirecting to the Korean homepage...</p>
        <a className="text-[#22C55E] hover:text-[#4ADE80]" href="/ko/">
          Continue to /ko/
        </a>
      </div>
    </main>
  );
}
