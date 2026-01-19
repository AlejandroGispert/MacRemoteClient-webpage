# Project Structure

This document outlines the organization of the Mac Remote Controller website project.

## Directory Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (buttons, cards, etc.)
│   │   ├── DownloadButton.svelte
│   │   └── MacDownloadButton.svelte
│   ├── layout/         # Layout components (navbar, footer)
│   │   ├── Navbar.svelte
│   │   └── Footer.astro
│   ├── sections/       # Page sections (homepage sections)
│   │   ├── HeroSection.astro
│   │   ├── HowItWorksSection.astro
│   │   ├── FeaturesSection.astro
│   │   ├── ScreenshotsSection.astro
│   │   ├── DownloadSection.astro
│   │   ├── AboutSection.astro
│   │   ├── FeatureCard.astro
│   │   ├── StepCard.astro
│   │   └── SectionSeparator.astro
│   └── demo/           # Demo/example components
│       └── IconDisplay.svelte
├── layouts/            # Page layouts
│   └── Layout.astro
└── pages/              # Astro pages (file-based routing)
    ├── index.astro
    ├── privacy.astro
    └── terms.astro

public/                 # Static assets
├── screenshots/        # App screenshots
│   ├── appscreen.jpg
│   ├── appscreen2.jpg
│   ├── appscreen3.jpg
│   └── appscreen4.jpg
├── background.png
├── favicon.svg
├── ic_launcher_round.png
├── macremoteapp.png
└── 1024.png
```

## Component Categories

### UI Components (`components/ui/`)

Reusable UI elements that can be used across different pages:

- **DownloadButton.svelte** - Google Play download button
- **MacDownloadButton.svelte** - Mac app download button

### Layout Components (`components/layout/`)

Components that appear on every page:

- **Navbar.svelte** - Navigation bar with menu
- **Footer.astro** - Footer with links and copyright

### Section Components (`components/sections/`)

Large, page-specific sections for the homepage:

- **HeroSection.astro** - Hero/landing section
- **HowItWorksSection.astro** - Step-by-step guide
- **FeaturesSection.astro** - Features grid
- **ScreenshotsSection.astro** - App screenshots
- **DownloadSection.astro** - Call-to-action section
- **AboutSection.astro** - About information

### Card Components (`components/sections/`)

Reusable card components used within sections:

- **FeatureCard.astro** - Feature display card
- **StepCard.astro** - Step/instruction card

### Utility Components (`components/sections/`)

- **SectionSeparator.astro** - Visual separator between sections

## File Naming Conventions

- **Components**: PascalCase (e.g., `DownloadButton.svelte`)
- **Pages**: lowercase with hyphens (e.g., `privacy.astro`)
- **Sections**: PascalCase with "Section" suffix (e.g., `HeroSection.astro`)
- **Cards**: PascalCase with "Card" suffix (e.g., `FeatureCard.astro`)

## Import Paths

### From Pages

```astro
import Layout from '../layouts/Layout.astro';
import HeroSection from '../components/sections/HeroSection.astro';
```

### From Sections

```astro
import DownloadButton from '../ui/DownloadButton.svelte';
import FeatureCard from './FeatureCard.astro';
```

### From Layout

```astro
import Navbar from '../components/layout/Navbar.svelte';
import Footer from '../components/layout/Footer.astro';
```

## Best Practices

1. **Component Organization**: Group related components in appropriate folders
2. **Single Responsibility**: Each component should have one clear purpose
3. **Reusability**: Extract reusable components (buttons, cards) into `ui/`
4. **Scoped Styles**: Keep styles scoped to their components
5. **TypeScript**: Use TypeScript interfaces for props in Astro components
6. **Consistent Naming**: Follow naming conventions consistently

## Adding New Components

### UI Component

Place in `src/components/ui/` if it's a reusable UI element.

### Layout Component

Place in `src/components/layout/` if it appears on every page.

### Section Component

Place in `src/components/sections/` if it's a large homepage section.

### New Page

Create in `src/pages/` - Astro will automatically create a route.
