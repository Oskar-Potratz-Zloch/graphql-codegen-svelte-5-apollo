<script lang="ts">
  import { resolve } from "$app/paths";
  import ContinentCard from "src/lib/components/ContinentCard.svelte";

  let { data } = $props();
</script>

<header>
  <h1 class="h2 font-bold text-primary-500">Continents</h1>
  <hr class="border-t mb-8 border-primary-950" />
</header>

{#if data.continents.loading}
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {#each Array(8) as _}
      <div class="h-24 animate-pulse rounded-container bg-surface-700"></div>
    {/each}
  </div>
{:else if data.continents.error}
  <p class="text-error-500">{data.continents.error.message}</p>
{:else}
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {#each data.continents.data?.continents || [] as continent (continent.code)}
      <ContinentCard
        {continent}
        href={resolve("/[continent]", { continent: continent.code })}
      />
    {/each}
  </div>
{/if}
