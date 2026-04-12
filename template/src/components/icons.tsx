import {
  Terminal,
  Zap,
  Palette,
  Code,
  Layers,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  Github,
  Twitter,
  Mail,
  Copy,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  terminal: Terminal,
  zap: Zap,
  palette: Palette,
  code: Code,
  layers: Layers,
  sparkles: Sparkles,
  arrowRight: ArrowRight,
  menu: Menu,
  close: X,
  check: Check,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  github: Github,
  twitter: Twitter,
  mail: Mail,
  copy: Copy,
  externalLink: ExternalLink,
  logo: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 17L10 11L4 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
