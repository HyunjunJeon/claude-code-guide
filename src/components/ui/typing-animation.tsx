"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypingAnimation({
  text,
  duration = 100,
  className,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, duration);

    return () => clearInterval(interval);
  }, [text, duration, onComplete]);

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {!isComplete && (
        <span className="ml-1 inline-block w-[2px] h-[1em] bg-primary animate-pulse" />
      )}
    </span>
  );
}
