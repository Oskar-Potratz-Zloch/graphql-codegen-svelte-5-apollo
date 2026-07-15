<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";

  let { children } = $props();

  const navItems = [
    { href: "/", label: "Continents" },
  ];
</script>

<div class="flex h-full flex-col overflow-hidden">
  <header class="bg-surface-800 px-8 py-2">
    <nav class="flex items-center">
      <a href="/" class="text-surface-100 heading-font-family font-normal text-base">
        graphql-codegen-svelte-5-apollo
      </a>

      <div class="mx-auto flex items-center gap-3">
        {#each navItems as item}
          <a
            href={item.href}
            class="btn btn-sm whitespace-nowrap {!page.url.pathname.startsWith(item.href) || (item.href !== "/" && page.url.pathname === item.href) ? 'variant-filled-primary' : 'text-surface-100 hover:text-white'}"
          >
            {item.label}
          </a>
        {/each}
      </div>

      <a
        href="https://github.com/Oskar-Potratz-Zloch/graphql-codegen-svelte-5-apollo"
        target="_blank"
        rel="noopener noreferrer"
        class="text-surface-400 transition-colors hover:text-surface-50"
        aria-label="GitHub repository"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </nav>
  </header>

  <main class="flex-1 overflow-y-scroll pb-4 pt-4 scroll-smooth">
    <div class="container mx-auto px-4 pb-24">
      {@render children()}
    </div>
  </main>
</div>
