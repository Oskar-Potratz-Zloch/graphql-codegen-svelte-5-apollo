<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";

  let { children, data } = $props();
</script>

<div class="bg-surface-900 flex flex-wrap gap-2 mb-8">
  {#each data.continents.data?.continents || [] as continent (continent.code)}
    {@const href = resolve("/[continent]", { continent: continent.code })}
    {@const isActive = page.url.pathname === href || page.url.pathname.startsWith(`${href}/`)}
    <a
      {href}
      class="btn btn-sm whitespace-nowrap {isActive ? 'variant-filled-primary' : 'variant-outline-primary'}"
    >
      {continent.name}
    </a>
  {/each}
</div>

{@render children()}
