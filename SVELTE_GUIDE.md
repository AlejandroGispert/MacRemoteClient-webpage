# Svelte Guide for Astro

## What is Svelte?

**Svelte** is a modern JavaScript framework that compiles your components into highly optimized vanilla JavaScript at build time. Unlike React or Vue, Svelte doesn't ship a runtime library - it's a compiler that turns your components into efficient, small JavaScript code.

## Why Use Svelte with Astro?

- **Interactive Components**: Use Svelte for parts of your page that need interactivity (buttons, forms, dynamic content)
- **Zero JavaScript by Default**: Astro ships zero JavaScript by default, but you can "hydrate" Svelte components when needed
- **Small Bundle Size**: Svelte compiles to smaller JavaScript than other frameworks
- **Great Performance**: Reactive updates are compiled away, resulting in faster runtime performance

## How Svelte Works in Astro

### 1. Create a Svelte Component

Create a `.svelte` file in `src/components/`:

```svelte
<script>
  // Reactive state using $state (Svelte 5)
  let count = $state(0);

  function increment() {
    count++; // UI updates automatically!
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<style>
  button {
    background: #6366f1;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
  }
</style>
```

### 2. Use in Astro Pages

Import and use with a `client:` directive:

```astro
---
import MyComponent from '../components/MyComponent.svelte';
---

<MyComponent client:load />
```

## Client Directives

Control **when** your Svelte component becomes interactive:

- **`client:load`** - Load immediately (best for above-the-fold content)
- **`client:idle`** - Load when browser is idle (better performance)
- **`client:visible`** - Load when component enters viewport (lazy loading)
- **`client:media`** - Load based on media query (e.g., `client:media="(max-width: 768px)"`)

## Svelte 5 Features

### Reactive State (`$state`)

```svelte
<script>
  let name = $state('World');
  let count = $state(0);
</script>

<input bind:value={name} />
<p>Hello {name}!</p>
<p>Count: {count}</p>
```

### Effects (`$effect`)

Run code when state changes:

```svelte
<script>
  let count = $state(0);

  $effect(() => {
    console.log(`Count changed to: ${count}`);
  });
</script>
```

### Conditional Rendering

```svelte
{#if count > 10}
  <p>Count is high!</p>
{:else if count > 5}
  <p>Count is medium</p>
{:else}
  <p>Count is low</p>
{/if}
```

### Loops

```svelte
<script>
  let items = $state(['Apple', 'Banana', 'Cherry']);
</script>

<ul>
  {#each items as item}
    <li>{item}</li>
  {/each}
</ul>
```

### Props

```svelte
<script>
  // Define props
  let { title = 'Default Title', count = 0 } = $props();
</script>

<h1>{title}</h1>
<p>Count: {count}</p>
```

Usage:

```astro
<MyComponent title="Hello" count={5} client:load />
```

## Example: Interactive Button Component

```svelte
<script>
  let { label = 'Click me', onClick } = $props();
  let clicked = $state(false);

  function handleClick() {
    clicked = true;
    onClick?.();
  }
</script>

<button onclick={handleClick} class:clicked>
  {label}
</button>

<style>
  button {
    padding: 0.75rem 1.5rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button.clicked {
    background: #10b981;
  }
</style>
```

## When to Use Svelte vs Astro

**Use Astro (`.astro` files) for:**

- Static content
- Pages and layouts
- SEO-important content
- Content that doesn't need interactivity

**Use Svelte (`.svelte` files) for:**

- Interactive buttons, forms
- Dynamic content that changes based on user input
- Components that need state management
- Real-time updates
- Complex UI interactions

## Best Practices

1. **Start with Astro**: Build your page structure with Astro
2. **Add Svelte selectively**: Only use Svelte where you need interactivity
3. **Use appropriate directives**: Choose the right `client:` directive for performance
4. **Keep components small**: Break complex components into smaller pieces
5. **Leverage Tailwind**: Use Tailwind classes alongside Svelte styles

## Learn More

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [Astro + Svelte Integration](https://docs.astro.build/en/guides/integrations-guide/svelte/)
