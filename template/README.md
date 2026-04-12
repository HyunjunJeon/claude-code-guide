# Claude Code Theme

A beautiful, terminal-inspired Next.js template designed for developers who value speed, clarity, and aesthetic precision.

![Claude Code Theme Preview](preview.png)

## Features

- **Terminal-First Design** - Every component is designed with a terminal aesthetic in mind
- **Next.js 15** - Built on the latest Next.js with App Router and Turbopack
- **Tailwind CSS v4** - Modern styling with CSS variables and theme customization
- **TypeScript** - Full type safety out of the box
- **Motion Animations** - Smooth blur-fade, typing animations, and scroll effects
- **Dark Mode** - Optimized for dark mode with beautiful orange accents
- **Modular Components** - Copy what you need, customize, and ship

## Quick Start

```bash
# Clone or download this template
npx create-next-app@latest my-app --template claude-code-theme

# Or manually:
git clone <repo-url> my-app
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind v4 + CSS variables
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── page.tsx         # Home page with all sections
│   ├── components/
│   │   ├── section/         # Page sections (hero, features, etc.)
│   │   ├── ui/              # Reusable UI components
│   │   ├── animations/      # Animation components
│   │   ├── icons.tsx        # Icon definitions
│   │   └── theme-provider.tsx
│   └── lib/
│       ├── config.tsx       # Site configuration
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Customization

### Colors

All colors are defined as CSS variables in `src/app/globals.css`:

```css
@theme {
  --color-primary: #FF6B35;      /* Terminal orange */
  --color-background: #0F0F0F;   /* Dark background */
  --color-foreground: #E8E8E8;   /* Light text */
  /* ... more colors */
}
```

### Site Configuration

Update `src/lib/config.tsx` to customize:

- Site name and description
- Navigation links
- Hero section content
- Feature cards
- Pricing plans
- Footer links

### Components

All components are in `src/components/`:

- **section/** - Full page sections (HeroSection, FeatureSection, etc.)
- **ui/** - Reusable UI components (Button, BlurFade, TypingAnimation)

## Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [Motion](https://motion.dev/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [shadcn/ui patterns](https://ui.shadcn.com/) - Component patterns

## License

MIT License - feel free to use this template for any project.

---

Made with ❤️ by [Ultrathinkerclub](https://ultrathinkerclub.com)
