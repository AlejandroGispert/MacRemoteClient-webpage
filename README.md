# MacRemoteClient-webpage

A modern web interface built with [Astro](https://astro.build) and [Svelte](https://svelte.dev).

## Why Astro + Svelte?

- **Astro**: Delivers minimal JavaScript by default, resulting in faster page loads and better performance
- **Svelte**: A lightweight, reactive framework that compiles to efficient vanilla JavaScript
- **Perfect combination**: Astro handles routing and static generation, while Svelte provides interactive components when needed

## 🚀 Getting Started

This project uses [Bun](https://bun.sh) for faster package management and runtime performance.

### Install Dependencies

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
# or simply: bun dev
```

Visit `http://localhost:4321` to see your site.

### Build

Build for production:

```bash
bun run build
# or: bun build
```

### Preview

Preview the production build:

```bash
bun run preview
# or: bun preview
```

> **Note**: You can also use `npm` commands if preferred, but Bun is significantly faster for installs and can be used as a runtime alternative.

## 📁 Project Structure

```
/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── components/  # Svelte components
│   ├── layouts/     # Astro layouts
│   └── pages/       # Astro pages (file-based routing)
└── astro.config.mjs # Astro configuration
```

## 🎨 Using Svelte Components

Svelte components can be used in Astro pages with the `client:` directive:

```astro
---
import MyComponent from '../components/MyComponent.svelte';
---

<MyComponent client:load />
```

Available directives:

- `client:load` - Load immediately
- `client:idle` - Load when browser is idle
- `client:visible` - Load when component is visible
- `client:media` - Load based on media query

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Svelte Documentation](https://svelte.dev/docs)
- [Astro + Svelte Integration](https://docs.astro.build/en/guides/integrations-guide/svelte/)
