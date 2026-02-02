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

```text
/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── components/  # Svelte components
│   ├── layouts/     # Astro layouts
│   └── pages/       # Astro pages (file-based routing)
└── astro.config.mjs # Astro configuration
```

## Announcing a New Version

To announce a new version, you need to update the `version.json` file on your server:

Path: `https://macremotecontrollerwebpage.netlify.app/assets/version.json`

Format:

```json
{
  "version": "2.0",
  "url": "https://macremotecontrollerwebpage.netlify.app/"
}
```

## Remote Controls Catalog (Web)

This repo serves a remote controls catalog from `public/web_controls/`, which is published at:

- `https://macremotecontrollerwebpage.netlify.app/web_controls/catalog.json`

For backwards compatibility, `netlify.toml` redirects `/controls/*` to `/web_controls/*`.

Directory structure:

```text
public/web_controls/
  ├── catalog.json
  ├── catalog.json.sig      <-- Optional (recommended if your client verifies RSA signatures)
  ├── icons/
  │   └── safari-private.png
  └── scripts/
      └── safari-private.scpt
```

### Hashes (SHA-256)

Compute hashes and paste the hex string into `public/web_controls/catalog.json`:

```bash
shasum -a 256 public/web_controls/scripts/safari-private.scpt
shasum -a 256 public/web_controls/icons/safari-private.png
```

### Signing the manifest (RSA)

If you're using RSA signing/verification in the client, generate and upload the signature:

```bash
openssl dgst -sha256 -sign private_key.pem -out public/web_controls/catalog.json.sig public/web_controls/catalog.json
```

### Notes

- The checked-in `public/web_controls/scripts/*.scpt` files are AppleScript source for convenience. For production, compile them in Script Editor and replace the files with the compiled `.scpt`.
- Ensure these files are served over HTTPS.
- Never commit `private_key.pem` to git. Keep it local or in CI secrets.
- Some scripts (e.g. ones that use `System Events` for keystrokes) require macOS Accessibility permissions.

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
